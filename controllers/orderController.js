const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");

const router = express.Router();

const connection = require("../services/db");

const bodyParser = require("body-parser");
router.use(bodyParser.json());


router.post("/purchase", (req, res) => {

    const { cart, cartTotal, userDetails, checkoutDetails , order_status} = req.body;
    const user = userDetails;
    const cartDetails = cart;
    connection.beginTransaction((err) => {
        if (err) {
            res.status(500).json({message: "Error in transaction1"});
        }

        const orderQuery = "INSERT INTO shop_order (user_id, order_status, payment_method, delivery_method, order_total) VALUES (?, ?, ?, ?, ?)";
        const orderValues = [user.user_id, order_status, checkoutDetails.paymentMethod, checkoutDetails.deliveryMethod, cartTotal];
        connection.query(orderQuery, orderValues, (err, result) => {
            if (err) {
                connection.rollback(() => {
                    console.log(err);
                    res.status(500).json({message: "Error in transaction2"});
                });
                return;
            }
            console.log(result);
            // Update the stock
            for (let i = 0; i < cartDetails.length; i++) {
                const item = cartDetails[i];

                const stockQuery = "UPDATE product_item SET quantity = quantity - ? WHERE product_item_id = ?";
                const stockValues = [item.quantity, item.product_item_id];
                connection.query(stockQuery, stockValues, (err, result1) => {
                    if (err) {
                        connection.rollback(() => {
                            res.status(500).json({message: "Error in transaction3"});
                        });
                        return;
                    }

                    // Insert the order details into order_item table
                    const orderItemQuery = "INSERT INTO order_item (order_id, product_item_id, quantity) VALUES (?, ?, ?)";
                    const orderItemValues = [result.insertId, item.product_item_id, item.quantity];
                    connection.query(orderItemQuery, orderItemValues, (err, result2) => {
                        if (err) {
                            connection.rollback(() => {
                                res.status(500).json({message: "Error in transaction4"});
                            });
                            return;
                        }
                        console.log(result2);
                    });
                });
            }


            // Commit the transaction if everything is successful
            connection.commit((err) => {
                if (err) {
                    connection.rollback(() => {
                        res.status(500).json({message: "Error in transaction6"});
                    });
                    return;
                }

                res.status(200).json({message: "Transaction successful"});
            });
        });
    });
});



module.exports = router;