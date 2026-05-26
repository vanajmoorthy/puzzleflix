require("dotenv").config();
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const eightqueensRouter = require("./routes/eightqueensindex");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/eightqueens", eightqueensRouter);
app.use("/api", indexRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

// Global error handler — previously this set status but never sent a response,
// so any error caused requests to hang until the client gave up.
app.use((err, req, res, next) => {
    console.error("Unhandled request error:", err.message);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
