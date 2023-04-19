const VALIDATION_ERROR_CODE = 400;
const NOTFOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

module.exports.checkError = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
  } if (err.name === 'CastError') {
    return res.status(NOTFOUND_ERROR_CODE).send({ message: 'Запрашиваемые данные не найдены' });
  }
  return res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
}