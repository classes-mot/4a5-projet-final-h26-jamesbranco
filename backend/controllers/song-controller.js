import { Song } from "../models/Song.js";
import mongoose from "mongoose";

const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();

    res.json(songs);
  } catch (err) {
    return next(new Error("Erreur recuperation chansons"));
  }
};

const getSongById = async (req, res, next) => {
  const songId = req.params.id;

  let song;
  try {
    song = await Song.findById(songId);
  } catch (err) {
    console.log(err);
    return next(new Error("Erreur"));
  }

  if (!song) {
    return res.status(404).json({ message: "Song non trouvé" });
  }

  res.json({ song: song.toObject({ getters: true }) });
};

const postSong = async (req, res, next) => {
  const song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
  });

  try {
    await song.save();
  } catch (err) {
    return next(new Error("Erreur lors de la creation"));
  }
  res.status(201).json(song);
};

const updateSongs = async (req, res, next) => {
  const songId = req.params.id;
  const songUpdates = req.body;

  try {
    const updatedSong = await Song.findByIdAndUpdate(songId, songUpdates, {
      new: true,
    });

    if (!updatedSong) {
      return res.status(404).json({ message: "Chanson non trouvée..." });
    }

    res.status(200).json({ song: updatedSong.toObject({ getters: true }) });
  } catch (err) {
    return next(new Error("erreur"));
  }
};

const deleteSongs = async (req, res, next) => {
  const songId = req.params.id;

  try {
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Chanson non trouvée." });
    }
    await song.deleteOne();

    res.status(200).json({ message: "Chanson supprimer" });
  } catch (err) {
    return next(new Error("erreur"));
  }
};

export default {
  getSongs,
  getSongById,
  postSong,
  updateSongs,
  deleteSongs,
};
