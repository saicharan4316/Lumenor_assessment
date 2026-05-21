const express = require('express');

const router = express.Router();

const {
  getProjects,
  getProjectById,
  createProject,
} = require('../controllers/projectController');

const authMiddleware =
  require('../middleware/authMiddleware');

router.get(
  '/',
  authMiddleware,
  getProjects
);

router.get(
  '/:id',
  authMiddleware,
  getProjectById
);

router.post(
  '/',
  authMiddleware,
  createProject
);

module.exports = router;