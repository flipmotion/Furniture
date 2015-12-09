$(document).ready(function() {
	/*scroll spy */
	$("body").scrollspy({target: "#menu", offset:80});
	/*scroll spy END*/
	/*smooth links */
	$('a.smooth').click(function(){
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top - 80
		}, 1000);
		return false;
	});
	/*smooth links END*/
	/*animation when scrolling*/
	// $('.anim-el').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
	// 	if (isInView) {
	// 		// element is now visible in the viewport
	// 	$(this).addClass('in-view');
	// 	$('.content.block-1 .holder-img').addClass('anim');
	// 	} else {
	// 		$(this).removeClass('in-view');
	// 		$('.content.block-1 .holder-img').removeClass('anim');
	// 	}
	// });
	/*animation when scrolling*/

	var owlMain = $('[data-item="slider-item"]');
	owlMain.owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		dots:true,
		items:1,
		autoplayHoverPause: true,
		autoplayTimeout: 5000,
		autoplay:true,
		navText: [
		  "<i class='my-arrow-left'></i>",
		  "<i class='my-arrow-right'></i>"
		],
		dots: true,
	});
	var form = $('[data-form="send"]');
	
	$(form).validator().on('submit', function (e) {
		if ($(this).hasClass('disabled')) {
			// handle the invalid form...
			e.preventDefault();
		} else {
			// everything looks good!
			send();
		}
	});

	
});
function send(){
	var form = $('[data-form="send"]');
	form.ajaxForm(function() {
		$('#call').modal('hide');
		$('#thx').modal('show');
		$(form).resetForm();
	});
}

