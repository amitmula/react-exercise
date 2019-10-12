const express = require('express')
const morgan = require('morgan')
const config = require('config')
const app = express()

app.disable('x-powered-by')
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Starting server
let server = app.listen(config.port)

const io = require('socket.io')(server);
const CARD_ADDED = {
	channel: 'card added'
};

const NOTIFICATION_TYPE = {
    cardAdded: CARD_ADDED
};

io.on('connect', function (clientConnection) {
    clientConnection.on('join channel', function (channelName) {
        clientConnection.join(NOTIFICATION_TYPE[channelName].channel)
        console.log('client', clientConnection.id, 'joined socket channel -> ', NOTIFICATION_TYPE[channelName].channel)
    });
});
  
io.on('disconnect', function () {
    console.log('connection disconnected.');
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    req.io = io
    next()
});

app.use(require('./routes/index.routes'))

// health check
app.get('/', (req, res) => {
    res.status(200).send()
})

module.exports = server
