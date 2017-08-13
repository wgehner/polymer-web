const fs = require('fs')
const pug = require('pug')
const isj = require('is_js')
const Util = require('topseed-utils')
const U = new Util() 


// ###################### middle filter
const ROOT = './' + ServerConfig.WEBROOT
const SPA = 'index.pug'
const AMP = 'indexA.pug'

var options = {}
options.pretty = true

function pugComp(req,res) {
	var pgPath = U.getPath(ROOT,req)
	
	const ignore = pathContains(pgPath, ServerConfig.PUG_EXCLUDE)
	
	//U.getPath appends a trailing slash, for linux we need to remove it.
	if (isj.endWith(pgPath,'/')) {
		pgPath = pgPath.substring(0, (pgPath.length)-1)
	}

	const requestedResource = U.replace(pgPath, '.html', '.pug')
	res.header('Content-Type', 'text/html')
	U.cacheQuick(res)
	if (!ignore && fs.existsSync(requestedResource)) {
		console.log('requested:'+requestedResource )
		const html = pug.renderFile(requestedResource, options)
		res.status(200).send( html).end()
	} else {
		fs.readFile(pgPath, 'utf8', function(err, data) {
			res.send(data).end()
		})
	}
}

function pathContains(path, arr)
{
	if (!arr) return false
	for (i = 0; i < arr.length; i++) {
		if (path.indexOf(arr[i])> -1) return true
	}
	return false
}

const _slash = '/'
function endsWithSlash(str ) {
	if (isj.endWith(str,_slash)) 
		return str
	return str+_slash
}

function getQueryString(req) {
	let queryString = req.queryString
	console.log('queryString'+queryString)
	return queryString;
}

function getPath(req) {
	let path = req.path
	if (isj.not.existy(path)) path = ''
	path = ROOT + req.baseUrl + path
	//console.log(path)

	path = path.replace('undefined/','')
	path = path.replace('undefined','')
	path = endsWithSlash(path)
	return path
}


function ifError(err, msg, res) {
	if (err)  {
		console.log(msg+': ' + err)
		res.redirect('/index.html')// error - go home
		res.end()
		return true
	} else return false
}

function serveAmp(req) { // should we serve mobile/AMP
	if (req.socket.localPort == ServerConfig.WWW_PORT) return true
	if (req.socket.localPort == ServerConfig.AMP_PORT) return false

	if (req.subdomains.indexOf(ServerConfig.WWW_SUBDOMAIN) > -1)  return ServerConfig.AMP_IS_DEFAULT
	if (req.subdomains.indexOf(ServerConfig.AMP_SUBDOMAIN) > -1)  return true
	if (req.query.w == '1') return false
	if (req.query.a == '1') return true
	return ServerConfig.AMP_IS_DEFAULT
}

//**************** */
exports.decide = function (req, res, next) {
	res.header('X-TimeSent', U.getDt() )
	U.cacheLong(res) // default is long, later we set to quick if needed
	//console.log('Decider ->')
	
	if (req.path.indexOf('.') > 0 ) { // hasDot?

		if (req.path.indexOf('.mf') > 0) {
			U.cacheNone(res);
			res.header('Content-Type', 'text/cache-manifest')
			next()
		}	
		else if (req.path.indexOf('.html') > 0) {
			pugComp(req, res)
		} else	
		next() // it is a static asset, ex: .jpg, .css
	} else { // no dot, it is a path:
		try {

			res.header('Content-Type', 'text/html')

			const pgPath = getPath(req)
			//const qs = getQueryString(req);
			const returnAmp = serveAmp(req)
			//console.log('requested:'+pgPath + qs+' ^ serve amp:' + returnAmp)
			const requestedResource = pgPath + (returnAmp?AMP:SPA);
			const fallbackResource = pgPath + (returnAmp?SPA:AMP);
			
			//attempt to get the requested version, show the other version if not exists
			if (fs.existsSync(requestedResource)) { 
				//console.log('found '+requestedResource)
				U.cacheQuick(res)

				const html = pug.renderFile(requestedResource, options)
				res.status(200).send( html).end()
			
				/*fs.readFile(requestedResource, 'utf8', function(err, data) {
					ifError(err, returnAmp?'amp':'spa', res)
					res.send(data)
				})// readfile */
			} else { //the other version
				
				const html = pug.renderFile(fallbackResource, options)
				res.status(200).send( html).end()
				/*fs.readFile(fallbackResource, 'utf8', function(err, data) {
					ifError(err, returnAmp?'spa':'amp', res)
					res.send(data)
				})*/
			}
			 
		} catch(err) {
			ifError(err, 'catch', res)
		}
		//console.log('<-')
	} // else it is a path

}//()