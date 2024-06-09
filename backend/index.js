const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const cors = require('cors');



const app = express();

// connect to db
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});


const connectAndQuery = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');

    client.release();
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
};

connectAndQuery()


// const runMigrations = async () => {
//   const client = await pool.connect();
//   try {
//       // const createTableSQL = fs.readFileSync("/home/harshit/Desktop/nestorbird/sql/backend/migrations/create_table.sql", 'utf-8');
//       // await client.query(createTableSQL);

//       const insertDataSQL = fs.readFileSync("/home/harshit/Desktop/nestorbird/sql/backend/migrations/insert_sample_data.sql", 'utf-8');
//       await client.query(insertDataSQL);

//       console.log('Migrations ran successfully');
//   } catch (err) {
//       console.error('Error running migration query:', err);
//   } finally {
//       client.release();
//   }
// };

// runMigrations();

// import routes
const authRoutes = require('./routes/auth');


// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors()); 



// routes
app.get('/', (req, res) => {
  res.send('Hello from Node API');
});

app.use('/api', authRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});

module.exports = app;