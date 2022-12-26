const express = require("express");

const router = express.Router();

const connection = require("../services/db");


router.get("/categories", (req, res) => {
    connection.query("SELECT * FROM category", (err, result) => {
        if (err) throw err;
        res.send(result, );
    }); 
});


router.get("/:index", (req, res) => {
    connection.query("SELECT * FROM product_item", (err, result) => {
        if (err) throw err;
        res.send(result, );
    });
});



module.exports = router;