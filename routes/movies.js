const moviesRouter = require('express').Router();
const { removeMovieValidator, createMovieValidator } = require('../middlewares/routerValidator');

const {
  getMovies,
  removeMovie,
  createMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.delete('/:movieId', removeMovieValidator, removeMovie);
moviesRouter.post('/', createMovieValidator, createMovie);

module.exports = moviesRouter;
