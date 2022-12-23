require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const UniqueError = require('../errors/UniqueError');
const { userErrors } = require('../consts/errorTexts');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new UniqueError(
            userErrors.userAlreadyRegister,
          ),
        );
      } else if (err.name === 'ValidationError') { next(new ValidationError(err.message)); } else next(err);
    });
};

module.exports.updateMe = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail(
      new NotFoundError(userErrors.userNotFound),
    )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { next(new ValidationError(err.message)); } else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(
      new NotFoundError(userErrors.userNotFound),
    )
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
