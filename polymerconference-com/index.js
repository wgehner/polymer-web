'use strict'
const C = (require('./config/ServerConfig'))
global.ServerConfig = new C()

const express = require('express')
const server = express()
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')

const ContactUs = require('./server/route/ContactUs')
const Decider = require('./server/util/Decider')

server.use(bodyParser.json())
server.use(cors())
server.use(compression())

// ###################### dynamic data for some pgs here:
server.use('/contactus', ContactUs)

server.use(Decider.decide)
server.use(express.static(ServerConfig.WEBROOT))

//###################### start the server
server.listen(ServerConfig.WWW_PORT, '0.0.0.0', function() {
	console.log('App listening at http://localhost:'+ServerConfig.WWW_PORT)
	console.log('Press Ctrl+C to quit.')
})
