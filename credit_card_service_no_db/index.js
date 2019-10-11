const express = require('express')
const morgan = require('morgan')
const config = require('config');
const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))

// health check
app.get('/', (req, res) => {
    res.status(200).send()
})

// Starting server
app.listen(config.port)

module.exports = app; // for testing
