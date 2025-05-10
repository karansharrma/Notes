const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;


const signup = async (req, res) => {
  const { username, email, password,profileImageUrl } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
      profileImageUrl: profileImageUrl,
    });

    const generatedToken = jwt.sign(
      { email: newUser.email, id: newUser._id },
      SECRET_KEY
    );

    res.status(201).json({
      user: newUser,
      token: generatedToken,
    });
  } catch (err) {
    console.error("Error during signup:", err);  
    res.status(500).json({
      message: "Something went wrong during the signup process.",
      error: err.message || err, 
    });
  }
};

const signin = async (req, res) => {
  //user validating
  //password matching
  //login success
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not Found" });
    }

    const matchpassword = await bcrypt.compare(password, existingUser.password);

    if (!matchpassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const generatedtoken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(200).json({
      user: existingUser,
      token: generatedtoken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await userModel.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      users: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      message: "Something went wrong while fetching users.",
      error: err.message || err,
    });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params; // Extract user ID from request params
  const { username, email, profileImageUrl } = req.body; // Get updated data from the body

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.profileImageUrl = profileImageUrl || user.profileImageUrl;

    const updatedUser = await user.save();

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = { signup, signin, getAllUsers ,deleteUser,updateUser};

