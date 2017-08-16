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
			, TS.load('//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js')
			, TS.load('/_js/topseed-transitions-1.0.min.js') //page transitions
			, TS.load('https://rawgit.com/topseed/topseed-turbo/master/release/topseed-turbo-4.2.js')
		])
		.then(TM.libsLoaded)
	}

	, libsLoaded: function(){
		
		TS.signalAppReady()

		TT.ScontentID = '#content-wrapper'
		TT.handle(function(evt) {
			if (TT.PRE == evt.typ) {
				//example transitions out:
				//TR.fadeOut('#content-wrapper', evt, 50, 0)
			}
			if (TT.PAGE === evt.typ) {
				$('#appbar').removeClass('appbar-hide') //reset appbar visibility
				$('#appbar').addClass('appbar-show')
				
				//example transitions in:
				//TR.show('#content-wrapper', evt) //no transition, same as $('#content-wrapper').html(evt.$new)
				//TR.fadeIn('#content-wrapper', evt, 150) //works
				if (evt.toHref.indexOf('speakers')>-1)
					TR.uncoverDown('#content-wrapper', '#content-wrapper-b', evt, 350)
				//TR.uncoverUp('#content-wrapper', '#content-wrapper-b', evt, 350)
				//TR.uncoverRight('#content-wrapper', '#content-wrapper-b', evt, 350)
				//TR.uncoverLeft('#content-wrapper', '#content-wrapper-b', evt, 350)
				else
					TR.splitVerticalOut('#content-wrapper', '#content-wrapper-b', evt, 350)
				//$('html, body').scrollTop(0)
			}
		})
	}

} //class

TM.loadLibs()
