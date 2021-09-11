export const splitProps = (props: string[]): [] => {
  const compiledProps = [];

  props.forEach((prop: string) => compiledProps.push(prop.split(":")));

  return compiledProps as [];
};
