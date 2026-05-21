const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET || "supersecretkey",
    {
      expiresIn: '7d',
    }
  );
};
console.log( process.env.JWT_SECRET)

module.exports = generateToken;