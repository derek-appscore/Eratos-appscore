import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useState, useEffect, useRef } from "react";

mapboxgl.accessToken = process.env.ENV_MAPBOX_TOKEN;

export default function Home() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
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
