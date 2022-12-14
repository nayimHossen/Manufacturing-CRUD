const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());
app.use(cors());

//ROUTE IMPORT
const infoRouter = require("./routes/infoRoute");

app.use("/api/v1", infoRouter);

//MIDDLEWARE FOR ERROR
app.use(errorMiddleware);

module.exports = app;
