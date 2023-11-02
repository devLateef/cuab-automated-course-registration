const express = require('express');
const router = express.Router();
const { getAuthPage, authUser } = require('../controllers/authentication');


router.get('/', getAuthPage);
router.post('/', authUser);


module.exports = router;
