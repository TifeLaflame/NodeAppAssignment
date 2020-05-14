const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { getHomePage } = require('./routes/index');
const {addProductPage, addProduct, deleteProduct, editProduct, editProductPage} = require('./routes/product');
const port = 5000;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodecrud'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to Node  CRUD successfully');
});
global.db = db;

//configure middleware

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

 app.get('/', getHomePage); 
app.get('/add', addProductPage);
app.get('/edit/:id', editProductPage);
app.get('/delete/:id', deleteProduct);
app.post('/add', addProduct);
app.post('/edit/:id', editProduct);

const courses = [
    { id: 1, name: 'javascript' },
    { id: 2, name: 'PHP' },
    { id: 3, name: 'Wordpress' },
    { id: 4, name: 'Wordpress' }
];
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id ===
        parseInt(req.params.id));
    res.send(course);
})
app.get('/crudapp/posts/:month/:year', (req, res) => {
    res.send(req.params);
});
app.listen(5000, function() {
    console.log(`now running the server at http://localhost:${port}`);
    console.log("dirname", __dirname);
    console.log(" filename", __filename);
});
//we can pass in data from route