import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useState, useEffect, useRef } from "react";

mapboxgl.accessToken = process.env.ENV_MAPBOX_TOKEN;

export default function Home() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-121.403732);
  const [lat, setLat] = useState(40.492392);
  const [zoom, setZoom] = useState(10);

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

    map.current.on("load", () => {
      map.current.addSource("national-park", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-121.353637, 40.584978],
                    [-121.284551, 40.584758],
                    [-121.275349, 40.541646],
                    [-121.246768, 40.541017],
                    [-121.251343, 40.423383],
                    [-121.32687, 40.423768],
                    [-121.360619, 40.43479],
                    [-121.363694, 40.409124],
                    [-121.439713, 40.409197],
                    [-121.439711, 40.423791],
                    [-121.572133, 40.423548],
                    [-121.577415, 40.550766],
                    [-121.539486, 40.558107],
                    [-121.520284, 40.572459],
                    [-121.487219, 40.550822],
                    [-121.446951, 40.56319],
                    [-121.370644, 40.563267],
                    [-121.353637, 40.584978],
                  ],
                ],
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-121.415061, 40.506229],
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-121.505184, 40.488084],
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-121.354465, 40.488737],
              },
            },
          ],
        },
      });

      map.current.addLayer({
        id: "park-boundary",
        type: "fill",
        source: "national-park",
        paint: {
          "fill-color": "#888888",
          "fill-opacity": 0.4,
        },
        filter: ["==", "$type", "Polygon"],
      });

      map.current.addLayer({
        id: "park-volcanoes",
        type: "circle",
        source: "national-park",
        paint: {
          "circle-radius": 6,
          "circle-color": "#B42222",
        },
        filter: ["==", "$type", "Point"],
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
