
const express = require("express");

const router = express.Router();

const connection = require("../services/db");


router.post('/delay', (req, res) => {
    const {mainCity, inStock} = req.body;
    let deliveryDelay = 0;
    if (mainCity === true && inStock === true){
        deliveryDelay = 5;
    } else if (mainCity === true && inStock === false){
        deliveryDelay = 8;
    }
    else if (mainCity === false && inStock === true){
        deliveryDelay = 7;
    }
    else if (mainCity === false && inStock === false){
        deliveryDelay = 10;
    }
    res.send({deliveryDelay});
});


router.post('/town', (req, res) => {
    const { city } = req.body;
    connection.query("SELECT * FROM city WHERE city_name = ?", [city], (err, result) => {
        if (err) throw err;
        res.send(result.length > 0);
    });
});


router.post('/stock-check', (req, res) => {
    cart = req.body;
    let inStock = true;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].quantity < `SELECT quantity FROM product WHERE product_id = ?`, cart[i].id) {
            inStock = false;
            break;
        }
    }
    res.send({ inStock });

})



module.exports = router;