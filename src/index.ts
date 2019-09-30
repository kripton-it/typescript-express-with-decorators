import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controllers/Root";
import "./controllers/Login";
import { AppRouter } from "./AppRouter";

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(
  cookieSession({
    keys: ["xyz"]
  })
);
app.use(AppRouter.instance);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
