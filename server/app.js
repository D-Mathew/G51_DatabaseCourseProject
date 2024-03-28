require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('./database');
const cors = require("cors");
const pool = require('./database/index');

const app = express();

// Middleware
app.use(morgan("dev"))
// app.use((req, res, next) => {
//     console.log("This is a middleware");
//     next();
// });

app.use(cors());
app.use(express.json());

app.post("/todos", async(req, res) => {
  try {
    const {description} = req.body;
    const result = await pool.query('SELECT * FROM "Project".hotels');
    console.log(result.rows);
    // console.log("Connected to database:", res.rows[0].current_database);
    // const newTodo = await pool.query('INSERT INTO "Project".todos (description) VALUES($1)', [description])
        // console.log("Connected to database:", res.rows[0].current_database);
    console.log(req.body);
    res.json(newTodo);
  } catch (error) {
    console.error(error.message);
  }
})

const port = process.env.PORT || 3001;

function init() {
    // app.use(express.static('static')) // Set Static Files
    // app.set('view engine', 'ejs'); // Set Template Engine
    app.listen(port, () => {
      console.log(`Server is up and listening on port ${port}`)
    })
  
    require("./controller.js")(app, db)
}

init()

module.exports = app

