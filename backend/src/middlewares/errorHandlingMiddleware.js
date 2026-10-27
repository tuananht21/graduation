
const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;

  const responseError = {
    success: false,
    statusCode: err.statusCode,
    message: err.message || 'Có lỗi xảy ra trong máy chủ',
    // Chỉ kèm stack khi đang dev ở localhost, khi chạy production sẽ tự động ẩn đi
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  };

  res.status(err.statusCode).json(responseError);
};

export default errorHandlingMiddleware;
//