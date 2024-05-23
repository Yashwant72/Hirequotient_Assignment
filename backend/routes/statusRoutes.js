// backend/routes/statusRoutes.js

const express = require('express');
const { setStatus, getStatus } = require('../controllers/statusController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/', protect, setStatus);
router.get('/:userId', protect, getStatus);

module.exports = router;
