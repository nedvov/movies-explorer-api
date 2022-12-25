const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'https://localhost:3000',
  'localhost:3000',
  'http://nedvov.movies.nomoredomains.club',
  'https://nedvov.movies.nomoredomains.club',
];

module.exports = {
  allowedMethods,
  allowedCors,
};
