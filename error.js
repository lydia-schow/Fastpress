exports.handle = (error, request, response, next) => {
  console.error(error);
  let status = error.status || 500;
  let message = error.message || 'Something failed :(';
  if (status === 404) {
    message = 'Not found';
  } else if (status === 403) {
    message = 'Access denied';
  }
  response.status(status).render('error', {error: message });
};
