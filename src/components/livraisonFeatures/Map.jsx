import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";

export default function MapItineraire() {
  const [startName, setStartName] = useState("Antananarivo");
  const [endName, setEndName] = useState("Ambohimangakely");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState({ start: [], end: [] });

  // 🔍 Fonction pour récupérer des suggestions
  async function getSuggestions(query, field) {
    if (query.length < 3) return setSuggestions((s) => ({ ...s, [field]: [] }));

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&countrycodes=mg&addressdetails=1&limit=5`
    );
    const data = await res.json();
    setSuggestions((s) => ({ ...s, [field]: data }));
  }

  // 🧭 Calcul de l’itinéraire
  async function fetchRoute() {
    if (!start || !end) {
      setError("Veuillez choisir les lieux dans la liste.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
      );
      const data = await res.json();
      if (!data.routes?.length) throw new Error("Aucun itinéraire trouvé");
      const coords = data.routes[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
      setRoute(coords);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Quand l’utilisateur choisit une suggestion
  const handleSelectSuggestion = (item, field) => {
    const coords = [parseFloat(item.lat), parseFloat(item.lon)];
    if (field === "start") {
      setStartName(item.display_name);
      setStart(coords);
    } else {
      setEndName(item.display_name);
      setEnd(coords);
    }
    setSuggestions((s) => ({ ...s, [field]: [] })); // cache la liste
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <div style={{ marginBottom: "10px", position: "relative" }}>
        {/* --- Champ départ --- */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <input
            type="text"
            value={startName}
            onChange={(e) => {
              setStartName(e.target.value);
              getSuggestions(e.target.value, "start");
            }}
            placeholder="Lieu de départ"
            style={{ padding: "8px", width: "300px", marginRight: "10px" }}
          />
          {suggestions.start.length > 0 && (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                background: "#fff",
                border: "1px solid #ccc",
                position: "absolute",
                zIndex: 1000,
                width: "300px",
                maxHeight: "150px",
                overflowY: "auto",
                textAlign: "left",
              }}
            >
              {suggestions.start.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleSelectSuggestion(item, "start")}
                  style={{
                    padding: "6px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* --- Champ arrivée --- */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <input
            type="text"
            value={endName}
            onChange={(e) => {
              setEndName(e.target.value);
              getSuggestions(e.target.value, "end");
            }}
            placeholder="Lieu d'arrivée"
            style={{ padding: "8px", width: "300px", marginRight: "10px" }}
          />
          {suggestions.end.length > 0 && (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                background: "#fff",
                border: "1px solid #ccc",
                position: "absolute",
                zIndex: 1000,
                width: "300px",
                maxHeight: "150px",
                overflowY: "auto",
                textAlign: "left",
              }}
            >
              {suggestions.end.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleSelectSuggestion(item, "end")}
                  style={{
                    padding: "6px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={fetchRoute}
          style={{
            padding: "8px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Calcul en cours..." : "Tracer l’itinéraire"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <MapContainer
        center={[-18.8792, 47.5079]}
        zoom={13}
        minZoom={7}
        maxZoom={17}
        maxBounds={[
          [-26, 42],
          [-11, 51],
        ]}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {start && <Marker position={start}><Popup>Départ</Popup></Marker>}
        {end && <Marker position={end}><Popup>Arrivée</Popup></Marker>}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
}
