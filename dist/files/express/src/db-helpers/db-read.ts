import { camelCase } from "lodash";
import { errorLogger } from "../logging/error-logger";
import { DbModels, DbRead } from "../types";
import { prisma } from "./client";

export const dbRead = async ({
  collection,
  where,
  getAllRecords,
}: DbRead): Promise<DbModels | boolean> => {
  const lookupMethod = getAllRecords ? "findMany" : "findUnique";

  try {
    // @ts-expect-error prisma types don't like the dyanmic collection, no easy workaround
    const Model = await prisma[camelCase(collection)][lookupMethod]({
      where,
    });

    return Model;
  } catch (error) {
    const msg = `find ${getAllRecords ? "records" : "record"} failed`;

    errorLogger(msg, error);

    throw new Error(msg);
  }
};
