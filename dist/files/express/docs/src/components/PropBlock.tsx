import React from "react";
import styled from "styled-components";

const Container = styled.div`
  .prop-title {
    font-size: 1.2rem;
    margin-top: 40px;

    pre {
      display: inline;
      margin-right: 12px;
    }

    span {
      font-size: 1rem;
    }
  }

  .prop-description {
    margin-top: 20px;
  }
`;

interface PropBlockProps {
  propName: string;
  propType: string;
  propDescription: string;
  required: boolean;
  defaultValue: string;
}

export const PropBlock = ({
  propName,
  propType,
  propDescription,
  required,
  defaultValue,
}: PropBlockProps) => {
  return (
    <Container>
      <div className="prop-title">
        <pre>{propName}</pre>
        <span>
          {propType} {required && `(required)`}
        </span>
      </div>
      <div className="prop-description">
        {defaultValue !== "null" && (
          <div>
            <em>default: {defaultValue}</em>
          </div>
        )}
        {propDescription}
      </div>
    </Container>
  );
};
