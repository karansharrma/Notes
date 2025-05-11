const express = require("express");
const userRouter = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload"); 
const userModel=require("../models/user")
const cloudinary = require("../cloudinary");


const {
signup, signin, getAllUsers ,deleteUser,updateUser
} = require("../controller/userController");

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);


userRouter.delete("/delete/:id", auth, deleteUser);
userRouter.put("/update/:id", auth, updateUser);
userRouter.get("/profiles", getAllUsers);


userRouter.put(
  "/profile-image",
  auth,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const userId = req.userId;
      const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

      await userModel.findByIdAndUpdate(userId, {
        profileImageUrl: imageUrl,
      });

      res.status(200).json({
        imageUrl,
        message: "Profile image uploaded successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Failed to upload image", error: error.message });
    }
  }
);

userRouter.get("/profile-image", auth, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user || !user.profileImageUrl) {
      return res.status(404).json({ message: "No profile image found" });
    }

    res.status(200).json({
      imageUrl: user.profileImageUrl,
      message: "Profile image fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching profile image:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
module.exports = userRouter;
