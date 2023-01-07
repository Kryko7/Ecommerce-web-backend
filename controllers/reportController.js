const express = require("express");

const router = express.Router();

const connection = require("../services/db");


router.get("/quaterly-sales-report", (req, res) => {
    const { year } = req.query;
    connection.query(`SELECT
                        pi.product_item_id as product_item_id,
                        pi.product_name as product_name,
                        SUM(CASE WHEN QUARTER(o.order_date) = 1 THEN oi.quantity ELSE 0 END) as q1_sales,
                        SUM(CASE WHEN QUARTER(o.order_date) = 2 THEN oi.quantity ELSE 0 END) as q2_sales,
                        SUM(CASE WHEN QUARTER(o.order_date) = 3 THEN oi.quantity ELSE 0 END) as q3_sales,
                        SUM(CASE WHEN QUARTER(o.order_date) = 4 THEN oi.quantity ELSE 0 END) as q4_sales,
                        SUM(oi.quantity) as total_sales 
                    FROM shop_order o
                    JOIN order_item oi ON oi.order_id = o.order_id
                    JOIN product_item pi ON pi.product_item_id = oi.product_item_id
                    WHERE YEAR(o.order_date) = ?
                    GROUP BY product_item_id
                    ORDER BY total_sales DESC`, [year], (err, result) => {
        if (err) throw err;
        res.send(result, );
    
                    });
});

router.get("/products-with-most-sales", (req, res) => {
    const {start_date, end_date} = req.query;
    connection.query(`SELECT 
                        pi.product_item_id, 
                        pi.product_name, SUM(oi.quantity) as total_sales 
                    FROM shop_order o 
                    JOIN order_item oi ON o.order_id = oi.order_id 
                    JOIN product_item pi ON oi.product_item_id = pi.product_item_id 
                    WHERE o.order_date BETWEEN ? AND ? 
                    GROUP BY pi.product_item_id 
                    ORDER BY total_sales DESC`, [start_date, end_date], (err, result) => {
        if (err) throw err;
        res.send(result, );
        });

});

router.get("/most-ordered-category", (req, res) => {
    connection.query( `SELECT
                        c.category_name, 
                        SUM(oi.quantity) as total_quantity 
                    FROM Category c 
                    INNER JOIN product p ON c.ID = p.category_id 
                    INNER JOIN product_item pi ON p.product_id = pi.prduct_id 
                    INNER JOIN order_item oi ON pi.product_item_id = oi.product_item_id 
                    GROUP BY c.category_name 
                    ORDER BY total_quantity DESC `, (err, result) => {
        if (err) throw err;
        res.send(result, );
    
    });
});



router.get("/most-interest-period", (req, res) => {
    connection.query(`SELECT pi.product_item_id, pi.product_name as product_name, SUM(oi.quantity) as num_sales, 
                        YEAR(o.order_date) as year, MONTH(o.order_date) as month, 
                        QUARTER(o.order_date) as quarter
                    FROM shop_order o
                    JOIN order_item oi ON o.order_id = oi.order_id
                    JOIN product_item pi ON oi.product_item_id = pi.product_item_id
                    GROUP BY pi.product_item_id, year, month, quarter
                    ORDER BY year DESC, month DESC, quarter DESC, num_sales desc ` , (err, result) => {
        if (err) throw err;
        res.send(result, );
    });
});

router.get("/customer-order-report", (req, res) => {
    const { customer_id } = req.query;
    connection.query(`SELECT * FROM shop_order WHERE user_id = ?`, [customer_id], (err, result) => {
        if (err) throw err;
        res.send(result, );
    });
});


module.exports = router;