const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const PORT = process.env.PORT || 5000;

//HANDLING UNCAUGHT EXCEPTION
process.on("uncaughtException", (error) => {
  console.log(error.message);
  console.log(`shutting down the server dut to uncaughtException`);

  process.exit(1);
});

//CONFIG
dotenv.config({ path: "backend/config/config.env" });

//DATABASE CONNECTION
connectDatabase();

app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});

//UNHANDLED PROMISE REJECTION
process.on("unhandledRejection", (error) => {
  console.log(error.message);
  console.log(`shutting down the server dut to unhandledRejection`);

  server.close(() => {
    process.exit(1);
  });
});
