const router = require('express').Router({ mergeParams: true });

router.use('/health-check', require('./health-check/health-check'));
router.use('/pdf', require('./pdf/pdf.routes'));

module.exports = router;
