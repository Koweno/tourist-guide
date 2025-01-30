const { fetchPlaces } = require("../utils/placeFinder");

exports.getPlaces = async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Missing latitude or longitude" });
    }

    try {
        const places = await fetchPlaces(lat, lon);
        res.json(places);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch places" });
    }
};