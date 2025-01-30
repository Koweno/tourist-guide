document.addEventListener("DOMContentLoaded", () => {
    const citySelect = document.getElementById("city");
    const placesList = document.getElementById("places-list");

    citySelect.addEventListener("change", async () => {
        const city = citySelect.value;
        const coords = getCityCoordinates(city);
        const places = await getPlaces(coords.lat, coords.lon);
        updatePlacesDisplay(places);
    });

    function getCityCoordinates(city) {
        const cities = {
            astana: { lat: 51.1694, lon: 71.4491 },
            shymkent: { lat: 42.3417, lon: 69.5901 },
            almaty: { lat: 43.222, lon: 76.8512 }
        };
        return cities[city];
    }

    function updatePlacesDisplay(places) {
        if (places.length === 0) {
            placesList.innerHTML = "<p>No places found</p>";
            return;
        }
        placesList.innerHTML = places.map(place => `
            <div class="place">
                <h3>${place.name}</h3>
                <p>Type: ${place.type}</p>
            </div>
        `).join("");
    }
});