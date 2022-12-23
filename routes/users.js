const usersRouter = require('express').Router();
const { updateMeValidator } = require('../middlewares/routerValidator');

const {
  updateMe,
  getMe,
} = require('../controllers/users');

usersRouter.get('/me', getMe);
usersRouter.patch('/me', updateMeValidator, updateMe);

module.exports = usersRouter;
