const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const databaseConnectivity = require("./config/databaseConnectivity");
const uniqueId = require("./routes/uniqueIdRoute");

dotenv.config();
databaseConnectivity();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', uniqueId)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));