var TM = {

	loadLibs: function(){
		console.log('loadLibs called')

		//most of these could be in cache.mf
		return Promise.all([
			TS.load('https://cdn.jsdelivr.net/jquery.fullpage/2.8.9/jquery.fullpage.min.js')
			, TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/jquery.jsForm.min.js')
			, TS.load('https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/showup.js')
			, TS.load('https://cdn.jsdelivr.net/gsap/1.19.0/TweenMax.min.js')
			, TS.load('https://cdn.jsdelivr.net/gsap/1.19.0/jquery.gsap.min.js')
			, TS.load('https://rawgit.com/topseed/topseed-turbo/master/release/topseed-turbo-latest.js')
		])
		.then(TM.libsLoaded)
	}

	, libsLoaded: function(){
		
		TS.signalAppReady()

		TT.ScontentID = '#content-wrapper'
		TT.handle(function(evt) {
			if(TT.PRE == evt.typ)  {
				//$('#content-wrapper').fadeTo(100,.2)
			}
			if(TT.PAGE == evt.typ)  {
				$(TT.ScontentID).html(evt.$new)
			$('#appbar').removeClass('appbar-hide')
			$('#appbar').addClass('appbar-show')			}
		})
	}

} //class

TM.loadLibs()
