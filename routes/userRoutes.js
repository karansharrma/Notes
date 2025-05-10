const express = require("express");
const userRouter = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload"); 
const userModel=require("../models/user")

const {
signup, signin, getAllUsers ,deleteUser,updateUser
} = require("../controller/userController");

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);


userRouter.delete("/delete/:id", auth, deleteUser);
userRouter.put("/update/:id", auth, updateUser);
userRouter.get("/profiles", getAllUsers);

userRouter.put(
  "/profile",
  auth,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    try {
      const userId = req.userId;

      await userModel.findByIdAndUpdate(userId, {
        profileImageUrl: imageUrl,
      });

      res
        .status(200)
        .json({ imageUrl, message: "Profile image updated successfully" });
    } catch (error) {
      console.error("Error updating profile image:", error);
      res.status(500).json({ message: "Failed to update profile image" , error:error.message});
    }
  }
);
module.exports = userRouter;
