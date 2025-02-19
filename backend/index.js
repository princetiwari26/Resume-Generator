const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const databaseConnectivity = require("./config/databaseConnectivity");
const uniqueId = require("./routes/uniqueId.route");
const resumeRouter = require("./routes/resume.route");

dotenv.config();
databaseConnectivity();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', uniqueId)
app.use('/api/resumes', resumeRouter)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));