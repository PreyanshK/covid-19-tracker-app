import React from 'react'
import "./Map.css"
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { showDataOnMap } from '../utilities';

function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      {/* Pass the lat & long and zoom */}
      <LeafletMap>
        <ChangeMap center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        ></TileLayer>

         {/* Loop through countries and display circles for each country*/}
         {/* Bigger Circle = more cases, Smaller Circle = less cases */}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map
