class notFoundError extends Error {
  constructor(message = 'Recurso no encontrado') {
    super(message);
    this.status = 404;
  }
}

module.exports = notFoundError;
