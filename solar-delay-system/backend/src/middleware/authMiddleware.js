const jwt = require('jsonwebtoken');

module.exports = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;
console.log(process.env.JWT_SECRET)
    console.log(
      'AUTH HEADER:',
      authHeader
    );

    if (!authHeader) {
      return res.status(401).json({
        message: 'No token',
      });
    }

    const token =
      authHeader.split(' ')[1];

    console.log('TOKEN:', token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    console.log(
      'DECODED:',
      decoded
    );

    req.user = decoded;

    next();

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: 'Unauthorized',
      error: error.message,
    });
  }
};