const express = require('express');
const router = express.Router();
const UserCredential = require('../models/user-credential');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
    if (!req.body) {
        res.status(400).send({error: "Email Id and Password not present", status : 400});
        return;
    }

    const { email, password } = req.body;

    if (!email) {
        res.status(400).send({error: "Email Id not present", status : 400});
        return;
    }

    if (!password) {
        res.status(400).send({error: "Password not present", status : 400});
        return;
    }

    UserCredential.findOne({ email }).then(user => {
        if (!user) {
            res.status(400).send({error: "User not signed up", status : 400});
            return;
        }

        const match = bcrypt.compareSync(password, user.password);

        if (!match) {
            res.status(400).send({error: "Incorrect email or password", status : 400});
            return;
        }

        req.session.userId = user.id;
        res.status(204).send({error : "Sign In Successful", status : 204});
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" , status : 500});
    });
});

router.delete('/me', (req, res) => {
    delete req.session.userId;
    res.status(204).send({status : 204});
});

module.exports = router;