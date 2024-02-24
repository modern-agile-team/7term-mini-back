export default {
  errorHandler: (err, req, res, next) => {
    console.log(err);
    // return res.status(err.statusCode).json(err);
  },
};
