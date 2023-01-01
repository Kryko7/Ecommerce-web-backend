const express = require("express");
const session = require('express-session');
const jwt = require('jsonwebtoken');

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
            const token = jwt.sign({email: email, isAdmin: result[0].role === 'admin'}, 'secret', {expiresIn: '1h'});
            //res.cookie('auth_token',token);
            res.send({message: 'Success', token: token, result: result});
        } else {
            res.send({message: 'Wrong email/password combination'});
        }
    });
});

router.get('/signout', (req, res) => {
    if (req.session.email) {
        try {
            req.session.destroy();
            res.send({message: 'Success'});
        }
        catch(err) {
            res.send({message: 'Error'});
        }
    }
    else {
        res.send({message: 'No session'});
    }
    
});

router.post('/signup', (req, res) => {
    const { firstName, lastName, email, password, laneAddress, city, telephoneNumber } = req.body;
    connection.query('SELECT * FROM user WHERE email_address = ?', [email], (err, result) => {
        if (err) throw err;
        if(result.length > 0){
            res.send({message: 'Email already in use'});
        } else {
            connection.query('INSERT INTO user (`email_address`, `password`, `first_name`, `last_name`, `phone_number`, `address`, `City`) VALUES (?,?,?,?,?,?,?)', [email, password, firstName, lastName, telephoneNumber, laneAddress, city], (err, result) => {
                if (err) throw err;
                res.send({message: 'Success'});

            });

        }
    });
});


router.get('/verify-token', (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    if(!authorizationHeader){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }
    const parts = authorizationHeader.split(' ');
    if(parts.length !== 2){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }
    const token = parts[1];

    jwt.verify(token, 'secret', (err, decoded) => {
        if(err){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }
        return res.json({
            success: true,
            isAdmin: decoded.isAdmin,
        });
    });
});



module.exports = router;