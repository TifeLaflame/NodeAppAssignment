module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `ecommerce` ORDER BY id ASC";

        //execute db query
        db.query(query, (err, result) => {
            if (err) {
                console.log(" query error");
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Vanarts CRUD Application",
                ecommerce: result
            });

        });

    },
};