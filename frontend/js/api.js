async function getPlaces(lat, lon) {
    try {
        const response = await fetch(`/api/places?lat=${lat}&lon=${lon}`);
        if (!response.ok) throw new Error("Failed to fetch places");
        return await response.json();
    } catch (error) {
        console.error("Error fetching places:", error);
        return [];
    }
}
