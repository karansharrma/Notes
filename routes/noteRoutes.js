const express = require("express");
const noteRoutes = express.Router();
const auth = require("../middleware/auth");
const {
  createnote,
  updateenote,
  deletenote,
  getnote,
} = require("../controller/noteController");

noteRoutes.get("/", auth, getnote);

noteRoutes.post("/", auth, createnote);

noteRoutes.post("/:noteId", auth, deletenote);
noteRoutes.put("/:noteId", auth, updateenote);

module.exports = noteRoutes;
