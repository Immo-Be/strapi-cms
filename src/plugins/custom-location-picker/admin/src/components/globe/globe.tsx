import React, { useRef, useState, FunctionComponent, useEffect } from "react";
import { getGeodata, initMap } from "../../utils/map";
import { Location3d } from "../input";

interface Props {
  onCoordsChange: (value: { value: Location3d }) => void;
  name: string;
  attribute: any;
}

const Globe: FunctionComponent<Props> = ({
  onCoordsChange,
  name,
  attribute,
}) => {
  const [map, setMap] = useState<google.maps.maps3d.Map3DElement | null>(null);
  const [mapRef, setMapRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    mapRef && !map && initMap(mapRef, setMap);
  }, [mapRef, map]);

  if (map) {
    // map.addEventListener("mousemove", (e) =>
    //   console.log("🚀 ~ map.addEventListener ~ e target.lat:", e.target?.center)
    // );

    map.addEventListener("click", (event: any) => {
      // console.log(
      //   "🚀 ~ map.addEventListener event.target?.getAttribute:",
      //   event.target
      // );
      // const newValue = JSON.stringify(getGeodata(event.target));
      // console.log("🚀 ~ map.addEventListener ~ newValue:", newValue);

      onCoordsChange({ value: getGeodata(event.target) });
    });
  }

  return (
    <div
      id="map-container"
      ref={(ref) => {
        setMapRef(ref);
      }}
      style={{ width: "100%", height: "400px" }}
    ></div>
  );
};

export default Globe;
