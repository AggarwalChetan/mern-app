const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Movie = require("../models/movie");
const auth = require("../middlewares/auth");

router.post("/", auth.authenticate, (req, res) => {
  if (!req.body) {
    res.status(400).send({ error: "rate and review data is missing" });
    return;
  }

  const { movieid, email, rate, review } = req.body;

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
  if (!email) {
    res.status(400).send({ error: "email is not present in request" });
    return;
  }

  User.findOne({ _id: req.session.userId })
    .then((user) => {
      if (!user) {
        res.status(400).send({ error: "User not found" });
        return;
      }
      Movie.findOne({ movieid: req.body.movieid }).then((movie) => {
        const moviedata = {
          userid: req.session.userId,
          email: req.body.email,
          rate: req.body.rate,
          review: req.body.review,
        };
        if (movie) {
          //if movie is found in db
          movie.data.push(moviedata);
          movie
            .save()
            .then(() => {
              res.status(204).send();
            })
            .catch(() => {
              res.status(500).send({ error: "Internal Server Error" });
            });
        } else {
          // if movie is not found
          const m = new Movie({
            movieid: req.body.movieid,
          });
          m.data.push(moviedata);
          m.save()
            .then(() => {
              res.status(204).send();
            })
            .catch(() => {
              res.status(500).send({ error: "Internal Server Error" });
            });
        }
      });
    })
    .catch(() => {
      res.status(500).send({ error: "Internal Server Error" });
    });
});

router.get("/:id", (req, res) => {
  if (!req.body) {
    res.status(400).send({ error: "movieid is missing" });
    return;
  }

  Movie.findOne({ movieid: req.params.id }).then((movie) => {
    if (!movie) {
      res.status(400).send({ error: "movie not found" });
      return;
    }
    res.status(200).send(movie);
  });
});

module.exports = router;