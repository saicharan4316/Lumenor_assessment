const express = require('express');

const router = express.Router();

const authMiddleware =
  require('../middleware/authMiddleware');

const {
  getMilestonesByProject,
  updateMilestone,
} = require('../controllers/milestoneController');

router.get(
  '/project/:projectId',
  authMiddleware,
  getMilestonesByProject
);

router.put(
  '/:id',
  authMiddleware,
  updateMilestone
);

module.exports = router;