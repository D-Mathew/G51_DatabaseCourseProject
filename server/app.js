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

// User gets all hotels based on filter
app.get("/hotels", async(req,res) => {
  try {
    const {price, capacity, view} = req.body;
    const result = await pool.query('SELECT * FROM "Project".rooms WHERE price < $1 AND capacity = $2 AND view = $3 ORDER BY price DESC', [price, capacity, view]);
    console.log(result.rows);
  } catch (err) {
    console.error(err.message);
  }
})

// User gets to see VIEW of all hotels in area
app.get("/hotelinarea", async(req,res) => {
  try {
    const result = await pool.query('SELECT * FROM "Project".view_available_rooms_per_area');
    console.log(result.rows);
  } catch (err) {
    console.error(err.message);
  }
})


// Customer makes booking
app.post('/bookings', async (req, res) => {
  try {
   const  {roomid, customerid, booking, startdate, enddate} = req.body;
   const result = await pool.query('INSERT INTO bookings/rentings (roomid, customerid, booking, startdate, enddate) VALUES ($1, $2, $3, $4, $5,)', [roomid, customerid, booking, startdate, enddate]);
   console.log(result.rows);
  } catch (err) {
    console.error(err.message);
  }
})

// Customer updates info 
app.put('/customers/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const { fullname, city, state, zipcode, streetnum, streetname, apartmentnum, idtype, idnumber } = req.body;

  try {
    const result = await pool.query(
      'UPDATE customers SET fullname = $1, city = $2, state = $3, zipcode = $4, streetnum = $5, streetname = $6, apartmentnum = $7, idtype = $8, idnumber = $9 WHERE customerid = $10',
      [fullname, city, state, zipcode, streetnum, streetname, apartmentnum, idtype, idnumber, customerId]
    );
    res.status(200).json({ message: 'Customer information updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


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

