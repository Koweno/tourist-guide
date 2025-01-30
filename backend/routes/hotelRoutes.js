const express = require("express");
const { getHotels } = require("../controllers/hotelController");

const router = express.Router();

router.get("/hotels", getHotels);

module.exports = router;
