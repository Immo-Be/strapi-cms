import React, { useEffect } from "react";
import { Grid, GridItem, TextInput } from "@strapi/design-system";
import { Coordinates } from "../../../../types";
import { Location3d } from ".";

const labels = {
  center: "Center",
  heading: "Heading",
  roll: "Roll",
  tilt: "Tilt",
  range: "Range",
  lng: "Longitude",
  lat: "Latitude",
} as const;

function generateId(len: number) {
  function dec2hex(dec: number) {
    return dec.toString(16).padStart(2, "0");
  }

  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}

export default function NumberFields({ location }: { location: Location3d }) {
  const windowInputValueDescriptor = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  );
  if (!windowInputValueDescriptor) return null;

  const latInputId = generateId(10);
  const lngInputId = generateId(10);
  const altitudeInputId = generateId(10);
  const rangeInputId = generateId(10);
  const tiltInputId = generateId(10);
  const headingInputId = generateId(10);
  const rollInputId = generateId(10);

  const flatenedLocation = Object.entries(location).flatMap(([key, value]) =>
    key === "center"
      ? Object.entries(value).map(([k, v]) => ({ [k]: v }))
      : [{ [key]: value }]
  );
  console.log("🚀 ~ flatenedLocation ~ flatenedLocation:", flatenedLocation);

  const {
    center: { lat, lng },
  } = location;

  useEffect(() => {
    // const latInput = document.getElementById(latInputId) as HTMLInputElement;
    // const lngInput = document.getElementById(lngInputId) as HTMLInputElement;
    // const setInputValueNatively = (input: HTMLInputElement, value: number) =>
    //   windowInputValueDescriptor.set!.call(input, isNaN(value) ? null : value);
    // setInputValueNatively(latInput, lat);
    // setInputValueNatively(lngInput, lng);
    // /* This will trigger a new render for the component */
    // const changeEvent = new Event("change", { bubbles: true });
    // latInput.dispatchEvent(changeEvent);
    // lngInput.dispatchEvent(changeEvent);
  }, [lat, lng]);

  return (
    <Grid gap={3}>
      {flatenedLocation.map((field, index) => {
        const key = Object.keys(field)[0];
        const value = Object.values(field)[0];

        // @ts-ignore
        const label = labels[key] || key;
        return (
          <GridItem col={6} key={index}>
            <TextInput
              id={key}
              placeholder={key}
              aria-label={label}
              hint={key}
              name={label}
              value={value}
              size="M"
            />
          </GridItem>
        );
      })}
    </Grid>
  );
}

{
  /* <GridItem col={6}>
<TextInput
  id={latInputId}
  placeholder="Latitude"
  aria-label="Latitude"
  hint="Latitude"
  name="latitude"
  onChange={(e: any) => {
    if (!e.target.value) return;
    onChange({ lat: Number(e.target.value), lng });
  }}
  size="S"
/>
</GridItem>

<GridItem col={6}>
<TextInput
  id={lngInputId}
  placeholder="Longitude"
  aria-label="Longitude"
  hint="Longitude"
  name="longitude"
  onChange={(e: any) => {
    if (!e.target.value) return;
    onChange({ lat, lng: Number(e.target.value) });
  }}
  size="S"
/>
</GridItem>
<GridItem col={6}>
<TextInput
  id={lngInputId}
  placeholder="Altitude"
  aria-label="Altitude"
  hint="Altitude"
  name="altitude"
  onChange={(e: any) => {
    if (!e.target.value) return;
    onChange({ lat, lng: Number(e.target.value) });
  }}
  size="S"
/>
</GridItem> */
}
