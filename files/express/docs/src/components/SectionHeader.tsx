import React from "react";
import { Space } from "@wesdollar/dollar-ui.ui.space";

interface SectionHeaderProp {
  children: JSX.Element;
  height: string;
}

export const SectionHeader = ({
  children,
  height = "40px",
}: SectionHeaderProp) => {
  return (
    <>
      <Space height={height} />
      <h3>{children}</h3>
    </>
  );
};
