const fetch = require("node-fetch");

async function fetchPlaces(lat, lon) {
    const overpassQuery = `
        [out:json];
        (
            node["tourism"~"attraction|museum|viewpoint"](around:5000, ${lat}, ${lon});
            way["tourism"~"attraction|museum|viewpoint"](around:5000, ${lat}, ${lon});
            relation["tourism"~"attraction|museum|viewpoint"](around:5000, ${lat}, ${lon});
        );
        out;
    `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.elements.map(place => ({
        name: place.tags.name || "Unknown Place",
        type: place.tags.tourism || "Attraction",
        location: {
            lat: place.lat || place.center.lat,
            lon: place.lon || place.center.lon
        }
    }));
}

module.exports = { fetchPlaces };