const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { emailPattern } = require('../consts/patterns');

const {
  updateMe,
  getMe,
} = require('../controllers/users');

usersRouter.get('/me', getMe);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().pattern(emailPattern),
    }),
  }),
  updateMe,
);

module.exports = usersRouter;
