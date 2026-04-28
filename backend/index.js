import express from "express";
import cors from "cors";
import { connectDB } from "./util/db.js";
import errorHandler from "./handler/errorHandler.js";
import routerReview from "./routes/review-route.js";
import routerUser from "./routes/user-route.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  const error = new Error("Route non trouvée");
  error.code = 404;
  next(error);
});

app.use(errorHandler);

await connectDB();

app.listen(5000, () => {
  console.log("serveur écoute au", `http://localhost:5000`);
});
