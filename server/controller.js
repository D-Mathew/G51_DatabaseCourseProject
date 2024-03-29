module.exports = function(app, db){
    app.get('/', async (req, res) => {
        try {
            const results = await db.query("select * from laboratories.artist")
            res.status(200).json({
                "status": "Success",
                data: results.rows,
            })
        }
        catch (err) {
            console.log(err)
        }

    });
}