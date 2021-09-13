import React from "react";
import { Space } from "@wesdollar/dollar-ui.ui.space";

interface CommandWithDescriptionProps {
  command: string;
  description: string;
}

export const CommandWithDescription = ({
  command,
  description,
}: CommandWithDescriptionProps) => {
  return (
    <>
      <pre>{command}</pre>
      <Space height="0" />
      <span dangerouslySetInnerHTML={{ __html: description }} />
      <Space height="40px" />
    </>
  );
};
