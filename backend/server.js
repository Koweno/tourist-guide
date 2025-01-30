const express = require("express");
const placeRoutes = require("./routes/placeRoutes");

const app = express();
app.use(express.json());

app.use("/api", placeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));