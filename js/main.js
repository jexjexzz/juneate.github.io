var map;
var toronto = new google.maps.LatLng(43.68, -79.4);

var MY_MAPTYPE_ID = 'custom_style';

var initialize = function()
{
	var featureOpts = [
		{
			stylers: [
			{ hue: '#63564C' },
			{ visibility: 'simplified' },
			{ gamma: 0.5 },
			{ weight: 0.5 }
			]
		},
		{
			elementType: 'labels',
			stylers: [
			{ visibility: 'off' }
			]
		},
		{
			featureType: 'water',
			stylers: [
			{ color: '#535B60' }
			]
		}
	];

	var mapOptions = {
		zoom: 12,
		scrollwheel: false,
		draggable: false,
		center: toronto,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
		},
		mapTypeId: MY_MAPTYPE_ID
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

	// var marker = new google.maps.Marker({
	// 	position: toronto,
	// 	map: map,
	// 	title:"Toronto, Ontario"
	// });

	var styledMapOptions = {
		name: 'Custom Style'
	};

	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
};
google.maps.event.addDomListener(window, 'load', initialize);



var allPanels;
var $window = $(window);

$(document).ready(function()
{
	scrollPage();
	setAllOffsets();

	$('.inner').each(function() {
		var $theInner = $(this);

		if (!$theInner.onScreen()) {
		 	$theInner.css ('opacity', 0);
		}
	})
	.bind('inview', function(event, visible){
		var opac = (visible) ? 1 : 0;
		$(this).stop().animate({ opacity:opac },400);
	});


	$('<button/>')
		.addClass('down')
		.insertAfter('main')
		.click(movedown)
		.hover(
			function() {$(this).stop(true,true).animate({'opacity':'0.8'});},
			function() {$(this).stop(true,true).animate({'opacity':'0.3'});})
		.animate({'opacity':0.8},150)
		.animate({'opacity':0.3},200)
		.animate({'opacity':0.8},200)
		.animate({'opacity':0.3},200)
		.animate({'opacity':0.8},200)
		.animate({'opacity':0.3},200);

	$window.resize(setAllOffsets);
	$window.scroll(scrollPage);
});

var movedown = function()
{
	var currScrl = $(document).scrollTop();

	for (var i = 0; i < allPanels.length; i++) {
		if (allPanels[i] > currScrl) {
			$('body, html').animate({scrollTop:allPanels[i]+"px"},500);
			return;
		}
	}
};

var setAllOffsets = function()
{
	console.log("here");
	allPanels = new Array();
	$('main').children().each(function(){
		allPanels.push(Math.ceil($(this).offset().top));
	});
	if ($window.outerWidth() <= 640) {
		$('h1').css({top:0});
	}
};

var scrollPage = function()
{
	if ($window.outerWidth() > 640) {
		var scrollH1to = $window.scrollTop()*(2/3) * -1;
		console.log((1-$window.scrollTop()/($window.height()/2)))
		$('h1').css({top:scrollH1to+"px", opacity:(1-$window.scrollTop()/($window.height()/(2/3)))});
	}
	
	if ($window.scrollTop() == $(document).height() - $window.height())
		$('.down').stop(true,true).animate({'opacity':0}).fadeOut();
	else
		$('.down').stop(true,true).animate({'opacity':0.3}).fadeIn('fast');
};

$.fn.onScreen = function()
{
	var $elem = $(this);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    console.log("elemBottom:"+elemBottom+",docViewBottom:"+docViewBottom+",elemTop:"+elemTop+",docViewTop:"+docViewTop)

    if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop))
    	return true;
    return false;
};