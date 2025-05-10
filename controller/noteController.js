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
    res.status(500).json({ message: "Something went wrong" ,error:err.message});
  }
};

const updateenote = async (req, res) => {
  const id = req.params.noteId;    
  const { title, description } = req.body;

  try {
    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      { title, description, userId: req.userId },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong",error:err.message });
  }
};

const getnote = async (req, res) => {
  try {
    const notes = await noteModel.find({ userId: req.userId });
    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong",error:err.message });
  }
};

const deletenote = async (req, res) => {
  try {
    const noteId = req.params.noteId;

    const deletedNote = await noteModel.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error); 
    res.status(500).json({ message: "Something went wrong", error: error.message }); 
  }
};


module.exports = { createnote, updateenote, deletenote, getnote };
