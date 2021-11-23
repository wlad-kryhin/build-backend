const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const db = require("./db/connection");
const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

db.then(() => {
  console.log("Database connection successful.");
}).catch((error) => {
  console.log(error.message);
  process.exit(1);
});

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
