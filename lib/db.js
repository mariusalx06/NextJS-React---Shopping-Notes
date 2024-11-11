import pg from "pg";
const database = new pg.Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

database.connect()
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Connection error", err.stack));

export default database;
