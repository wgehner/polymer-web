const mapi_key = ''
const mdomain = ''
const mailgun = require('mailgun-js')({apiKey: mapi_key, domain: mdomain})

const express = require('express')
const router = express.Router()
// /////////////////////////////////////////////////////

function setNone(res) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
}

function sendContact(data) {
	//name, email, message, phone, subscribe
	const message = {
		to: '"Wolfgang Gehner" <hi@appthings.io>',
		from: '"' + data.name + '" <' + data.email + '>',
		subject: 'Contact request to Polymer Bootcamp'
	}
	var txt = 'Message from ' + data.name + ' ' + data.email + '\n';
	txt += 'Phone: '+data.phone+ '\n';
	txt += data.message+'\n'
	if (data.subscribe != null)
		txt += 'Subscribe: '+data.subscribe;
	console.log('Sending Mail ' + txt)
	message.text = txt

	const pro = mailgun.messages().send(message)
	return pro
}

router.post('/mail', function (req, res) {	
	console.log(JSON.stringify(req.body))
	const data = req.body
	const pro = sendContact(data)
	setNone(res)

	pro.then(function (data) {// wait for it to be sent then come back
			//console.log(data)
			var ret = 'OK'
			res.status(200).send(JSON.stringify(ret))
		}, function (err) {
			console.log(err)
			var ret = 'OK'
			res.status(200).send(JSON.stringify(ret))
	})
})

//###################### 
module.exports = router
