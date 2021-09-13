import React, { useEffect } from "react";

const code = `
import * as React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { gritColors } from "../../constants/grit-colors";
import { Space } from "../../primitives/space";
import styled from "styled-components";
import { SetStateAction } from "react";
import { Dispatch } from "react";

export interface DiscStepperObjProps {
  label: string;
}

interface DiscStepperProps {
  /** total number of steps for stepper */
  steps: Array<DiscStepperObjProps>;
  /** current step the user is on */
  currentStep: number;
  /** onPress action when pressed */
  onPress: Dispatch<SetStateAction<number>>;
}

const Container = styled(View)\`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row;
\`;

/** Displays a stepper to indicate the number of steps in the given process. onClick action provides a callback for controlling what happens when a user clicks on a step's disc, useful for navigating the user between steps. */
export const DiscStepper = ({
  steps,
  currentStep,
  onPress,
}: DiscStepperProps) => {
  const { primary, nuetral } = gritColors;
  const spaceBetween = 0;
  const activeColor = primary.main;
  const inactiveColor = nuetral[400];
  const discSize = 16;

  return (
    <Container testID={\`DiscStepper-container\`}>
      {steps.map((step, index) => {
        const thisStep = index + 1;
        const totalSteps = steps.length;
        const color = thisStep <= currentStep ? activeColor : inactiveColor;

        return (
          <View key={\`disc-\${index}\`}>
            <IconButton
              icon="checkbox-blank-circle"
              color={color}
              size={discSize}
              onPress={() => onPress(thisStep)}
              accessibilityLabel={step.label}
            />
            {thisStep !== totalSteps && <Space width={spaceBetween} />}
          </View>
        );
      })}
    </Container>
  );
};
`;

const encode = encodeURIComponent;

const dependenciesArray = [
  encode("react-native-paper"),
  encode("styled-components"),
  encode("styled-components/native,styled-components,react-is"),
];

const dependenciesString = `${dependenciesArray.join(",")}`;

/**
 * DOES NOT WORK
 *
 * For embedding Snack in dom by building the component
 * from a string.
 */
export const SnackEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://snack.expo.dev/embed.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      data-snack-code={code}
      data-snack-dependencies={dependenciesString}
      data-snack-name="Disc%20Stepper"
      data-snack-description="Progress%20disc%20stepper"
      data-snack-preview="true"
      data-snack-platform="ios"
      style={{ height: "900px" }}
    ></div>
  );
};
