const express = require("express");
const app = express();
const connection = require("./services/db");
const cors = require('cors');
const bodyParser = require('body-parser');

var productController = require("./controllers/productController");

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/products', productController);

app.get("/", (req, res) => {
    connection.query("SELECT * FROM product_item", (err, result) => {
        if (err) throw err;
        res.send(result, );
    }); 
});

app.get("/test", (req, res) => {
    connection.query("SELECT * FROM product where category_id=3", (err, result) => {
        if (err) throw err;
        res.send(result, );
    }); 
});

app.get("/categories", (req, res) => {
    connection.query("SELECT * FROM category", (err, result) => {
        if (err) throw err;
        res.send(result, );
    }); 
});

app.listen(8080, () => console.log("Server is listening to port 8080"));
