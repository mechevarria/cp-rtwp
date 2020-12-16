const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const xsenv = require('@sap/xsenv');
const hdbext = require('@sap/hdbext');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

// add HANA client to all incoming requests. json file is only read when not running on XS Advanced Server
const services = xsenv.getServices({ hana: { tag: 'hana' } }, '/tmp/default-services.json');
app.use('/', hdbext.middleware(services.hana));

// configure keycloak if enabled
const keycloakAuth = require('./middlewares/keycloak-auth')(app);

app.use(keycloakAuth);

const router = express.Router();
const statusCtrl = require('./controllers/status');
const mapCtrl = require('./controllers/map');
const countCtrl = require('./controllers/map-count');
const visitorAllCtrl = require('./controllers/visitor-all');
const visitorCtrl = require('./controllers/visitor');

router.route('/status').get(statusCtrl);
router.route('/map').get(mapCtrl);
router.route('/count').get(countCtrl);
router.route('/visitors').get(visitorAllCtrl);
router.route('/visitor').get(visitorCtrl);

app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info(`http server started on port ${port}`);
});
