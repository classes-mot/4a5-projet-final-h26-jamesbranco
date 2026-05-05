import express from "express";
import songController from "../controllers/song-controller.js";
import { check } from "express-validator";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/", songController.getSongs);

router.get("/:id", songController.getSongById);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("artist").not().isEmpty(),
    check("genre").not().isEmpty(),
    checkAuth,
  ],
  songController.postSong,
);

router.patch("/:id", [checkAuth], songController.updateSongs);

router.delete("/:id", [checkAuth], songController.deleteSongs);

export default router;
