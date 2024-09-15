# User Management API

This is a simple Express.js API for managing user information using MySQL database.

## Prerequisites

- Node.js
- MySQL

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your MySQL database and update the connection details in the code:
   ```javascript
   const con = mysql.createConnection({
     host: "localhost",
     user: "xxx",
     password: "xxx",
     database: "xxxx"
   });
   ```

## Database Setup

Create a table named `forms` in your MySQL database with the following structure:

```sql
CREATE TABLE forms (
  ID INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  sername VARCHAR(255),
  gender VARCHAR(50),
  birthday DATE,
  fb VARCHAR(255),
  tel VARCHAR(20),
  edu VARCHAR(255),
  home TEXT,
  img TEXT
);
```

## Running the Application

Start the server:

```
node app.js
```

The server will start running on `http://localhost:3000`.

## API Endpoints

- `GET /search?keyword=<search_term>`: Search users by keyword
- `GET /User`: Get all users
- `GET /User/:id`: Get a specific user by ID
- `POST /AddUser`: Add a new user
- `PATCH /EditUser`: Update an existing user
- `DELETE /User/:id`: Delete a user by ID

## Usage Examples

### Search Users
```
GET /search?keyword=John
```

### Get All Users
```
GET /User
```

### Get User by ID
```
GET /User/1
```

### Add New User
```
POST /AddUser
Content-Type: application/json

{
  "name": "John",
  "sername": "Doe",
  "gender": "Male",
  "birthday": "1990-01-01",
  "fb": "john.doe",
  "tel": "1234567890",
  "edu": "Bachelor's",
  "home": "123 Main St",
  "img": "http://example.com/image.jpg"
}
```

### Update User
```
PATCH /EditUser
Content-Type: application/json

{
  "id": 1,
  "name": "John",
  "sername": "Smith",
  "gender": "Male",
  "birthday": "1990-01-01",
  "fb": "john.smith",
  "tel": "0987654321",
  "edu": "Master's",
  "home": "456 Elm St",
  "img": "http://example.com/new-image.jpg"
}
```

### Delete User
```
DELETE /User/1
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Security Considerations

- This example uses plain SQL queries. In a production environment, use parameterized queries or an ORM to prevent SQL injection.
- Implement proper authentication and authorization mechanisms.
- Use HTTPS in production to encrypt data in transit.
- Validate and sanitize all user inputs.

## Contributing

Feel free to submit pull requests or open issues to improve the application.

## License

This project is open source and available under the [MIT License](LICENSE).
