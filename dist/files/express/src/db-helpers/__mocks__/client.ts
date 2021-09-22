import { camelCase } from "lodash";
import { DbCollectionTypes } from "../../types";

const Model: DbCollectionTypes = "Signature";

export const prisma = {
  [camelCase(Model)]: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
};
