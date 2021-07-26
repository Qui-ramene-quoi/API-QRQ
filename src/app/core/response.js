const Response = (codeError, title, message) => ({
  code: codeError,
  title,
  message,
});

module.exports = Response;
