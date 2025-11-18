class badRequestError extends Error {
  constructor(message = 'Solicitud inválida') {
    super(message);
    this.status = 400;
  }
}

module.exports = badRequestError;
