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
      if (user.movies && user.movies.some(m => m.movieid === movieid)) {
        res.status(400).send({ erro: "user already rated this movie" });
        return;
      } else {
        const movie = {
          movieid: movieid,
          rate: rate,
          review: review,
        };
        // console.log(req.session.userid);
        user.movies.push(movie);
        user.save().then(()=>{

        });
        res.status(204).send();
        return;
      }
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
      if (user.movies  && user.movies.some(m => m.movieid === movieid)) {
        user.movies.forEach((movie) => {
            if (movie.movieid === movieid) {
                movie.rate = rate;
                movie.review = review;
          }
        });
        user.save();
        res.status(204).send();
        return;
      } else {
        res.status(400).send({ error: "user did not reviewed this movie yet" });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({ error: "Internal Server Error" });
      return;
    });
});

module.exports = router;