const noteModel = require("../models/note");

const createnote = async (req, res) => {
  const { title, description } = req.body;

  const newNote = new noteModel({
    title: title,
    description: description,
    userId: req.userId,
  });

  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateenote = async (req, res) => {
  const id = req.params.noteId;
  const { title, description } = req.body;

  const updatedNote = {
    title: title,
    description: description,
    userId: req.userId,
  };

  try {
    await updatedNote.findByIdAndUpdate(
      id,
      { title, description, userId: req.userId },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getnote = async (req, res) => {
  try {
    const notes = await noteModel.find({ userId: req.userId });
    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deletenote = async (req, res) => {
  const id = req.params.noteId;

  try {
    const note = await noteModel.findByIdAndRemove(id);

    res.status(200).json({ message: "Note Deleted Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = { createnote, updateenote, deletenote, getnote };
