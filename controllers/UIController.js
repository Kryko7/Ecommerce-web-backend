const express = require("express");

const router = express.Router();

const connection = require("../services/db");


router.get("/categories", (req, res) => {
    connection.query("SELECT * FROM category", (err, result) => {
        if (err) throw err;
        res.send(result, );
    }); 
});


// router.get("/:index", (req, res) => {
//     connection.query("SELECT * FROM product_item", (err, result) => {
//         if (err) throw err;
//         res.send(result, );
//     });
// });

router.get("/:index", (req, res) => {
    const { index } = req.params;
    if (index === '0') {
      connection.query('SELECT * FROM product_item', (err, result) => {
      if (err) throw err;
        res.send(result, );
    });
    } else {
      // connection.query('SELECT * FROM product_item WHERE product_item_id = ?', [index], (err, result) => {
      //   if (err) throw err;
      //   res.send(result, );
      //   });
      // connection.query('SELECT pi.* FROM product_item pi JOIN product p ON pi.prduct_id = p.product_id JOIN category c ON p.category_id = c.ID WHERE c.ID = ?', [index], (err, result) => {
      // if (err) throw err;
      //   res.send(result, );
      // });

      // connection.query(`SELECT pi.*
      //                 FROM product_item pi
      //                 JOIN product p ON pi.prduct_id = p.product_id
      //                 JOIN category c ON p.category_id = c.ID
      //                 JOIN category c2 ON c.parent_category_id = c2.ID
      //                 WHERE c2.ID = ?` , [index], (err, result) => {
      // if (err) throw err;
      //   res.send(result, );
      // });

      // connection.query(`SELECT pi.*
      //                   FROM product_item pi
      //                   JOIN product p ON pi.prduct_id = p.product_id
      //                   JOIN category c ON p.category_id = c.ID
      //                   WHERE c.ID IN (
      //                   SELECT c2.ID
      //                   FROM category c2
      //                   WHERE c2.parent_category_id = ?)`, [index], (err, result) => {
      // if (err) throw err;
      //   res.send(result, );
      // });
      
      connection.query(`WITH RECURSIVE subcategories AS (
                        SELECT ID, category_name, parent_category_id
                        FROM category
                        WHERE ID = ?
                        UNION ALL
                        SELECT c.ID, c.category_name, c.parent_category_id
                        FROM subcategories s
                        LEFT JOIN category c ON s.ID = c.parent_category_id
                        WHERE c.ID IS NOT NULL
                        ) 
                        SELECT pi.*
                        FROM product_item pi
                        JOIN product p ON pi.prduct_id = p.product_id
                        JOIN category c ON p.category_id = c.ID
                        JOIN subcategories s ON c.ID = s.ID`, [index], (err, result) => {
      if (err) throw err;
        res.send(result, );
      });

      
      
      
      
      
}
    // connection.query(query, (err, result) => {
    //   if (err) throw err;
    //   res.send(result);
    // });
});

module.exports = router;