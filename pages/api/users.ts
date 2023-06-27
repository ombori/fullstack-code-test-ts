import { withMiddleware } from '../../src/api.utils';
import { withValidation } from '../../src/api.utils/validation';
import { OuterApiResponse, OuterApiUser } from '@src/types&dtos/users.api.dto';
import axios, { HttpStatusCode } from 'axios';
import { IsNumberString, validate } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

class PaginationQuery {
  @IsNumberString({ no_symbols: true })
  page: string = '1';
}

interface RequestWithData extends Omit<NextApiRequest, 'query'> {
  query: PaginationQuery;
}

async function handler(req: RequestWithData, res: NextApiResponse) {
  const host = process.env.API_HOST;
  const { query } = req;

  const { data: outerRes } = await axios
    .get<OuterApiResponse>(`${host}/users`, { params: query })
    .catch((err) => {
      console.error(err);

      throw new ApiError(HttpStatusCode.BadRequest, 'Failed to load data, try again later');
    });

  const outerResInstance = Object.assign(new OuterApiResponse(), outerRes, {
    data: outerRes.data.map((userData) => Object.assign(new OuterApiUser(), userData)),
  });

  const validationErrors = await validate(outerResInstance, {
    skipMissingProperties: false,
  });

  if (validationErrors.length) {
    console.error(validationErrors);

    throw new ApiError(HttpStatusCode.BadRequest, 'Failed to load data, try again later');
  }

  return res.status(200).json(outerResInstance);
}

export default withMiddleware(withValidation({ query: PaginationQuery }), handler);
