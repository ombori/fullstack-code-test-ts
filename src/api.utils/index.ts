import { NextApiRequest, NextApiResponse } from 'next';
type Middleware = (req: NextApiRequest | any, res: NextApiResponse) => unknown;
type Maybe<T> = NonNullable<T> | undefined;

export function withMiddleware(...middlewares: Middleware[]) {
  return async function withMiddlewareHandler(req: NextApiRequest, res: NextApiResponse) {
    async function evaluateHandler(middleware: Middleware, innerMiddleware?: Maybe<Middleware>) {
      if (res.headersSent) {
        return;
      }

      if (typeof middleware === 'function') {
        const handler = await middleware(req, res);

        if (typeof handler === 'function') {
          if (innerMiddleware) {
            await handler(innerMiddleware);
          } else {
            await handler();
          }
        }
      }
    }

    for (let index = 0; index < middlewares.length; index++) {
      const middleware = middlewares[index];
      const nextMiddleware = middlewares[index + 1];

      await evaluateHandler(middleware, nextMiddleware);
    }
  };
}
