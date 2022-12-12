const express = require("express");
const app = express();
const connection = require("./services/db");



app.get("/", (req, res) => {
    connection.query("SELECT * FROM product_item", (err, result) => {
        if (err) throw err;
        res.send(result, );
    }); 
});
app.listen(8080, () => console.log("Server is listening to port 8080"));