const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const UserCredential = require('../models/user-credential');
const User = require('../models/user');
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
        if (user) {
            res.status(400).send({error: "Email Id already present", status : 400});
            return;
        }

        const hash = bcrypt.hashSync(password);

        const userCredential = new UserCredential({ email, password: hash });

        userCredential.save().then(() => {
            const user = new User({ _id: userCredential.id, email });
            user.save().then(() => {
                res.status(201).send({ id: userCredential.id , status : 201});
            });
        });
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" , status : 500});
    });
});

router.get('/me', auth.authenticate, (req, res) => {
    User.findOne({ _id: req.session.userId }).then(user => {
        if(!user){
            res.status(400).send({ error: "user not logged in" });
            return;
        }
        res.send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" , status : 500});
    });
});

router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId }).then(user => {
        if(!user){
            res.status(400).send({ error: "user not signed up" });
        }
        res.send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" , status : 500});
    });
});

router.put('/me', auth.authenticate, (req, res) => {
    if (!req.session.userId) {
        res.send(401).send({ error: "Not logged in", status : 401});
    }

    const { firstName, lastName } = req.body;

    const updateQuery = {};
    (firstName !== undefined) && (updateQuery.firstName = firstName);
    (lastName !== undefined) && (updateQuery.lastName = lastName);

    User.updateOne({ _id: req.session.userId }, updateQuery).then(() => {
        res.status(204).send();
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" , status : 500});
    });
});

module.exports = router;