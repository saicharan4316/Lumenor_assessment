const pool = require('../config/db');
const calculateRisk = require('../services/riskService');

exports.createMilestone = async (req, res) => {
  try {
    const {
      project_id,
      title,
      deadline,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO milestones
      (project_id, title, deadline)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [project_id, title, deadline]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getProjectMilestones = async (req, res) => {
  try {
    const { projectId } = req.params;

    const result = await pool.query(
      `SELECT * FROM milestones
       WHERE project_id = $1
       ORDER BY created_at DESC`,
      [projectId]
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateMilestone = async (req, res) => {
  try {

    const { id } = req.params;

    const { status } = req.body;

    const result = await pool.query(
      `
      UPDATE milestones
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    res.json(result.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};
exports.getMilestonesByProject =
  async (req, res) => {

    try {

      const { projectId } =
        req.params;

      const result =
        await pool.query(
          `
          SELECT *
          FROM milestones
          WHERE project_id = $1
          ORDER BY id ASC
          `,
          [projectId]
        );

      res.json(result.rows);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message,
      });
    }
};