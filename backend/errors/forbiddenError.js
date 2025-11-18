class ForbiddenError extends Error {
  constructor(message = 'Acceso denegado') {
    super(message);
    this.status = 403;
  }
}

module.exports = ForbiddenError;
