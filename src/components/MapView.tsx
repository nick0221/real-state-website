import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet default marker icon issue with bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(L.Icon.Default as any).mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const OFFICE_COORDS: [number, number] = [34.0679, -118.4051]; // Beverly Hills

export default function MapView() {
  return (
    <MapContainer
      center={OFFICE_COORDS}
      zoom={15}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={OFFICE_COORDS}>
        <Popup>
          <div className="font-semibold">Prestige Estates</div>
          <div className="text-sm">
            9420 Wilshire Blvd
            <br />
            Beverly Hills, CA 90212
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
