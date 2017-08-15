'use strict'

console.log('transitions loaded')

var TR = {

	coverUp: function(cont, contb, evt, duration){
		var $cont = $(cont)
		var $contb = $(contb)

		// compute viewport
		var wi = ' '+$(window).width()+'px'
		var he = ' '+$(window).height() + 'px'
		var v_offset = '-'+he
		var fr = 'rect(0px,'+wi+','+he+', 0px)'
		console.log('fr: '+fr)

		//clone, wrap and re-attach
		var $firstSl = $cont.children()
		$firstSl = $firstSl.clone()
		$firstSl.find().remove('script')//script no work w/ split

		//var $cloneSl = $firstSl.clone()
		$contb.append($firstSl)
		$firstSl.wrapAll('<div id="firstSl" class="firstSl"/>')

		// point to clone and wrap
		//$contb.append($cloneSl)
		//$cloneSl.wrapAll('<div id="cloneSl" class="cloneSl"/>')
		$cont.empty()
		//$cont.html(evt.$new)

		//css clip computed
		var clip = $('#firstSl')
		clip.css('clip', fr) // clip it
		clip.css('position','absolute')
		clip.css('z-index', 8)
		clip.css('top', '0px')
		clip.css('width', wi)
		clip.css('min-height', he)
		$('#firstSl *').css('min-height', he)
		clip.css('background','gray')

		//clip.transition({y: v_offset, easing: 'easeOutCubic', duration: duration})
		clip.transition({y: '300px', easing: 'easeOutCubic', duration: duration})
		
		//$('#cloneSl').transition({x: half, easing: 'easeOutCubic', duration: speed})
		setTimeout(function(){ 
			//console.log(':cleanup')
			$contb.empty()
		}, duration)


		
		/*console.log('in coverUp')
		var $newCont = $(newCont)
		$oldCont.css('z-index', 8)
		$oldCont.css('position', 'absolute')
		$oldCont.css('top', '0')

		
		$newCont.css('z-index', 9)
		$newCont.css('top', '100vh')
		$newCont.html(evt.$new)
		$newCont.transition({top: 0}, duration, 'easeOutCubic')
		//$oldCont.empty()*/
	}

	, fadeIn: function(cont, evt, duration){
		var $cont = $(cont)
		$cont.css('opacity', '0')
		$cont.html(evt.$new)
		$cont.transition({opacity: 1}, duration, 'easeOutCubic')
	}

	, fadeOut: function(cont, evt, speed, opacity){
		var $cont = $(cont)
		$cont.transition({opacity: opacity||.3}, speed, 'linear')
	}


	, pgSplit: function($cont_, evt, speed) {
		//console.log('spliting:')
		//$('#content-wrapper').fadeTo(1,.2)//hide
		//$('#content-wrapper').fadeTo(speed/2,1)

		// compute endpoints math to split screen
		var half = $(window).width() / 2
		var he  = $(window).height() + 'px, ' //
		var wid = ' ' + half*2 + 'px, ' //
		var lft = '-' + half + 'px '
		half = half + 'px'
		var fr = 'rect(0px, ' + half + ', ' + he + ' 0px)'
		var cr = 'rect(0px, ' + wid  + he + half + ')'

		console.log('fr: '+fr)
		console.log('cr: '+cr)

		//clone, wrap and re-attach
		var $firstSl = $cont_.children()
		$firstSl = $firstSl.clone()
		$firstSl.find().remove('script')//script no work w/ split

		var $cloneSl = $firstSl.clone()
		$('#content-wrapper-b').append($firstSl)
		$firstSl.wrapAll('<div id="firstSl" class="firstSl"/>')

		// point to clone and wrap
		$('#content-wrapper-b').append($cloneSl)
		$cloneSl.wrapAll('<div id="cloneSl" class="cloneSl"/>')
		$cont_.empty()

		// =============================================================
		//css clip computed
		$('#firstSl').css('clip', fr) // clip it
		$('#firstSl').css('position','absolute')
		$('#firstSl').css('z-index',8)
		$('#firstSl').css('top', '50.4px')
		$('#firstSl').css('min-height', he)
		$('#firstSl *').css('min-height', he)
		$('#firstSl').css('background','gray')

		$('#cloneSl').css('clip', cr)
		$('#cloneSl').css('position','absolute')
		$('#cloneSl').css('z-index', 9)
		$('#cloneSl').css('top', '50.4px')
		$('#cloneSl').css('min-height', he)
		$('#cloneSl *').css('min-height', he)
		$('#cloneSl').css('background','gray')
		

		//$('#content-wrapper0').fadeTo(speed*3,.7)
		$('#firstSl').transition({x: lft, easing: 'easeOutCubic', duration: speed})
		$('#cloneSl').transition({x: half, easing: 'easeOutCubic', duration: speed})
		setTimeout(function(){ 
			//console.log(':cleanup')
			$('#content-wrapper-b').empty()
			//$('#content-wrapper0').fadeTo(1,1)//show
		}, speed)

	}

}
