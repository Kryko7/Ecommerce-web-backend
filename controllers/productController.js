const express = require("express");

const router = express.Router();

const connection = require("../services/db");

router.get("/", (req, res) => {
    connection.query("SELECT * FROM product_item", (err, result) => {
        if (err) throw err;
        res.send(result, );
    });
});

module.exports = router;