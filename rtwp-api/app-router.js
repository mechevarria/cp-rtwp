const express = require('express');
const map = require('./controllers/map');
const mapCount = require('./controllers/map-count');
const visitorAll = require('./controllers/visitor-all');
const visitor = require('./controllers/visitor');
const stats = require('./controllers/stats-visit');
const visitorMap = require('./controllers/visitor-map');
const visitorLength = require('./controllers/visitor-length');
const dateDiff = require('./controllers/date-diff');
const dateLast = require('./controllers/date-last');
const dateStart = require('./controllers/date-start');
const status = require('./controllers/status');

const router = express.Router();

router.route('/map').get(map);
router.route('/map/count').get(mapCount);
router.route('/visitors').get(visitorAll);
router.route('/visitor').get(visitor);
router.route('/stats').get(stats);
router.route('/visitor/map').get(visitorMap);
router.route('/visitor/length').get(visitorLength);
router.route('/date/diff').get(dateDiff);
router.route('/date/last').get(dateLast);
router.route('/date/start').get(dateStart);
router.route('/status').get(status);

module.exports = router;
