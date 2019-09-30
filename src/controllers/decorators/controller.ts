import "reflect-metadata";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";

const validator = (fields: string[]): RequestHandler => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.body) {
    res.status(422).send("Invalid request");
    return;
  }

  /* for (let field of fields) {
    if (!req.body[field]) {
      res.status(422).send(`Missing property ${field}`);
      return;
    }
  } */

  const isAllFieldsExist = fields.every(
    (field: string): boolean => req.body[field]
  );

  if (!isAllFieldsExist) {
    res.status(422).send("Invalid request: not all properties exist");
    return;
  }

  next();
};

export const controller = (routePrefix: string) => (target: Function) => {
  const router = AppRouter.instance;

  for (let key in target.prototype) {
    const routeHandler = target.prototype[key];
    const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
    const method: Methods = Reflect.getMetadata(
      MetadataKeys.method,
      target.prototype,
      key
    );

    const middlewares =
      Reflect.getMetadata(MetadataKeys.middlewares, target.prototype, key) ||
      [];

    const fields =
      Reflect.getMetadata(MetadataKeys.fields, target.prototype, key) || [];

    if (path) {
      router[method](
        `${routePrefix}${path}`,
        ...middlewares,
        validator(fields),
        routeHandler
      );
    }
  }
};
