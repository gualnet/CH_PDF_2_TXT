const router = require('express').Router({ mergeParams: true });

router.get('/', (req, res) => res.sendStatus(200));

module.exports = router;
