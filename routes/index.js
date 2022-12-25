const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const { loginValidator, createUserValidator } = require('../middlewares/routerValidator');
const { commonErrors } = require('../consts/errorTexts');

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('/', () => {
  throw new NotFoundError(commonErrors.pathError);
});

module.exports = router;
