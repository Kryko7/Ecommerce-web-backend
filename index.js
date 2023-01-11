const express = require("express");
const app = express();
const connection = require("./services/db");
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

var UIController = require("./controllers/UIController");
var authController = require("./controllers/authController");
var reportController = require("./controllers/reportController");
var orderController = require("./controllers/orderController");
var deliveryController = require("./controllers/deliveryController");
var productController = require("./controllers/productController");

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));


app.use("/api/ui", UIController);

app.use("/api/auth", authController);

app.use("/api/report", reportController)

app.use("/api/order", orderController);

app.use("/api/delivery", deliveryController);

app.use("/api/variations", productController);



app.listen(8080, () => console.log("Server is listening to port 8080"));
