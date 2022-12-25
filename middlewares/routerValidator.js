const { celebrate, Joi } = require('celebrate');
const { linkPattern, emailPattern } = require('../consts/patterns');

const removeMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string(),
  }),
});

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    movieId: Joi.number().required(),
    trailerLink: Joi.string().required().pattern(linkPattern),
    thumbnail: Joi.string().required().pattern(linkPattern),
    image: Joi.string().required().pattern(linkPattern),
    duration: Joi.number().required(),
  }),
});

const updateMeValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailPattern),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailPattern),
    password: Joi.string().required(),
  }),
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailPattern),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  removeMovieValidator,
  createMovieValidator,
  updateMeValidator,
  loginValidator,
  createUserValidator,
};
