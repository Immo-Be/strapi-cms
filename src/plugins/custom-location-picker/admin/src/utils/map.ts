import { Coordinates } from "../../../types";
import { Location3d } from "../components/input";
import { loadMapsApi } from "./load-maps-api";

const mapOptions = {
  initialCameraOptions: {
    center: { lat: 51.5074, lng: 10, altitude: 1000000 },
    range: 30000000,
    tilt: 1,
    heading: 10,
    roll: 5,
  },
  loading: "async",
  libraries: ["maps3d"],
};

export const initMap = (
  mapContainer: HTMLElement,
  setMap: (map: google.maps.maps3d.Map3DElement) => void,
  options?: any
) => {
  console.log("🚀 ~ mapContainer:", mapContainer);
  if (!mapContainer) {
    throw new Error("Basemap.initMap() called without html element.");
  }

  // Load the Maps API and initialize the map.
  // I tried using the `Loader` class from `@googlemaps/js-api-loader`, but it didn't work.
  const mapsApiLoaded = loadMapsApi({
    v: "alpha",
    key: "AIzaSyDXlxrKS689NTGD3tFrZV3wVQNFLk4chyo",
    libraries: mapOptions.libraries,
    loading: mapOptions.loading,
  });

  const map: google.maps.maps3d.Map3DElement =
    document.createElement("gmp-map-3d");

  mapsApiLoaded.then(() => {
    mapContainer.append(map);

    map.style.width = "100%";
    map.style.height = "400px";

    setMap(map);
  });
};

export const getGeodata = (
  map: google.maps.maps3d.Map3DElement
): Location3d => {
  const { center, tilt, heading, roll } = map;
  return {
    center: {
      lat: center?.lat ?? 0,
      lng: center?.lng ?? 0,
      altitude: center?.altitude ?? 0,
    },
    tilt: tilt ?? 0,
    heading: heading ?? 0,
    roll: roll ?? 0,
    range: map.range ?? 0,
  };
};

export const noPoint: Location3d = {
  center: {
    lat: NaN,
    lng: NaN,
    altitude: NaN,
  },
  heading: NaN,
  roll: NaN,
  tilt: NaN,
  range: NaN,
};

export const isValidPoint = (point: Location3d): boolean => {
  return (
    !isNaN(point.center.lat) &&
    !isNaN(point.center.lng) &&
    !isNaN(point.center.altitude) &&
    !isNaN(point.heading) &&
    !isNaN(point.roll) &&
    !isNaN(point.tilt) &&
    !isNaN(point.range)
  );
};

export const isSamePoint = (
  point1: Location3d,
  point2: Location3d
): boolean => {
  return (
    point1.center.altitude === point2.center.altitude &&
    point1.center.lat === point2.center.lat &&
    point1.center.lng === point2.center.lng &&
    point1.heading === point2.heading &&
    point1.roll === point2.roll &&
    point1.tilt === point2.tilt &&
    point1.range === point2.range
  );
};
