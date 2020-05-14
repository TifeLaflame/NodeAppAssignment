const fs = require('fs');
module.exports = {
    addProductPage: (req, res) => {
        res.render('addProduct.ejs', {
            title: 'Adding a New Product Page',
            message: ''
        });
    },
    addProduct: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let strName = req.body.strName;
        let nPrice = req.body.nPrice;
        let strDescription = req.body.strDescription;
        let uploadedFile = req.files.image;
        let strImage = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        strImage = strName + '.' + fileExtension;


        let productNameQuery = "SELECT * FROM `ecommerce` WHERE strName = '" + strName + "'";

        db.query(productNameQuery, (err, result) => {
            if (err) {
                console.log("another db error");
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Product already exists';
                res.render('addProduct.ejs', {
                    message,
                    title: "Add a New Product"
                });
            } else {
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    uploadedFile.mv(`public/assets/img/${strImage}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }

                let query = "INSERT INTO `ecommerce` (strName, nPrice, strDescription, strImage) VALUES ('" +
                strName + "', '" + nPrice + "', '" + strDescription + "', '"+ strImage +"')";
                db.query(query, (err, result) => {
                    if (err) {
                        console.log("You have a db query error");
                    }
                    res.redirect('/');
                });
            });
            } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('addProduct.ejs', {
                    message,
                    title: "Add a new product"
                });
            }
        }
    });
}, 
    editProductPage: (req, res) => {
        let productId = req.params.id;
        let query = "SELECT * FROM `ecommerce` WHERE id = '" + productId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('editProduct.ejs', {
                title: 'Edit Product'
                ,product: result[0]
                ,message: ''
            });
        });
    },
    editProduct: (req, res) => {
        let productId = req.params.id;
        let strName = req.body.strName;
        let nPrice = req.body.nPrice;
        let strDescription = req.body.strDescription;

        let query = "UPDATE `ecommerce` SET `strName` = '" + strName + "', `nPrice` = '" + nPrice + "', `strDescription` = '" + strDescription + "' WHERE `ecommerce`.`id` = '" + productId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteProduct: (req, res) => {
        let productId = req.params.id;
        let getImageQuery = 'SELECT strImage from `ecommerce` WHERE id = "' + productId + '"';
        let deleteUserQuery = 'DELETE FROM ecommerce WHERE id = "' + productId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let strImage = result[0].strImage;

            fs.unlink(`public/assets/img/${strImage}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};
