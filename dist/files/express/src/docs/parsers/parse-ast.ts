import { parse } from "@babel/parser";
import { readFile } from "../helpers/read-file";

export const parseAst = (filePath: string): any => {
  const source = readFile(`${filePath}`);

  const parsed = parse(source, {
    sourceType: "module",
    plugins: ["typescript"],
  });

  /**
   * to strip:
   * $.program.body[1].specifiers[0].type = "ImportSpecifier"
   *
   * specifiers swill be empty on Interface definition
   * specifiers are only import and export declarations
   *
   * ## interface SuccessResponse
   * Interface identifier:
   * TSInterfaceDeclaration
   * $.program.body[2].declaration.body.type
   * $.program.body[2].declaration.type (better)
   *
   * $.program.body[2].declaration.id.loc.identifierName
   *
   * - properties TPPropertySignature
   * $.program.body[2].declaration.body.body
   * $.program.body[2].declaration.body.body[0].key
   * -- example status
   * $.program.body[2].declaration.body.body[0].key.name
   * $.program.body[2].declaration.body.body[0].optional
   * $.program.body[2].declaration.body.body[0].type
   *
   * - comments available at
   * $.program.body[2].leadingComments
   * $.program.body[2].trailingComments
   *
   * - indicator Interface is exported
   * $.program.body[2].type
   *
   *
   *
   * ## export const successResponse
   * Export constant properties available at:
   * $.program.body[3].declaration.declarations[0].init.body.body[0].declarations[0].init.properties
   *
   * Params available at:
   * $.program.body[3].declaration.declarations[0].init.params
   * - properties
   * $.program.body[3].declaration.declarations[0].init.params[0].properties
   * - example: message, status, resource
   * - type: ObjectPattern
   * $.program.body[3].declaration.declarations[0].init.params[0].type
   *
   * Property type (example: ObjectProperty):
   * $.program.body[3].declaration.declarations[0].init.body.body[0].declarations[0].init.properties[0].type
   * $.program.body[3].declaration.declarations[0].init.params[0].properties[0].key.name
   *
   * Return type (ReturnStatement) available at:
   * $.program.body[3].declaration.declarations[0].init.returnType
   * $.program.body[3].declaration.declarations[0].init.body.body[2].type (ReturnStatement)
   * $.program.body[3].declaration.declarations[0].init.body.body[0].declarations[0].id.name
   * typeName (SuccessResponse) $.program.body[3].declaration.declarations[0].init.body.body[0].declarations[0].id.typeAnnotation.typeAnnotation.typeName.loc.identifierName
   */

  // parsed

  return parsed;
};
