import * as pluralize from "pluralize";
import { camelCase, upperFirst } from "lodash";

/** get model name in PascalCase */
export const getModelName = (resourceId: string): string =>
  upperFirst(camelCase(pluralize.singular(resourceId)));
