function errorHandler(error, req, res, next) {
  console.log(res);
  if (res?.headersSent) {
    return next(error);
  }
  //retourner le code d'erreur de l'erreur sinon 500 ( server)
  res.status(error.Code || 500);
  //retourner le message d'erreur dans le corp de la reponse, sinon un message par defaut
  res.json({ message: error.message || "Une erreur inconnue est survenue !" });
}
export default errorHandler;
