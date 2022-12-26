const express = require("express");
const app = express();
const connection = require("./services/db");
const cors = require('cors');
const bodyParser = require('body-parser');

var UIController = require("./controllers/UIController");
const authController = require("./controllers/authController");
const reportController = require("./controllers/reportController");

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/ui", UIController);

app.use("/api/auth", authController);

app.use("/api/report", reportController)

// app.get("/", (req, res) => {
//     connection.query("SELECT * FROM product_item", (err, result) => {
//         if (err) throw err;
//         res.send(result, );
//     }); 
// });

// app.get("/test", (req, res) => {
//     connection.query("SELECT * FROM product where category_id=3", (err, result) => {
//         if (err) throw err;
//         res.send(result, );
//     }); 
// });



app.listen(8080, () => console.log("Server is listening to port 8080"));
