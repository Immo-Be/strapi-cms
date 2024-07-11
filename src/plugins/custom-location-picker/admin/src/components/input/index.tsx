import React, { forwardRef, useEffect, useReducer, useState } from "react";
import { Box } from "@strapi/design-system";
import Globe from "../../components/globe/globe";

import NumberFields from "./Input";
import { isValidPoint, isSamePoint } from "../../utils/map";

export interface Location3d {
  center: {
    lat: number;
    lng: number;
    altitude: number;
  };
  heading: number;
  roll: number;
  tilt: number;
  range: number;
}

interface IndexProps {
  attribute: any;
  disabled: boolean;
  intlLabel: string;
  name: string;
  onChange: (value: any) => void;
  required: boolean;
  value: string;
}

const initialLocation: Location3d = {
  center: {
    lat: 0,
    lng: 0,
    altitude: 0,
  },
  heading: 0,
  roll: 0,
  tilt: 0,
  range: 0,
};

const Index = forwardRef(
  (
    {
      attribute,
      disabled,
      intlLabel,
      name,
      onChange,
      required,
      value,
    }: IndexProps,
    ref
  ) => {
    const [currentPoint, setCurrentPoint] = useReducer(
      (state: Location3d, action: { value: Location3d }) => {
        const { value } = action;

        if (isValidPoint(value) && !isSamePoint(state, value)) {
          return value;
        } else {
          return state;
        }
      },
      value ? JSON.parse(value) : initialLocation
    );

    useEffect(() => {
      onChange({
        target: {
          name,
          value: JSON.stringify(currentPoint),
          type: attribute.type, // json
        },
      });
    }, [currentPoint]);

    return (
      <>
        <Box marginTop={1}>
          <Globe
            onCoordsChange={(point: { value: Location3d }) =>
              setCurrentPoint(point)
            }
            name={name}
            attribute={attribute}
          />
        </Box>

        <Box paddingTop={2}>
          <NumberFields location={currentPoint} />
        </Box>
      </>
    );
  }
);

export default Index;
