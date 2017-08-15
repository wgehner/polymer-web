var TM = {

	loadLibs: function(){
		console.log('loadLibs called')

		return Promise.all([
			TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/showup.js')
			, TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/webComps/tw0-1.0.js').then(function(){TW.init()}) //Standard Polyfills and Helper
			, TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/webComps/tp1-1.0.js') //Late-loader Helper for Polymer components
			, TS.load('/bower_components/webcomponentsjs/HTMLImports.min.js') //Polyfill used in late-loader
			, TS.load('/bower_components/polymer/polymer.html') //Support for Polymer (1.9.3)
			, TS.load('/_js/BLX.js') //Support for Message Bus
			, TS.load('/_js/BDS.js') //Support for Business Data Services (fetch etc)
			, TS.load('/_polymerComp/Brand.html')
			, TS.load('/_polymerComp/Bootcamp.html')
			, TS.load('/_polymerComp/Appthings.html')
			, TS.load('https://rawgit.com/topseed/topseed-turbo/master/release/topseed-turbo-4.1.js')
		])
		.then(TM.libsLoaded)
	}

	, libsLoaded: function(){
		
		TS.signalAppReady()

		TT.ScontentID = '#content-wrapper' //--fixed'
		TT.handle(function(evt) {
			if(TT.PRE == evt.typ)  {
				$('#content-wrapper').fadeTo(100,.2)
			}
			if(TT.PAGE == evt.typ)  {
				$(TT.ScontentID).html(evt.$new)
				$('#appbar').removeClass('appbar-hide')
				$('#appbar').addClass('appbar-show')
				//$('#content-wrapper').fadeTo(0,.5)
				//$('#content-wrapper').css('opacity', '0')
				//$('#content-wrapper--fixed').css('opacity', '1')
				$('#content-wrapper').fadeTo(100,1)
			}
		})
	}

} //class

TM.loadLibs()
