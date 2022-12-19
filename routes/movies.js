const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkPattern } = require('../consts/patterns');

const {
  getMovies,
  removeMovie,
  createMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);

moviesRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().required().hex()
      .length(24),
  }),
}), removeMovie);

moviesRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      country: Joi.string().required(),
      director: Joi.string().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      movieId: Joi.string().required(),
      trailerLink: Joi.string().required().pattern(linkPattern),
      thumbnail: Joi.string().required().pattern(linkPattern),
      image: Joi.string().required().pattern(linkPattern),
      duration: Joi.number().required(),
    }),
  }),
  createMovie,
);

module.exports = moviesRouter;
