import { parseAst } from "../../parsers/parse-ast";
import { cwd } from "process";

const parseType = (type: string): string => {
  let string;

  switch (type) {
    case "TSNumberKeyword":
      string = "number";
      break;

    case "TSStringKeyword":
      string = "string";
      break;

    case "TSTypeReference":
      string = "reference";
      break;

    case "TSInterfaceDeclaration":
      string = "interface";
      break;

    case "ExportNamedDeclaration":
      string = "namedExport";
      break;

    default:
      string = type;
      break;
  }

  return string;
};

const getInterfaces = (data: any): any => {
  const interfaces: any = [];

  // data.program.body[2].declaration.type
  data.program.body.forEach((b: any) => {
    if (b.declaration?.type === "TSInterfaceDeclaration") {
      const obj: any = {};

      obj.id = b.declaration.id.name;
      obj.type = parseType(b.type);
      obj.exported = b.type === "ExportNamedDeclaration";
      obj.declaration = {
        type: parseType(b.declaration.type),
        props: [],
      };
      b.declaration.body.body.forEach((db: any) => {
        const propsObj: any = {};

        propsObj.name = db.key.name;
        propsObj.option = db.optional;
        propsObj.type = parseType(db.typeAnnotation.typeAnnotation.type);

        obj.declaration.props.push(propsObj);
      });

      interfaces.push(obj);
    }
  });

  return interfaces;
};

const getImports = (data: any): any => {
  const imports: any = [];

  data.program.body.forEach((b: any) => {
    if (b.type === "ImportDeclaration") {
      const obj: any = {};

      obj.type = b.type;

      // $.program.body[0].specifiers[0].imported;
      b.specifiers?.forEach((spec: any) => {
        obj.name = spec.imported.name;
      });

      imports.push(obj);
    }
  });

  return imports;
};

const getExports = (data: any): any => {
  const exportsArray: any = [];

  data.program.body.forEach((b: any): any => {
    // const obj = {};

    if (b.type === "ExportNamedDeclaration") {
      exportsArray.push(b);
    }
  });

  return exportsArray;
};

export const parsedSuccessResponse = () => {
  /*
   * const fileId = "src/responses/success-response.ts";
   * const data = readFile(fileId);
   */

  // TODO: make parseAst dynamic somehow
  const parsed: unknown = parseAst(
    `${cwd()}/src/responses/success-response.ts`
  );

  const exports = getExports(parsed as any);
  const imports = getImports(parsed as any);
  const interfaces = getInterfaces(parsed as any);

  const response = {
    exports,
    imports,
    interfaces,
  };

  return response;
};
