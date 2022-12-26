const express = require("express");

const router = express.Router();

const connection = require("../services/db");


router.get("/quaterlysales", (req, res) => {
    const { year } = req.body;
    // connection.query("SELECT * FROM sales WHERE YEAR(sales_date) = ?", [year], (err, result) => {
    //     if (err) throw err;
    //     res.send(result, );
});

router.get("/mostsold", (req, res) => {
    const {begin, end} = req.body;
    // connection.query("SELECT * FROM sales WHERE sales_date BETWEEN ? AND ?", [begin, end], (err, result) => {
    //     if (err) throw err;
    //     res.send(result, );
});

router.get("/most-ordered-category", (req, res) => {
    
    
});

router.get("/most-interest-period", (req, res) => {
    const { product_id } = req.body;
    // connection.query("SELECT * FROM sales WHERE product_id = ?", [product_id], (err, result) => {
    //     if (err) throw err;
    //     res.send(result, );
});

router.get("/customer-order-report", (req, res) => {
    const { customer_id } = req.body;
    // connection.query("SELECT * FROM sales WHERE customer_id = ?", [customer_id], (err, result) => {
    //     if (err) throw err;
    //     res.send(result, );
});


module.exports = router;