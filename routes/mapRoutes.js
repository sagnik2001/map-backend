const express = require('express');
const MapController = require('../controllers/MapController');
const authenticateToken = require('../middleware');
const router = express.Router();

router.post('/mapData/create', authenticateToken, MapController.saveMapData);
router.get('/mapData/get', authenticateToken, MapController.getMapData);
router.get('/mapData/getTopRegions', authenticateToken, MapController.getTopFrequentReg)

module.exports = router;
