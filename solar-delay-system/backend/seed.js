const pool = require('./src/config/db');

const seed = async () => {
  try {
    await pool.query(`
      INSERT INTO users
      (name, email, password, role)
      VALUES
      (
        'Admin',
        'admin@test.com',
        '$2b$10$9bQK7fQ0B7Jj9n1L2m7G6e6wL4xVnN8Qf0yYz8fM4vW0KzYwXb7d2',
        'admin'
      ),
      (
        'Manager',
        'manager@test.com',
        '$2b$10$9bQK7fQ0B7Jj9n1L2m7G6e6wL4xVnN8Qf0yYz8fM4vW0KzYwXb7d2',
        'manager'
      ),
      (
        'Installer',
        'installer@test.com',
        '$2b$10$9bQK7fQ0B7Jj9n1L2m7G6e6wL4xVnN8Qf0yYz8fM4vW0KzYwXb7d2',
        'installer'
      );
    `);

    await pool.query(`
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
        'Ravi Kumar',
        'Hyderabad',
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '10 days',
        'in-progress',
        40,
        2,
        3
      );
    `);

    await pool.query(`
      INSERT INTO milestones
      (
        project_id,
        title,
        status,
        deadline
      )
      VALUES
      (
        1,
        'Site Inspection',
        'completed',
        CURRENT_DATE
      ),
      (
        1,
        'Panel Installation',
        'pending',
        CURRENT_DATE + INTERVAL '5 days'
      );
    `);

    console.log('Seeded Successfully');

    process.exit();

  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seed();