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
			, TS.load('/_js/topseed-transitions-1.1.js') //page transitions
			//, TS.load('https://rawgit.com/topseed/topseed-turbo/master/release/topseed-turbo-4.2.js')
			, TS.load('/_js/topseed-turbo-4.3.js')
		])
		.then(TM.libsLoaded)
	}

	, libsLoaded: function(){
		
		TS.signalAppReady()

		TT.ScontentID = '#content-wrapper'
		TT.handle(function(evt) {
			if (TT.PRE == evt.typ) {
				//example transitions out:
				if (evt.fromHref.indexOf('/speakers/')==-1 && !evt.back) {	
					//TR.fadeOut('#content-wrapper', evt, 50, 0)
					TR.boxOut('#content-wrapper', evt, 300, .87, 50.4, '#616161')
				}
			}
			if (TT.PAGE === evt.typ) {
				$('#appbar').removeClass('appbar-hide') //reset appbar visibility
				$('#appbar').addClass('appbar-show')

				console.log('pageEvt back:'+evt.back)
				console.log('pageEvt toHref:'+evt.toHref)

				//example transitions in:
				//TR.show('#content-wrapper', evt) //no transition, same as $('#content-wrapper').html(evt.$new)
				//TR.fadeIn('#content-wrapper', evt, 150) 

				if (evt.back) { //TODO: this could be a forward
					TR.uncoverDown('#content-wrapper', evt, 350)
					//TR.uncoverUp('#content-wrapper', evt, 350)
					//TR.uncoverRight('#content-wrapper', evt, 350)
					//TR.uncoverLeft('#content-wrapper', evt, 350)
				}
				else {
					if (evt.fromHref.indexOf('speakers')>-1) { //coming from '/speakers'
						TR.splitVerticalOut('#content-wrapper', evt, 350)
					}
					else { //default
						TR.coverUp('#content-wrapper', evt, 350)
						//TR.coverUp('#content-wrapper', evt, 350)
						//TR.coverRight('#content-wrapper', evt, 350)
						//TR.coverLeft('#content-wrapper', evt, 350)
					}
				}
				//$('html, body').scrollTop(0)
			}
		})
	}

} //class

TM.loadLibs()
