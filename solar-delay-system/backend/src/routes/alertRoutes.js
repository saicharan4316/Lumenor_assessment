const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const alertController = require(
  '../controllers/alertController'
);

router.get(
  '/',
  authMiddleware,
  alertController.getAlerts
);

module.exports = router;