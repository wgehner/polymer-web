'use strict'

class ServerConfig {
	get WEBROOT() {return 'public'}
	get WWW_PORT() {return 8070}
	get AMP_PORT() {return 8071}
	get WWW_SUBDOMAIN() {return 'www'}
	get AMP_SUBDOMAIN() {return 'm'} 
	get AMP_IS_DEFAULT() {return false}
	get PUG_EXCLUDE() {return ['/bower_components']}
	
} module.exports = ServerConfig