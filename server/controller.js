module.exports = function(app, db){
    app.get('/api/getbooking', async (req, res) => {
        // Extract the email from the query parameters
        const { email } = req.query;
    
        // Check if the email is provided
        if (!email) {
            return res.status(400).json({ status: "Error", message: "Email is required." });
        }
    
        try {
            await db.query("SET search_path = 'project'");
            const results = await db.query(`
                SELECT 
                    h.streetnum, 
                    h.streetname, 
                    h.apartmentnum, 
                    h.zipcode,  
                    h.phonenumber, 
                    b.bookingid, 
                    b.startdate, 
                    b.enddate 
                FROM 
                    bookings_rentings b 
                    INNER JOIN customers c ON b.customerid = c.customerid
                    INNER JOIN rooms r ON b.roomid = r.roomid 
                    INNER JOIN hotels h ON r.hotelid = h.hotelid 
                WHERE 
                    c.email = $1;`, [email]); // Use parameterized query to prevent SQL injection
    
            res.status(200).json({
                status: "Success",
                data: results.rows,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: "Error", message: "Failed to fetch bookings." });
        }
    });

    app.get('/api/getallbookings', async (req, res) => {
        // Extract the email from the query parameters
        const { email } = req.query;
    
        // Check if the email is provided
        if (!email) {
            return res.status(400).json({ status: "Error", message: "Email is required." });
        }
    
        try {
            await db.query("SET search_path = 'project'");
            const results = await db.query(`
                SELECT 
                    h.streetnum, 
                    h.streetname, 
                    h.apartmentnum, 
                    h.zipcode,  
                    h.phonenumber, 
                    b.bookingid, 
                    b.startdate, 
                    b.enddate 
                FROM 
                    bookings_rentings b 
                    INNER JOIN customers c ON b.customerid = c.customerid
                    INNER JOIN rooms r ON b.roomid = r.roomid 
                    INNER JOIN hotels h ON r.hotelid = h.hotelid 
                WHERE 
                    c.email = $1;`, [email]); // Use parameterized query to prevent SQL injection
    
            res.status(200).json({
                status: "Success",
                data: results.rows,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: "Error", message: "Failed to fetch bookings." });
        }
    });
    

    app.post('/api/register', async(req, res) => {
        try {
            console.log('good');
            const registerInfo = req.body
            console.log(registerInfo.state);
            // Hash password
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(registerInfo.password, salt);

            let today = new Date();
            const month = today.getMonth()+1;
            const year = today.getFullYear();
            const date = today. getDate();
            const todaydate = year + "-" + month + "-" + date;
        

            const result = await db.query('INSERT INTO project.customers(email, hashed_password, fullname, city, state, zipcode, streetnum, streetname, apartmentnum, idtype, idnumber, registrationdate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);', [registerInfo.email, hash, registerInfo.fullName, registerInfo.city, registerInfo.state, registerInfo.zipcode, registerInfo.streetNum, registerInfo.streetName, registerInfo.aptNum, registerInfo.idType, registerInfo.idNum, todaydate ]);
            // res.json(result.rows);
            res.status(200).json({ message: "User registered successfully", data: registerInfo });
        }
        catch {
            console.log("Unable to get Request")
        }
    })
    
    // app.post('/api/login/:type', async(req, res) => {
    //     try {
    //         const type = req.params;
            

    //         const { email, password } = req.body;

    //         // Query database for user by email
    //         if (type = 'customer') {
    //             const { rows } = await db.query('SELECT * FROM project.customers WHERE email = $1', [email]);
    //         }
    //         if (type = 'employee') {
    //             const { rows } = await db.query('SELECT * FROM project.employees WHERE email = $1', [email]);
    //         }

    //         const user = rows[0];

    //         if (!user) {
    //             // User not found
    //             return res.status(404).json({ message: "User not found" });
    //         }

    //         // Verify password
    //         const bcrypt = require('bcrypt');
    //         const match = await bcrypt.compare(password, user.hashed_password);
    //         if (match) {
    //             // Password matches, authentication successful
    //             res.status(200).json({ message: "Login successful", data: { email: user.email } });
    //         } else {
    //             // Password does not match
    //             res.status(401).json({ message: "Invalid credentials" });
    //         }
    //     } catch (err) {
    //         console.error("Error during login:", err);
    //         res.status(500).send("Server error during login");
    //     }
    //     }) 

    app.post('/api/login/:type', async(req, res) => {
        try {
            const { type } = req.params; // Correctly destructure type
            const { email, password } = req.body;
    
            let query = '';
            if (type === 'customer') { // Use === for comparison
                query = 'SELECT * FROM project.customers WHERE email = $1';
                const { rows } = await db.query(query, [email]);
                const user = rows[0];
        
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                const bcrypt = require('bcrypt');
                const match = await bcrypt.compare(password, user.hashed_password);
                if (match) {
                    return res.status(200).json({ message: "Login successful", data: { email: user.email, type: type } }); // Optionally return type
                } else {
                }
            } else if (type === 'employee') {
                query = 'SELECT * FROM project.employees WHERE email = $1';
                const { rows } = await db.query(query, [email]);
                const user = rows[0];
        
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                if (user.hashed_password == password) {
                    return res.status(200).json({ message: "Login successful", data: { email: user.email, type: type } }); // Optionally return type
                } else {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
            } else {
                return res.status(400).json({ message: "Invalid login type" });
            }
    
            const { rows } = await db.query(query, [email]);
            const user = rows[0];
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const bcrypt = require('bcrypt');
            const match = await bcrypt.compare(password, user.hashed_password);
            if (match) {
                res.status(200).json({ message: "Login successful", data: { email: user.email, type: type } }); // Optionally return type
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).send("Server error during login");
        }
    });

    app.put('/api/update/:type', async(req, res) => {
        try {
            const { type } = req.params; // Correctly destructure type

            const registerInfo = req.body

            // Hash password
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(registerInfo.password, salt);

            let today = new Date();
            const month = today.getMonth()+1;
            const year = today.getFullYear();
            const date = today. getDate();
            const todaydate = year + "-" + month + "-" + date;
        

            const result = await db.query('INSERT INTO project.customers(email, hashed_password, fullname, city, state, zipcode, streetnum, streetname, apartmentnum, idtype, idnumber, registrationdate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);', [registerInfo.email, hash, registerInfo.fullName, registerInfo.city, registerInfo.state, registerInfo.zipcode, registerInfo.streetNum, registerInfo.streetName, registerInfo.aptNum, registerInfo.idType, registerInfo.idNum, todaydate ]);
            let query = '';
            if (type === 'customer') { // Use === for comparison
                
                query = 'SELECT * FROM project.customers WHERE email = $1';
            } else if (type === 'employee') {
                query = 'SELECT * FROM project.employees WHERE email = $1';
            } else {
                return res.status(400).json({ message: "Invalid login type" });
            }
    
            const { rows } = await db.query(query, [email]);
            const user = rows[0];
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const match = await bcrypt.compare(password, user.hashed_password);
            if (match) {
                res.status(200).json({ message: "Login successful", data: { email: user.email, type: type } }); // Optionally return type
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).send("Server error during login");
        }
    });
    

    app.post('/api/hotelResults', async (req, res) => {
        try {
            const { destination, startDate, endDate, price, capacity, view } = req.body;
            await db.query("SET search_path = 'project'");
            let query = `
                SELECT h.*, COUNT(r.roomid) AS available_rooms
                FROM hotels h
                LEFT JOIN rooms r ON h.hotelid = r.hotelid
                AND r.roomid NOT IN (
                    SELECT b.roomid
                    FROM bookings_rentings b
                    WHERE b.startdate <= '${startDate}'
                    AND b.enddate >= '${endDate}'
                )
                WHERE h.city = '${destination}'
            `

            // Array to hold query parameters
            // let queryParams = 

            // Dynamically add conditions based on additional filters
            if (price) {
                query +=  ` AND r.price <= ${price}`;
            }
            if (capacity) {
                console.log(capacity)
                if (capacity.length > 0) {
                    query +=  ` AND r.capacity IN ('${capacity[0]}'`;
                    for (let i=1; i < capacity.length - 1; i++) {
                        query += `,'${capacity[i]}' `
                    }
                    if (capacity.length - 1 !== 0) {
                        query += `,'${capacity[capacity.length - 1]}')`
                    }
                    else {
                        query += `)`
                    }
                }
            }
            if (view) {
                // console.log(view[view.length - 1])
                if (view.length > 0) {
                    query +=  ` AND r.view IN ('${view[0]} View'`;
                    for (let i=1; i < view.length - 1; i++) {
                        query += `,'${view[i]} View'`
                    }
                    if (view.length - 1 !== 0) {
                        query += `,'${view[view.length - 1]} View')`
                    }
                    else {
                        query += `)`
                    }
                }
            }

            query +=  ` GROUP BY h.hotelid, h.name`;
            console.log(query)

            try {
                const result = await db.query(query);
                console.log(result.rows);
                res.status(200).json({ message: "Succesfully Found Hotel Results", data: result.rows });
            } catch (err) {
                console.error(err.message);
                res.status(500).send("Server error");
            }
        } catch (err) {
            console.error("Error Fetching Hotel List, ", err)
        }
    }) 

    app.post('/api/getHotelDetails/:id', async(req, res) => {
        try {
            const hotel_id = req.params.id
            const {startDate, endDate} = req.body
            console.log(typeof(startDate))
            const result = await db.query(`
                SELECT project.rooms.*
                FROM project.rooms
                WHERE hotelid = $1
                AND roomid NOT IN (
                    SELECT roomid
                    FROM project.bookings_rentings b
                    WHERE b.startdate <= $2
                    AND b.enddate >= $3
                );
            `, [hotel_id, startDate, endDate])
            console.log(result.rows)
            res.status(200).json({message: "Successfully get Hotel Details", data: result.rows})
        }
        catch (error) {
            console.error("Error fetching hotel details:", error)
        }
    })

    app.get('/api/findFilteredHotels', async(req, res) => {
        try {
            const hotel_info = req.query
            console.log(hotel_info)
            res.send(hotel_info)
        }
        catch (error) {
            console.error("Error fetching Room Details", error)
        } 
    })

    app.post('/api/bookRoom/:id', async (req, res) => {
        try {
            const room_info = req.body
            res.send(room_info)
        }
        catch (error) {
            console.error("Error fetching Room Details", error)
        }
    })

    app.post('/api/confirmBooking/:id', async(req, res) => {
        try {
            const paymentinfo = req.body
            res.send(paymentinfo)
        }
        catch (error) {
            console.error("Error confirm booking details", error)
        }
    })

    app.get('/api/findBookings', async (req, res) => {
        try {
            const hotelRoominfo = req.body
            res.send(hotelRoominfo) 
        }
        catch (error) {
            console.error("Error fetching bookings details")
        }
    })
}