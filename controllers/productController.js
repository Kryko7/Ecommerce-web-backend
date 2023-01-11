const express = require("express");

const router = express.Router();

const connection = require("../services/db");




router.get("/:category_id", (req, res) => {
    const categoryId = req.params.category_id;
    const query = `
      SELECT v.name AS variation, vo.value
      FROM variation v
      INNER JOIN variation_option vo
      ON v.variation_id = vo.variation_id
      WHERE v.category_id = ?
    `;
    connection.query(query, [categoryId], (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        const variations = {};
        results.forEach(result => {
          if (!variations[result.variation]) {
            variations[result.variation] = [];
          }
          variations[result.variation].push(result.value);
        });
        res.json({ variations });
        console.log(variations);
      }
    });
  });
  



module.exports = router;