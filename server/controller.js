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
            const registerInfo = req.body
            res.status(200).json({ message: "User registered successfully", data: registerInfo });
        }
        catch {
            console.log("Unable to get Request")
        }
    })
    
    app.post('/api/login', async(req, res) => {
        try {
            const loginInfo = req.body
            res.status(200).json({ message: "User registered successfully", data: loginInfo });
        }
        catch {
            console.log("Unable to get Request")
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