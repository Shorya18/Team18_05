import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import RoomIcon from "@mui/icons-material/Room";
import pointer from "../../assets/animation/pointer.json";
import { useLottie } from "lottie-react";
import "./Map.css";

export default function Map() {
  const mapRef = useRef(null);
  const options = {
    animationData: pointer,
    loop: true,
  };
  const { View } = useLottie(options);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView([19.259092, 72.833823], 9);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; OpenStreetMap contributors",
        maxZoom: 20,
      }).addTo(map);

      const markerIcon = L.divIcon({
        className: "custom-marker-icon",
        html: renderToStaticMarkup(<RoomIcon style={{ color: "red" }} />),
      });

      L.marker([19.259092, 72.833823], {
        icon: markerIcon,
      }).addTo(map);
    }
  }, []);

  return (
    <div className="mapParent">
      <div className="gif">
		{View}
           </div>

      <div id="map" className="Map" />
    </div>
  );
}