const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require('./routes')
const limiter = require('./utils/limiter')
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(router)

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
