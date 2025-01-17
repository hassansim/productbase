# ProductBase

A full-stack MERN application for creating, managing, and browsing products, built with React, Node.js, Express, and MongoDB Atlas.

---

## Features

- **Full CRUD Operations**: Create, view, update, and delete products with cloud data storage in MongoDB Atlas.
- **Live Search**: Instant real-time filtering by product name.
- **Sorting**: Sort products by price (low to high, high to low) and name (A to Z, Z to A).
- **Favorites / Wishlist**: Save favorite products with persistent storage using Zustand and localStorage.
- **Delete Confirmation**: Modal alert dialog to prevent accidental product deletions.
- **Live Image Preview**: Visual preview of the image URL before adding a product.
- **Dark & Light Mode**: Built-in theme switcher powered by Chakra UI.

---

## Tech Stack

- **Frontend**: React 18, Vite, Chakra UI, Zustand, React Icons, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas with Mongoose ODM

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/hassansim/productbase.git
cd productbase
```

### 2. Install dependencies
Install root dependencies and frontend dependencies:
```bash
npm install
npm install --prefix frontend
```

### 3. Setup environment variables
Create a `.env` file in the root folder with:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
*(If `MONGO_URI` is omitted, the app will automatically start with an in-memory MongoDB instance for local testing).*

### 4. Run the application
```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/products

---

## Available Scripts

- `npm run dev`: Runs both the backend server and Vite frontend concurrently with live reload.
- `npm run build`: Builds the React frontend for production.
- `npm start`: Starts the production server.

---

## License

MIT
