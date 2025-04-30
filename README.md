# Backend Authentication System

This project is a simple authentication system built using Node.js, Express, and MongoDB. It includes user signup, signin functionalities, password hashing, JWT-based authentication, and error handling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [POST /signup](#post-signup)
  - [POST /signin](#post-signin)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/karansharmaa/Notes.git

2. Install the dependencies:
   '''bash
   npm install

   
3.Set up your environment variables. Create a .env file in the root of your project and add the following:

SECRET_KEY=your_secret_key
MONGO_URI=mongodb://localhost:5000/yourdbname

4. start the application
npm start OR node index.js



### Request body to register new user(JSON)

{
  "username": "string",
  "email": "string",
  "password": "string"
}


### Response after registering user
{
  "user": {
    "_id": "user_id",
    "username": "username",
    "email": "email"
  },
  "token": "jwt_token"
}


 NOTE:- Make sure to store the jwt_token somewhere bcz it will be use to create notes of that user


### Contributing
1.Fork the repository.
2.Create a new branch (git checkout -b feature-branch).
3.Commit your changes (git commit -am 'Add new feature').
4.Push to the branch (git push origin feature-branch).
5.Create a new Pull Request.







