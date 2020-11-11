import React from "react";
import { MapContainer as LeafLetMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./util";

function MapGraph({countries, casesType, center, zoom}) {
  return (
    <div class="map h-full bg-white mt-6 rounded-lg">
      <LeafLetMap center={center} zoom={zoom} className="h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreet</a>'
        />
        {showDataOnMap(countries, casesType)}
      </LeafLetMap>
    </div>
  );
}

export default MapGraph;
