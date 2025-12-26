# Notes Backend API

A backend project built with **Node.js**, **Express**, and **MongoDB** that powers a Notes application. It provides APIs to create, read, update, delete notes, and handle image uploads with local storage / Cloudinary integration.

---

## 🚀 Features

* RESTful APIs for Notes management
* Image upload support (local storage / Cloudinary)
* Modular project structure (controllers, routes, models, middleware)
* Environment-based configuration using `.env`
* MongoDB integration using Mongoose

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **Multer** (for file uploads)
* **Cloudinary** (for image storage)
* **dotenv**

---

## 📁 Project Structure

```
Notes/
├── controller/        # Request handlers / business logic
├── middleware/        # Custom middlewares (upload, etc.)
├── models/            # Mongoose schemas
├── routes/            # API route definitions
├── src/               # Initial setup / base config
├── cloudinary.js      # Cloudinary configuration
├── index.js           # App entry point
├── package.json
└── .gitignore
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## ▶️ Installation & Running the Project

```bash
# Clone the repository
git clone https://github.com/karansharrma/Notes.git

# Navigate into the project
cd Notes

# Install dependencies
npm install

# Start the server
npm start
```

The server will start on:

```
http://localhost:5000
```

---

## 📌 API Overview (Example)

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| GET    | /notes     | Fetch all notes   |
| POST   | /notes     | Create a new note |
| PUT    | /notes/:id | Update a note     |
| DELETE | /notes/:id | Delete a note     |

*(Endpoints may vary based on routes implementation)*

---

## 📷 Image Upload

* Uses **Multer** for handling file uploads
* Supports local storage and Cloudinary
* Configuration available in `middleware/` and `cloudinary.js`

---

## 🧠 Learnings & Purpose

This project was built to:

* Practice backend architecture with Node.js
* Learn file uploads and cloud storage
* Build a scalable backend for a real-world Notes application

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Karan Sharma**
GitHub: [@karansharrma](https://github.com/karansharrma)
