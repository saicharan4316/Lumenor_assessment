const pool = require('../config/db');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const jwt =require('jsonwebtoken');
exports.register = async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("HASHED PASSWORD:", hashedPassword);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, hashedPassword, role]
    );

    console.log("DB RESULT:", result.rows[0]);

    res.status(201).json({
      user: result.rows[0],
      token: generateToken(result.rows[0]),
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      error: error.message,
      fullError: error
    });
  }
};
exports.login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const result =
      await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
      );

    if (
      result.rows.length === 0
    ) {

      return res
        .status(401)
        .json({
          error:
            "Invalid credentials",
        });
    }

    const user =
      result.rows[0];

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {

      return res
        .status(401)
        .json({
          error:
            "Invalid credentials",
        });
    }

    const token =
      jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

   res.json({
  token,
  role: user.role,
  user: {
    id: user.id,
    email: user.email,
  },
});

  } catch (error) {

    console.log(error);

    res.status(500)
      .json({
        error:
          error.message,
      });
  }
};