import { Signature, Prospect } from "@prisma/client";
import { Prisma } from ".prisma/client";

export type CrudMethods = "create" | "read" | "update" | "delete";

/**
 * ===============
 * DB AND MODELS
 * ===============
 */
/** model names as string */
export type DbCollectionTypes = Prisma.ModelName;

/** all models schema */
export type DbModels = Signature | Prospect;

/** Signature create fields */
export type SignatureInput = Omit<Signature, "id">;

/** Prospect create fields */
export type ProspectInput = Omit<Prospect, "id" | "completedRegistration">;

/** all models create fields */
export type ModelsInputs = SignatureInput | ProspectInput;

/** all models aggregate args */
export type ModelsAggregateArgs =
  | Prisma.SignatureAggregateArgs
  | Prisma.ProspectAggregateArgs;

/**
 * dbCreate params
 *
 * @param {DbCollectionTypes} collection Model name
 * @param {ModelsInputs} data Maps fields to all possible inputs for all models
 */
export interface DbCreate {
  collection: DbCollectionTypes;
  data: ModelsInputs;
}

/**
 * dbRead params.
 *
 * @param {DbCollectionTypes} collection DB collections
 * @param {ModelsAggregateArgs} where where clause for DB query
 * @param {boolean} [getAllRecords] true to return all matches, otherwise unique
 */
export interface DbRead {
  collection: DbCollectionTypes;
  where: ModelsAggregateArgs;
  getAllRecords?: boolean;
}

/** type of token must always be a string */
export type DbWhereToken = string;
