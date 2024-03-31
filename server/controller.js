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
            const {destination, startDate, endDate} = req.body
            console.log(destination, typeof(startDate), endDate)
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
            `, [startDate, endDate, destination])

            console.log(result.rows)
            res.status(200).json({ message: "Succesfully Found Hotel Results", data: result.rows });
        }
        catch (error){
            console.error("Unable to fetch list of hotels:", error)
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

    app.get('/api/bookRoom/:id', async (req, res) => {
        try {
            const roomId = req.params.id
            res.send(roomId)
        }
        catch (error) {
            console.error("Error fetching Room Details", error)
        }
    })
}