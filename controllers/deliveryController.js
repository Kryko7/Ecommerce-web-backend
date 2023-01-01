
const express = require("express");

const router = express.Router();

const connection = require("../services/db");


router.post('/delay', async(req, res) => {
    const {mainCity, inStock} = req.body;
    let orderStatus = "in progress";
    let deliveryDelay = 0;
    if (mainCity === "true" && inStock === "true"){
        deliveryDelay = 5;
        orderStatus = "Processing-1"
    } else if (mainCity === "true" && inStock === "false"){
        deliveryDelay = 8;
        orderStatus = "Processing-2"
    }
    else if (mainCity === "false" && inStock === "true"){
        deliveryDelay = 7;
        orderStatus = "Processing-3"
    }
    else if (mainCity === "false" && inStock === "false"){
        deliveryDelay = 10;
        orderStatus = "Processing-4"
    }

    sendResponse(deliveryDelay, orderStatus, res);
});

function sendResponse(deliveryDelay, orderStatus, res){
    res.send({deliveryDelay, orderStatus});
}


router.post('/town', (req, res) => {
    const { city } = req.body;
    connection.query("SELECT * FROM city WHERE city_name = ?", [city], (err, result) => {
        if (err) throw err;
        res.send(result.length > 0);
    });
});


// router.post('/stock-check', (req, res) => {
//     cart = req.body;
//     var inStock = true;
//     for (let i = 0; i < cart.length; i++) {
//         connection.query("SELECT quantity FROM product_item WHERE product_item_id = ?", [cart[i].product_item_id], (err, result) => {
//             if (err) throw err;
//             console.log(result[0].quantity);
//             if (cart[i].quantity > result[0].quantity) {
//                 console.log(cart[i].quantity);
//                 console.log(result[0].quantity);
            
//                 inStock = false;
//                 console.log(inStock);
//             }
//         });
//     }
//     console.log(inStock);
//     res.send({ inStock });

// })

router.post('/stock-check', (req, res) => {
    cart = req.body;
    let inStock = true;
  
    function checkStock(callback) {
      let completed = 0;
      for (let i = 0; i < cart.length; i++) {
        connection.query("SELECT quantity FROM product_item WHERE product_item_id = ?", [cart[i].product_item_id], (err, result) => {
          if (err) throw err;
          console.log(result[0].quantity);
          if (cart[i].quantity > result[0].quantity) {
            inStock = false;
          }
          completed++;
          if (completed === cart.length) {
            callback();
          }
        });
      }
    }
  
    checkStock(function() {
      console.log(inStock);
      res.send({ inStock });
    });
  });
  
  



module.exports = router;