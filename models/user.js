const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new AuthError('Ошибка. Пользователь с такими данными не найден');
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new AuthError('Ошибка. Пользователь с такими данными не найден');
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
