const pool = require('../config/db');

exports.getAlerts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM alerts
       ORDER BY created_at DESC`
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};