const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

console.log("SECRET_KEY:", SECRET_KEY);

const signup = async (req, res) => {
  const { username, email, password } = req.body;

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

module.exports = { signup, signin };
