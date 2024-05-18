**Social Media Application Backend**

This is the backend for a social media application where users can create posts, like posts, and comment on posts. The backend is built using Node.js, Express, and Prisma.

**Project Setup**

1. **Clone the Repository**: First, you need to clone the repository. You can do this by running the following command in your terminal:

```bash
git clone https://github.com/your-username/your-repo.git
```

2. **Install Dependencies**: Next, you need to navigate to the project directory and install the dependencies. For this project, you'll need Express, Prisma, and a few other packages. You can install them by running the following command:

```bash
cd your-repo
npm install
```

3. **Set up Environment Variables**: The project uses environment variables to configure the database and other settings. You need to create a `.env` file in the root of the project and add the following variables:

```bash
DATABASE_URL=your-database-url
PORT=your-port-number
JWT_SECRET=your-jwt-secret
```

Replace `your-database-url`, `your-port-number`, and `your-jwt-secret` with your own values.

4. **Generate Prisma Client**: After installing the dependencies, you need to generate the Prisma client. You can do this by running the following command in your terminal:

```bash
npx prisma generate
```

5. **Start the Server**: Finally, you can start the server by running the following command:

```bash
npm start
```

The server will start on the port specified in the `.env` file.

**API Documentation**

The backend provides the following API endpoints:

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in a user and get a JWT token.
- `GET /posts`: Get a list of posts.
- `POST /posts`: Create a new post.
- `GET /posts/:id`: Get a single post.
- `PUT /posts/:id`: Update a post.
- `DELETE /posts/:id`: Delete a post.
- `POST /posts/:id/like`: Like a post.
- `DELETE /posts/:id/like`: Unlike a post.
- `POST /posts/:id/comments`: Create a new comment on a post.
- `GET /posts/:id/comments`: Get a list of comments on a post.
- `PUT /posts/:id/comments/:commentId`: Update a comment on a post.
- `DELETE /posts/:id/comments/:commentId`: Delete a comment on a post.

**Database Models**

The project uses the following database models:

- `User`: Represents a user in the system.
- `Post`: Represents a post created by a user.
- `Comment`: Represents a comment on a post.
- `Like`: Represents a like on a post.

The models are defined in the `prisma/schema.prisma` file.
