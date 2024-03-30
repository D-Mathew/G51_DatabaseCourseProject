require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const db = require('./database')
const cors = require('cors')

const app = express();

// Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
// app.use((req, res, next) => {
//     console.log("This is a middleware");
//     next();
// });

const port = process.env.PORT;

function init() {
    // app.use(express.static('static')) // Set Static Files
    // app.set('view engine', 'ejs'); // Set Template Engine
    app.listen(port, () => {
      console.log(`Server is up and listening on port ${port}`)
    })
  
    require("./controller.js")(app, db)
}


// app.get("/api/available-rooms", async (req, res) => {
//   const { city, startDate, endDate, price, capacity, view } = req.query;
//   await pool.query("SET search_path = 'Project'");


//   // Start building your SQL query dynamically based on provided filters
//   let query = `
//     SELECT h.hotelid, h.name, COUNT(r.roomid) AS available_rooms
//     FROM hotels h
//     LEFT JOIN rooms r ON h.hotelid = r.hotelid
//     AND r.roomid NOT IN (
//         SELECT b.roomid
//         FROM bookings_rentings b
//         WHERE b.startdate <= $2
//         AND b.enddate >= $1
//     )
//     WHERE h.city = $3
//   `;

//   // Array to hold query parameters
//   let queryParams = [startDate, endDate, city];

//   // Dynamically add conditions based on additional filters
//   if (price) {
//     query += ` AND r.price <= $${queryParams.length + 1}`;
//     queryParams.push(price);
//   }
//   if (capacity) {
//     query += ` AND r.capacity = $${queryParams.length + 1}`;
//     queryParams.push(capacity);
//   }
//   if (view) {
//     query += ` AND r.view = $${queryParams.length + 1}`;
//     queryParams.push(view);
//   }

//   query += ` GROUP BY h.hotelid, h.name`;

//   try {
//     const result = await pool.query(query, queryParams);
//     console.log(result.rows);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });


// // Customer makes booking
// app.post('/bookings', async (req, res) => {
//   try {
//    const  {roomid, customerid, booking, startdate, enddate} = req.body;
//    const result = await pool.query('INSERT INTO bookings/rentings (roomid, customerid, booking, startdate, enddate) VALUES ($1, $2, $3, $4, $5,)', [roomid, customerid, booking, startdate, enddate]);
//    console.log(result.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// })

// // Customer updates info 
// app.put('/customers/:customerId', async (req, res) => {
//   const { customerId } = req.params;
//   const { fullname, city, state, zipcode, streetnum, streetname, apartmentnum, idtype, idnumber } = req.body;

//   try {
//     const result = await pool.query(
//       'UPDATE customers SET fullname = $1, city = $2, state = $3, zipcode = $4, streetnum = $5, streetname = $6, apartmentnum = $7, idtype = $8, idnumber = $9 WHERE customerid = $10',
//       [fullname, city, state, zipcode, streetnum, streetname, apartmentnum, idtype, idnumber, customerId]
//     );
//     res.status(200).json({ message: 'Customer information updated successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

init()

module.exports = app

