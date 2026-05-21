const pool =
  require("../config/db");


// ======================
// CREATE PROJECT
// ======================

exports.createProject =
  async (req, res) => {

    try {

      console.log(req.body);

      if (
        req.user.role ===
        "installer"
      ) {

        return res
          .status(403)
          .json({
            error:
              "Installers cannot create projects",
          });
      }

      const {
        customer_name,
        location,
        start_date,
        expected_end_date,
        manager_id,
        installer_id,
      } = req.body;

      const result =
        await pool.query(
          `
          INSERT INTO projects
          (
            customer_name,
            location,
            start_date,
            expected_end_date,
            status,
            risk_score,
            manager_id,
            installer_id
          )

          VALUES
          (
            $1,
            $2,
            $3,
            $4,
            'pending',
            0,
            $5,
            $6
          )

          RETURNING *
          `,
          [
            customer_name,
            location,
            start_date,
            expected_end_date,
            manager_id,
            installer_id,
          ]
        );

      res.status(201)
        .json(
          result.rows[0]
        );

    } catch (error) {

      console.log(error);

      res.status(500)
        .json({
          error:
            error.message,
        });
    }
};

// ======================
// GET PROJECTS
// ======================

exports.getProjects =
  async (req, res) => {

    try {

      let result;

      // INSTALLER:
      // ONLY ASSIGNED PROJECTS

      if (
        req.user.role ===
        "installer"
      ) {

        result =
          await pool.query(
            `
            SELECT *
            FROM projects
            WHERE installer_id = $1
            `,
            [req.user.id]
          );

      }

      // MANAGER:
      // ONLY MANAGED PROJECTS

      else if (
        req.user.role ===
        "manager"
      ) {

        result =
          await pool.query(
            `
            SELECT *
            FROM projects
            WHERE manager_id = $1
            `,
            [req.user.id]
          );

      }

      // ADMIN:
      // ALL PROJECTS

      else {

        result =
          await pool.query(
            `
            SELECT *
            FROM projects
            `
          );
      }

      res.json(
        result.rows
      );

    } catch (err) {

      console.log(err);

      res.status(500)
        .json({
          error:
            err.message,
        });
    }
};


// ======================
// GET PROJECT BY ID
// ======================

exports.getProjectById =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const result =
        await pool.query(
          `
          SELECT *
          FROM projects
          WHERE id = $1
          `,
          [id]
        );

      if (
        result.rows.length === 0
      ) {

        return res
          .status(404)
          .json({
            message:
              "Project not found",
          });
      }

      res.json(
        result.rows[0]
      );

    } catch (error) {

      console.log(error);

      res.status(500)
        .json({
          error:
            error.message,
        });
    }
};