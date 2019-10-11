const express = require('express')
const router = express.Router()

router.use('/card', require('./card.routes'))

module.exports = router