const userErrors = {
  userAlreadyRegister: 'Ошибка. Пользователь с таким email уже найден',
  userNotFound: 'Ошибка. Запрашиваемый пользователь не найден',
};
const moviesErrors = {
  movieWrongId: 'Передан некорректный идентификатор фильма',
  movieNotFound: 'Ошибка. Запрашиваемый фильм не найден',
  movieForeign: 'Нельзя удалять чужие фильмы',
};

const commonErorrs = {
  pathError: 'Указанный путь не найден',
};

module.exports = {
  userErrors,
  moviesErrors,
  commonErorrs,
};
