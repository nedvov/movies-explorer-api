const { celebrate, Joi } = require('celebrate');
const { relativeLinkPattern, linkPattern, emailPattern } = require('../consts/patterns');

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
    id: Joi.number().required(),
    trailerLink: Joi.string().required().pattern(linkPattern),
    image: Joi.object().keys({
      url: Joi.string().required().pattern(relativeLinkPattern),
      formats: Joi.object().keys({
        thumbnail: Joi.object().keys({
          url: Joi.string().required().pattern(relativeLinkPattern),
        }).unknown(true),
      }).unknown(true),
    }).unknown(true),
    duration: Joi.number().required(),
  }).unknown(true),
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
