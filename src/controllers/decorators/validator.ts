import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";
import { RouteHandlerDescriptor } from "./interfaces";

export const validator = (...fields: string[]) => (
  target: any,
  key: string,
  desc: RouteHandlerDescriptor
) => {
  Reflect.defineMetadata(MetadataKeys.fields, fields, target, key);
};
