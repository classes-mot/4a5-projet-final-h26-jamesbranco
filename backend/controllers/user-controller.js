import jwt from "jsonwebtoken";
import HttpError from "../util/http-error.js";
import { User } from "../models/User.js";

const registerUser = async (req, res, next) => {
  console.log("registering");
  console.log(req.body);
  const { username, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.error(err);
    const error = new HttpError("Enregistrement Échoué...", 500);
    return next(error);
  }

  if (existingUser) {
    res.status(422).json({ message: "Cet email est déjà utilisé." });
    return;
  }
  const createdUser = new User({
    username,
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.error(err);
    const error = new HttpError("Enregistrement Échoué...", 500);
    return next(error);
  }

  console.log("registered");
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  let identifiedUser;

  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    console.error(err);
    const error = new HttpError("Enregistrement Échoué...", 500);
    return next(error);
  }

  if (!identifiedUser || identifiedUser.password !== password) {
    res
      .status(401)
      .json({ message: "Identification échouée, vérifiez vos identifiants." });
  } else {
    let token;
    try {
      console.log("identifié!");
      token = jwt.sign(
        { userId: identifiedUser.id, email: identifiedUser.email },
        "cleSuperSecrete!",
        { expiresIn: "1h" },
      );
      console.log(token);
    } catch (err) {
      console.error(err);
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500,
      );
      return next(error);
    }
    res.status(201).json({
      userId: identifiedUser.id,
      email: identifiedUser.email,
      token: token,
    });
  }
};

export default {
  registerUser,
  loginUser,
};