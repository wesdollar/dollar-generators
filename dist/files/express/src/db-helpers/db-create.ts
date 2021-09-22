import { prisma } from "./client";
import { DbCreate, DbModels } from "../types";
import { errorLogger } from "../logging/error-logger";
import { camelCase } from "lodash";

/**
 * Call Prisma to create resource.
 * Prisma expects model name to be lowercase.
 * The model will be made camelCase when passed.
 */
export const dbCreate = async ({
  collection,
  data,
}: DbCreate): Promise<DbModels | boolean> => {
  try {
    // @ts-expect-error prisma types don't like the dyanmic collection, no easy workaround
    const Model = await prisma[camelCase(collection)].create({
      data,
    });

    return Model;
  } catch (error) {
    const msg = "create resource failed";

    errorLogger(msg, error);

    throw new Error(msg);
  }
};
