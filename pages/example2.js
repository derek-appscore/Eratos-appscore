import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useState, useEffect, useRef } from "react";

mapboxgl.accessToken = process.env.ENV_MAPBOX_TOKEN;

import fsPromises from "fs/promises";
import path from "path";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "/json/sample.geojson");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData,
  };
}

export default function Home(props) {
  const data = props;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-121.403732);
  const [lat, setLat] = useState(40.492392);
  const [zoom, setZoom] = useState(10);
  // const data = require("../public/json/sample.geojson");

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/satellite-v9", // style URL
      zoom: 4, // starting zoom
      center: [108, 4], // // starting center in [lng, lat]
      projection: "globe", // display map as a 3D globe
    });

    map.current.on("style.load", () => {
      map.current.setFog({}); // enable atmosphere and stars
    });

    map.current.on("load", () => {
      map.current.addSource("earthquakes", {
        type: "geojson",
        data: data,
      });

      map.current.addLayer({
        id: "earthquakes-layer",
        type: "circle",
        source: "earthquakes",
        paint: {
          "circle-radius": 4,
          "circle-stroke-width": 2,
          "circle-color": "red",
          "circle-stroke-color": "white",
        },
      });
    });
  });

  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(35, 55, 75, 0.9)",
          color: "#fff",
          padding: "6px 12px",
          fonFamily: "monospace",
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          margin: "12px",
          borderRadius: "4px",
        }}
      >
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    </>
  );
}
