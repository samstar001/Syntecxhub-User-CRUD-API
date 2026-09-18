# User CRUD API

A RESTful API for managing a `User` resource, built with Express and Mongoose (MongoDB). Supports full Create, Read, Update, and Delete operations with schema-level validation and centralized error handling.

## Tech Stack

- **Node.js** (ECMAScript Modules)
- **Express** — web framework / routing
- **Mongoose** — MongoDB object modeling and schema validation
- **MongoDB Atlas** — database
- **dotenv** — environment variable management
- **nodemon** (dev) — auto-restart on file changes

## Project Structure

```
user-crud-api/
├── config/
│   └── db.js              # MongoDB connection logic
├── models/
│   └── User.js             # Mongoose schema and model
├── controllers/
│   └── userController.js   # CRUD business logic
├── routes/
│   └── userRoutes.js       # Route definitions
├── middleware/
│   └── errorHandler.js     # Centralized error handler
├── postman/
│   └── User-CRUD-API.postman_collection.json
├── .env                     # Environment variables (not committed)
├── .gitignore
├── server.js                # App entry point
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB connection string (MongoDB Atlas or local instance)

### Installation

```bash
git clone https://github.com/samstar001/Syntecxhub-User-CRUD-API.git
cd samstar001/Syntecxhub-User-CRUD-API
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Running the server

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

On success, you should see:

```
MongoDB Connected: <your-cluster-host>
Server running on port 5000
```

## User Schema

| Field         | Type   | Required | Notes                                       |
| ------------- | ------ | -------- | ------------------------------------------- |
| `name`        | String | Yes      | Trimmed                                     |
| `email`       | String | Yes      | Unique, lowercased, format-validated        |
| `age`         | Number | No       | Must be between 0 and 120                   |
| `phoneNumber` | String | No       | Format-validated                            |
| `address`     | String | No       | Trimmed                                     |
| `role`        | String | No       | `"user"` or `"admin"`, defaults to `"user"` |
| `createdAt`   | Date   | Auto     | Set automatically                           |
| `updatedAt`   | Date   | Auto     | Set automatically                           |

## API Reference

Base URL: `http://localhost:5000/api/users`

### Create a User

```
POST /api/users
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "phoneNumber": "+2348012345678",
  "address": "123 Main Street"
}
```

**Success — `201 Created`:**

```json
{
  "success": true,
  "data": {
    "_id": "64f...",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "phoneNumber": "+2348012345678",
    "address": "123 Main Street",
    "role": "user",
    "createdAt": "2026-09-18T10:00:00.000Z",
    "updatedAt": "2026-09-18T10:00:00.000Z"
  }
}
```

**Error — `400 Bad Request`** (missing required field):

```json
{ "success": false, "message": "Name is required" }
```

**Error — `409 Conflict`** (duplicate email):

```json
{ "success": false, "message": "email already in use" }
```

---

### Get All Users

```
GET /api/users
```

**Success — `200 OK`:**

```json
{
  "success": true,
  "count": 2,
  "data": [{ "...": "user objects" }]
}
```

---

### Get a Single User

```
GET /api/users/:id
```

**Success — `200 OK`:**

```json
{ "success": true, "data": { "...": "user object" } }
```

**Error — `400 Bad Request`** (malformed ID):

```json
{ "success": false, "message": "Invalid _id: abc123" }
```

**Error — `404 Not Found`** (valid ID, no matching user):

```json
{ "success": false, "message": "User not found" }
```

---

### Update a User

```
PATCH /api/users/:id
```

**Body** (any subset of fields):

```json
{ "age": 26 }
```

**Success — `200 OK`:**

```json
{ "success": true, "data": { "...": "updated user object" } }
```

**Error — `404 Not Found`**:

```json
{ "success": false, "message": "User not found" }
```

---

### Delete a User

```
DELETE /api/users/:id
```

**Success — `200 OK`:**

```json
{ "success": true, "message": "User deleted successfully" }
```

**Error — `404 Not Found`**:

```json
{ "success": false, "message": "User not found" }
```

## Error Handling

All errors are caught by a centralized error-handling middleware (`middleware/errorHandler.js`) and returned in a consistent shape:

```json
{ "success": false, "message": "..." }
```

| Error Type                               | Status Code |
| ---------------------------------------- | ----------- |
| Validation error (missing/invalid field) | 400         |
| Malformed ID (`CastError`)               | 400         |
| Resource not found                       | 404         |
| Duplicate email (`code 11000`)           | 409         |
| Unhandled server error                   | 500         |

## Testing

A Postman collection covering all endpoints and error cases is included at `postman/User-CRUD-API.postman_collection.json`. Import it into Postman to run the full test suite:

1. Open Postman → **Import** → select the file.
2. Set the collection's base URL variable to `http://localhost:5000` (or update per-request URLs).
3. Run requests individually, or use the **Collection Runner** to execute all of them in sequence.

Covered cases: create, get all, get one, update, delete, duplicate email conflict, missing required field, malformed ID, and not-found ID.

## License

This project was built as a learning/assignment exercise.
