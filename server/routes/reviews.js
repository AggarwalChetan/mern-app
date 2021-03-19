const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middlewares/auth");

router.post("/", auth.authenticate, (req, res) => {
  if (!req.body) {
    res.status(400).send({ error: "rate and review data is missing" });
    return;
  }

  const { movieid, rate, review } = req.body;

  if (!movieid) {
    res.status(400).send({ error: "movieid is not present in request" });
    return;
  }
  if (!rate) {
    res.status(400).send({ error: "rate is not present in request" });
    return;
  }

  if (!review) {
    res.status(400).send({ error: "review is not present in request" });
    return;
  }

  User.findOne({ _id: req.session.userId })
    .then((user) => {
      if (!user) {
        res.status(400).send({ error: "User not found" });
        return;
      }
      const movie = {
        movieid: req.body.movieid,
        rate: req.body.rate,
        review: req.body.review,
      };
      user.movies.push(movie);
      user.save();

      res.status(204).send();
    })
    .catch(() => {
      res.status(500).send({ error: "Internal Server Error" });
    });
});

router.patch("/", auth.authenticate, (req, res) => {
  if (!req.body) {
    res.status(400).send({ error: "rate and review data is missing" });
    return;
  }

  const { movieid, rate, review } = req.body;

  if (!movieid) {
    res.status(400).send({ error: "movieid is not present in request" });
    return;
  }
  if (!rate) {
    res.status(400).send({ error: "rate is not present in request" });
    return;
  }

  if (!review) {
    res.status(400).send({ error: "review is not present in request" });
    return;
  }
  User.findOne({ _id: req.session.userId })
    .then((user) => {
      if (!user) {
        res.status(400).send({ error: "User not found" });
        return;
      }
      const query = { movieid: req.body.movieid };
      user.movies.findOneAndUpdate(query, {
        rate: req.body.rate,
        review: req.body.review,
      });
      user.save();
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).send({ error: "Internal Server Error" });
    });
});

module.exports = router;