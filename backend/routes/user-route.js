import express from "express";
import userController from "../controllers/user-controller.js";

const router = express.Router();

router.post("/inscription", userController.registerUser);

router.post("/Connexion", userController.loginUser);

export default router;
