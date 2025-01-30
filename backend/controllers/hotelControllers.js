    const { fetchHotels } = require("../utils/hotelFinder");

    exports.getHotels = async (req, res) => {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: "Missing latitude or longitude" });
        }

        try {
            const hotels = await fetchHotels(lat, lon);
            res.json(hotels);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch hotels" });
        }
    };
