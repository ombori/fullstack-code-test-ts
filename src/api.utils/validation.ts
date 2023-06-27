import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import { ValidationError, validate } from 'class-validator';
import { HttpStatusCode } from 'axios';

type Class<T = any> = new (...arg: any[]) => T;
type PartialRecord<K extends any, T> = {
  [P in keyof K]?: T;
};
type ValidationRules = PartialRecord<Pick<NextApiRequest, 'query' | 'body'>, Class>;

export class ValidationApiError extends ApiError {
  constructor(public readonly errors: Array<ValidationError>) {
    super(HttpStatusCode.UnprocessableEntity, 'Api Validation Error');
  }

  getFormalErrors() {
    return this.errors.reduce((acc, curr) => {
      acc[curr.property] = { ...curr.constraints };

      return acc;
    }, {});
  }
}

export const withValidation =
  (validationRules: ValidationRules = {}) =>
  (req: NextApiRequest, res: NextApiResponse) =>
  async (handler: NextApiHandler) => {
    try {
      let validationErrors: Array<ValidationError> = [];

      for (const _field in validationRules) {
        const field = _field as keyof ValidationRules;
        const rule = validationRules[field]!;
        const data = req[field];
        const instance = Object.assign(new rule(), data);

        const errors = await validate(instance, {
          skipMissingProperties: false,
        });

        validationErrors = [...validationErrors, ...errors];

        req[field] = instance;
      }

      if (validationErrors.length) {
        throw new ValidationApiError(validationErrors);
      }

      return handler(req, res);
    } catch (err) {
      if (err instanceof ValidationApiError) {
        res.statusMessage = err.message;
        return res.status(err.statusCode).send(err.getFormalErrors());
      }

      console.error(err);

      if (err instanceof ApiError) {
        res.statusMessage = err.message;
        return res.status(err.statusCode).end();
      }

      return res.status(500).end();
    }
  };
