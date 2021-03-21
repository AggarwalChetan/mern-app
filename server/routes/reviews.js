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
      if (user.movies && user.movies.some((m) => m.movieid === movieid)) {
        res.status(400).send({ erro: "user already rated this movie" });
        return;
      } else {
        const usermovie = {
          movieid: movieid,
          rate: rate,
          review: review,
        };
        // console.log(req.session.userid);
        user.movies.push(usermovie);
        user
          .save()
          .then(() => {
            //Adding movie in movie document
            Movie.findOne({ movieid: movieid }).then((movie) => {
              const moviedata = {
                email: user.email,
                userid: req.session.userId,
                rate: rate,
                review: review,
              };
              if (movie) {
                //if movie is found in db
                movie.data.push(moviedata);
                movie
                  .save()
                  .then(() => {
                    res.status(204).send();
                    return;
                  })
                  .catch(() => {
                    res.status(500).send({ error: "Internal Server Error" });
                    return;
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
                    return;
                  })
                  .catch(() => {
                    res.status(500).send({ error: "Internal Server Error" });
                    return;
                  });
              }
            });
          })
          .catch(() => {
            res.status(500).send({ error: "Internal Server Error" });
            return;
          });
      }
    })
    .catch(() => {
      res.status(500).send({ error: "Internal Server Error" });
      return;
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
      if (user.movies && user.movies.some((m) => m.movieid === movieid)) {
        user.movies.forEach((usermovie) => {
            if (usermovie.movieid === movieid) {
              usermovie.rate = rate;
              usermovie.review = review;
          }
        });
        user.save().then(() => {
            //updateing record in movie document
            Movie.findOne({ movieid: movieid }).then((movie) => {
               // const moviedata = {
            //   email: user.email,
            //   userid: req.session.userId,
            //   rate: rate,
            //   review: review,
            // };
              if (movie) {
                //if movie is found in db
                movie.data.forEach((item) => {
                    if (item.userid === req.session.userId) {
                      item.rate = rate;
                      item.review = review;
                    }
                  });
                  // movie.data.push(moviedata);
                movie
                  .save()
                  .then(() => {
                    res.status(204).send();
                    return;
                  })
                  .catch(() => {
                    res.status(500).send({ error: "Internal Server Error" });
                    return;
                  });
              }
            });
          });
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