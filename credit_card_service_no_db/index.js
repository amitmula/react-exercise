const express = require('express')
const morgan = require('morgan')
const config = require('config')
const app = express()

app.disable('x-powered-by')
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.use(require('./routes/index.routes'))

// health check
app.get('/', (req, res) => {
    res.status(200).send()
})

// Starting server
app.listen(config.port)

module.exports = app // for testing
