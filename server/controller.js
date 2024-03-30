module.exports = function(app, db){
    app.get('/', async (req, res) => {
        try {
            const results = await db.query("select * from project.bookings_rentings")
            res.status(200).json({
                "status": "Success",
                data: results.rows,
            })
        }
        catch (err) {
            console.log(err)
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
    
    app.post('/api/login', async(req, res) => {
        try {
        const { email, password } = req.body;

        // Query database for user by email
        const { rows } = await db.query('SELECT * FROM project.customers WHERE email = $1', [email]);
        const user = rows[0];

        if (!user) {
            // User not found
            return res.status(404).json({ message: "User not found" });
        }

        // Verify password
        const bcrypt = require('bcrypt');
        const match = await bcrypt.compare(password, user.hashed_password);
        if (match) {
            // Password matches, authentication successful
            res.status(200).json({ message: "Login successful", data: { email: user.email } });
        } else {
            // Password does not match
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Server error during login");
    }
    }) 

    app.post('/api/hotelResults', async (req, res) => {
        try {
            const {destination, start, end} = req.body
            const result = await db.query(`
                SELECT h.hotelid, COUNT(r.roomid) AS available_rooms
                FROM project.hotels h
                LEFT JOIN project.rooms r ON h.hotelid = r.hotelid
                AND r.roomid NOT IN (
                    SELECT b.roomid
                    FROM project.bookings_rentings b
                    WHERE b.startdate <= $1
                    AND b.enddate >= $2
                )
                WHERE h.city = $3
                
                GROUP BY h.hotelid;
            `, [start, end, destination])

            console.log(result.rows)
            res.status(200).json({ message: "Succesfully Found Hotel Results", data: result.rows });
        }
        catch {
            console.log("Unable to get Request")
        }
    }) 
}