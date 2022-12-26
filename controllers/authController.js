const express = require("express");
const session = require('express-session');

const router = express.Router();

const connection = require("../services/db");



router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    connection.query("SELECT * FROM user WHERE email_address = ? AND password = ?",
    [email, password], 
    (err, result) => {
        if (err) throw err;
        if(result.length > 0){
            // create a session for the user
            req.session.email = email;
            res.send({message: 'Success'});
        } else {
            res.send({message: 'Wrong email/password combination'});
        }
    });
});


router.post('/signup', (req, res) => {
    const { firstName, lastName, email, password, laneAddress, city, telephoneNumber } = req.body;
    connection.query('SELECT * FROM user WHERE email_address = ?', [email], (err, result) => {
        if (err) throw err;
        if(result.length > 0){
            res.send({message: 'Email already in use'});
        } else {
            connection.query('INSERT INTO user (first_name, last_name, email_address, password, lane_address, city, telephone_number) VALUES (?,?,?,?,?,?,?)', [firstName, lastName, email, password, laneAddress, city, telephoneNumber], (err, result) => {
                if (err) throw err;
                res.send({message: 'Success'});

            });

        }
    });
});



module.exports = router;