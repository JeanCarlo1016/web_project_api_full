class authError extends Error {
  constructor(message = 'No autorizado') {
    super(message);
    this.status = 401;
  }
}

module.exports = authError;
