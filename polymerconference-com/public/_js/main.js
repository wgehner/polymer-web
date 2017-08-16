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
			//, TS.load('/_js/vendor/anime.min.js')
			, TS.load('/_js/topseed-transitions-1.0.js') //page transitions
			//, TS.load('/_polymerComp/Brand.html')
			, TS.load('/_polymerComp/Bootcamp.html')
			, TS.load('/_polymerComp/Appthings.html')
			, TS.load('https://rawgit.com/topseed/topseed-turbo/master/release/topseed-turbo-4.2.js')
		])
		.then(TM.libsLoaded)
	}

	, libsLoaded: function(){
		
		TS.signalAppReady()

		TT.ScontentID = '#content-wrapper'
		TT.handle(function(evt) {
			if (TT.PRE == evt.typ) {

				console.log('TT.handle pre')

				/*if (evt.fromHref != evt.toHref) //no transition on refresh
				{	
					if (evt.toHref.indexOf('/home/')>-1)
						//$('#content-wrapper').fadeTo(100, .2) //speed, opacity, easing:swing
						$('#content-wrapper').transition({opacity: .3}, 50, 'linear')
					else
						pgSplit($('#content-wrapper'), 1350)
				}*/

				//example transitions out:
				//TR.fadeOut('#content-wrapper', evt, 50, 0) //works
			}
			if (TT.PAGE === evt.typ) {

				console.log('TT.handle page')

				$('#appbar').removeClass('appbar-hide') //reset appbar visibility
				$('#appbar').addClass('appbar-show')
				
				//example transitions in:
				//TR.show('#content-wrapper', evt) //no transition, same as $('#content-wrapper').html(evt.$new)
				//TR.fadeIn('#content-wrapper', evt, 150) //works
				//TR.uncoverDown('#content-wrapper', '#content-wrapper-b', evt, 350)
				//TR.uncoverUp('#content-wrapper', '#content-wrapper-b', evt, 350)
				//TR.uncoverRight('#content-wrapper', '#content-wrapper-b', evt, 350)
				//TR.uncoverLeft('#content-wrapper', '#content-wrapper-b', evt, 350)
				TR.splitVerticalOut('#content-wrapper', '#content-wrapper-b', evt, 3500)
				//$('html, body').scrollTop(0)
			}
		})
	}

} //class

TM.loadLibs()
