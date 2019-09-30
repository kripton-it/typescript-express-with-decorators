import { RequestHandler } from "express";
import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";
import { RouteHandlerDescriptor } from "./interfaces";

export const use = (middleware: RequestHandler) => (
  target: any,
  key: string,
  desc: RouteHandlerDescriptor
) => {
  const middlewares =
    Reflect.getMetadata(MetadataKeys.middlewares, target, key) || [];

  Reflect.defineMetadata(
    MetadataKeys.middlewares,
    [...middlewares, middleware],
    target,
    key
  );
};
