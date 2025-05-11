const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const port = process.env.PORT || 3000;
const connectDB = require("./src/db");
//const quotes = require("../quotes.json");


app.use(cors());
connectDB();
app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRoutes);
app.use("/images", express.static(path.join(__dirname, "uploads")));


app.use("/uploads", express.static("uploads")); 
// app.get("/quote", (req, res) => {
//   res.status(200).json(quotes);
// });

// app.get("/random", (req, res) => {
//   let index = Math.floor(Math.random() * quotes.length);

//   let randomquote = quotes[index];
//   res.status(200).json(randomquote);
// });

app.listen(5000, () => {
  console.log("listening on port 5000");
});
//https://youtu.be/1XZqls0n_kA?si=3Ss9NOXU0-RzDmDs
