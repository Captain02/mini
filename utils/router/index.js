const router = require('../mp-router/index.js');
const routes = require('./routes.js');

router.init({
    routes,
});

module.exports = router;
