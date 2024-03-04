require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const db = require('./database')

const app = express();

// Middleware
app.use(morgan("dev"))
// app.use((req, res, next) => {
//     console.log("This is a middleware");
//     next();
// });

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

