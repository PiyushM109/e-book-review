# 📚 Book Review API

A secure RESTful API for managing books and their reviews, featuring user authentication and search functionality.

---

## 🚀 Features

- User authentication with JWT (`/signup`, `/login`)
- Add, view, and search books
- Add, update, and delete book reviews
- JWT-protected routes to secure access
- Password hashing using bcrypt

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcrypt for password hashing

---

## 📁 API Endpoints

### 🔐 Auth

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| POST   | `/signup` | Register a user     |
| POST   | `/login`  | Login and get token |

### 📚 Books

| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| POST   | `/books`     | Add a new book (auth)  |
| GET    | `/books`     | Get all books (auth)   |
| GET    | `/books/:id` | Get book by ID (auth)  |
| GET    | `/search`    | Search books (no auth) |

### ✍️ Reviews

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/books/:id/reviews` | Add review (auth)    |
| PUT    | `/reviews/:id`       | Update review (auth) |
| DELETE | `/reviews/:id`       | Delete review (auth) |

---

## 🔒 Middleware

- `verifyToken`: Validates JWT token for protected routes

---

## 🧪 Setup & Run Locally

1. **Clone the repo**
   ```bash
   git clone
   npm i
   npm start
   ```
