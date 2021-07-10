const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// body parser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser setup
app.use(cookieParser());

// cors setup
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200,
  })
);

// DB setup
const initDB = require("./db");
initDB();

// Routes setup
const routes = require("./routes/v1.routes");
app.use("/api/v1", routes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
