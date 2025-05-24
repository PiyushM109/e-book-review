const express = require("express");
const connectDb = require("./config/Db_config");
const app = express();

app.use(express.json());

const Routes = require("./routes/routers");

app.use("/", Routes);

const start = async () => {
  try {
    await connectDb();
    app.listen(8080, () => {
      console.log("app is listening on port 8080");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
