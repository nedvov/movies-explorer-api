const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');
const { moviesErrors } = require('../consts/errorTexts');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else next(err);
    });
};

module.exports.removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findById(movieId)
    .orFail(new NotFoundError(moviesErrors.movieNotFound))
    .then((movie) => {
      if (movie.owner.toString() === userId) {
        Movie.findByIdAndRemove(movieId)
          .orFail(
            new NotFoundError(
              moviesErrors.movieNotFound,
            ),
          )
          .then((dmovie) => res.send(dmovie))
          .catch((err) => {
            if (err.name === 'CastError') {
              next(
                new ValidationError(
                  moviesErrors.movieWrongId,
                ),
              );
            } else next(err);
          });
      } else throw new ForbiddenError(moviesErrors.movieForeign);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new ValidationError(
            moviesErrors.movieWrongId,
          ),
        );
      } else next(err);
    });
};
