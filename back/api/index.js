const router = require('express').Router({ mergeParams: true });

router.use('/health-check', require('./health-check/health-check'));

module.exports = router;
