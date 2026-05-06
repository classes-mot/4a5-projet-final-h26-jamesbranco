import express from "express";
import cors from "cors";
import { connectDB } from "./util/db.js";
import errorHandler from "./handler/errorHandler.js";
import routeurSong from "./routes/song-route.js";
import routeurReview from "./routes/review-route.js";
import routeurUser from "./routes/user-route.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/reviews", routeurReview);
app.use("/api/songs", routeurSong);
app.use("/api/users", routeurUser);

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
