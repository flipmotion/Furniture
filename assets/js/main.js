(function(){
	
}());


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
	window.onresize = resize;
	window.onload = resize;
	function resize(){
		var windowsize = $(document).width();
		if(windowsize <= 420 ) {
			$('#OrderListFinal .item-category-main').addClass('grid');
		}
		else {
			$('#OrderListFinal .item-category-main').removeClass('grid');
		}
	}
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
	var compareBtn = $('[data-item="toggle-nav"]');
	function compare(e){
		$(this).parents('.compare-side').toggleClass('closed');
		if($('.compare-side').has(e.target).length === 0) {
			console.log(1);
		}
	};
	compareBtn.on('click', compare);
});
$(document).on('click', '.alert-close', function() {
	$(this).parent().slideUp();
});

function btnTrigger() {
	var btn = $('.submit');
	btn.on('click', function(e){
		var btn = $(this).data('target'),
			submit = $('[data-item="'+btn+'"]');
			submit.click();
	});
}
btnTrigger();
function send(){
	var form = $('[data-form="send"]');
	form.ajaxForm(function() {
		$('#call').modal('hide');
		$('#thx').modal('show');
		$(form).resetForm();
	});
}

$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
    
});
$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
         // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) || 
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

var item = document.querySelector('.item-category-preview');
var items = document.querySelectorAll('.item-category-preview');
var holder = document.querySelector('.inner');
var itemWidth = item.clientWidth;
var count = items.length;
var widthHolder = count * itemWidth;
var btnDel = $('[data-item="delete"]');
var itemDel = $('[data-item="item"]');
//width wrap
var widthWrap = function(e) {
	var item = document.querySelector('.item-category-preview');
	var items = document.querySelectorAll('.item-category-preview');
	var holder = document.querySelector('.inner');
	var itemWidth = item.clientWidth;
	var count = items.length;
	var widthHolder = count * itemWidth;
	var btnDel = $('[data-item="delete"]');
	var itemDel = $('[data-item="item"]');
	$('.holder-scroll .inner').css({
		'width': widthHolder + 15
	});
}
function tableHeight() {
	var tr = $('.height-js');
	var getH = $('.item-category-preview > div').height();
	tr.height(getH + 20);
}
$(document).ready(tableHeight);
/*navigation*/

/*navigation end*/
widthWrap();
//width wrap end
var deleteItem = function(e) {
	var btn = $(this);
	dataBtn = btn.data('item');
	if(dataBtn == 'delete') {
		$(this).parents('.item-category-preview').remove();
	}
	e.preventDefault();
}
btnDel.on('click', deleteItem);
btnDel.on('click', widthWrap);
//scroll events horizontal
var holder = document.querySelector('.holder-scroll');
var width = parseInt(holder.clientWidth, 10),
	cldWidth = parseInt(holder.children[0].clientWidth, 10),
	distance = cldWidth - width,
	mean = 40, 
	current = 0; 
	//holder.children[0].style.transform = 'translateX('+current+'px)'; 
	$('.holder-scroll').scrollLeft(current);

	var doScroll = function (e) {
		e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		if ((delta == -1 && current * mean >= -distance) || (delta == 1 && current * mean < 0)) {
			current = current + delta;
		}
		//holder.children[0].style.transform = (current * mean) + 'px';
		//holder.children[0].style.transform = 'translateX('+(current * mean)+'px)';
		var go = current * mean;
		$('.holder-scroll').scrollLeft(-go);
		e.preventDefault();
	};
if (holder.addEventListener) {
	holder.addEventListener("mousewheel", doScroll, false);
	holder.addEventListener("DOMMouseScroll", doScroll, false);
} else {
	holder.attachEvent("onmousewheel", doScroll);
}
//scroll events horizontal

