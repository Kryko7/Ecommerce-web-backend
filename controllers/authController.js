const express = require("express");

const router = express.Router();

const connection = require("../services/db");


router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    connection.query("SELECT * FROM user WHERE email_address = ? AND password = ?",
    [email, password], 
    (err, result) => {
        if (err) throw err;
        if(result.length > 0){
            res.send({message: 'Success'});
        } else {
            res.send({message: 'Wrong email/password combination'});
        }
    });
});



module.exports = router;