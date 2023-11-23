/* ========================================================================= */
/*	Preloader
/* ========================================================================= */

jQuery(window).load(function(){

	$("#preloader").fadeOut("slow");

});

/* ========================================================================= */
/*  Welcome Section Slider
/* ========================================================================= */

$(function() {

    var Page = (function() {

        var $navArrows = $( '#nav-arrows' ),
            $nav = $( '#nav-dots > span' ),
            slitslider = $( '#slider' ).slitslider( {
                onBeforeChange : function( slide, pos ) {

                    $nav.removeClass( 'nav-dot-current' );
                    $nav.eq( pos ).addClass( 'nav-dot-current' );

                }
            } ),

            init = function() {

                initEvents();
                
            },
            initEvents = function() {

                // add navigation events
                $navArrows.children( ':last' ).on( 'click', function() {

                    slitslider.next();
                    return false;

                } );

                $navArrows.children( ':first' ).on( 'click', function() {
                    
                    slitslider.previous();
                    return false;

                } );

                $nav.each( function( i ) {
                
                    $( this ).on( 'click', function( event ) {
                        
                        var $dot = $( this );
                        
                        if( !slitslider.isActive() ) {

                            $nav.removeClass( 'nav-dot-current' );
                            $dot.addClass( 'nav-dot-current' );
                        
                        }
                        
                        slitslider.jump( i + 1 );
                        return false;
                    
                    } );
                    
                } );

            };

            return { init : init };

    })();

    Page.init();

});

function openTab(evt, tabName, tabParent) {
    var i, tabcontent, tablinks;
    tabcontent = document.querySelectorAll(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].id.includes(tabParent)) {
            tabcontent[i].classList.add("tabcontent-hidden");
            tabcontent[i].classList.remove("tabcontent");
            $(tabcontent[i]).fadeOut(100);
        }
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].id.includes(tabParent)) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    }
    document.getElementById(tabName).classList.add("tabcontent");
    document.getElementById(tabName).classList.remove("tabcontent-hidden");
    $(document.getElementById(tabName)).fadeIn(2000);
    evt.currentTarget.className += " active";
}

function openSection(sectionId) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].id !== sectionId) {
            $(sections[i]).fadeOut(1000);
        } else {
            $(sections[i]).fadeIn(2000);
        }
    }
    $("html").animate({scrollTop: 0}, 500);
}

$(document).ready(function(){
    $("#research").load("./components/research.html");
    $("#code").load("./components/code.html");
    var i, tabcontent;
    tabcontent = document.querySelectorAll(".tabcontent-hidden");
    for (i = 0; i < tabcontent.length; i++) {
        $(tabcontent[i]).fadeOut(10);
    }
    var sections;
    sections = document.querySelectorAll("section");
    for (i = 0; i < sections.length; i++) {
        $(sections[i]).fadeOut(10);
    }
    $("#home-slider").fadeIn(200);
	/* ========================================================================= */
	/*	Menu item highlighting
	/* ========================================================================= */

	// jQuery('#nav').singlePageNav({
	// 	offset: jQuery('#nav').outerHeight(),
	// 	filter: ':not(.external)',
	// 	speed: 2000,
	// 	currentClass: 'current',
	// 	easing: 'easeInOutExpo',
	// 	updateHash: true,
	// 	beforeStart: function() {
	// 		console.log('begin scrolling');
	// 	},
	// 	onComplete: function() {
	// 		console.log('done scrolling');
	// 	}
	// });

    // function isVisibleInViewport(elem)
    // {
    //     var y = elem.offsetTop;
    //     var height = elem.offsetHeight;
    //
    //     while ( elem === elem.offsetParent )
    //         y += elem.offsetTop;
    //
    //     var maxHeight = y + height;
    //     var isVisible = ( y < ( window.scrollY + window.innerHeight) ) && ( maxHeight >= window.scrollY );
    //     return isVisible;
    //
    // }
    //
    // function faderLeft(elem) {
    //     if (isVisibleInViewport(elem)) {
    //         elem.classList.add("fadeInLeftBig");
    //         elem.classList.remove("fadeOutLeftBig");
    //     } else {
    //         elem.classList.remove("fadeInLeftBig");
    //         elem.classList.add("fadeOutLeftBig");
    //     }
    //     setTimeout(() => faderLeft(elem), 10);
    // }
    //
    // function faderRight(elem) {
    //     if (isVisibleInViewport(elem)) {
    //         elem.classList.add("fadeInRightBig");
    //         elem.classList.remove("fadeOutRightBig");
    //     } else {
    //         elem.classList.remove("fadeInRightBig");
    //         elem.classList.add("fadeOutRightBig");
    //     }
    //     setTimeout(() => faderRight(elem), 10);
    // }
    //
    // var tops = document.getElementsByClassName("quality-img-top")
    // setTimeout(() => faderLeft(tops.item(0)), 10);
    // setTimeout(() => faderRight(tops.item(1)), 10);
    // var bottoms = document.getElementsByClassName("quality-img-bottom")
    // setTimeout(() => faderLeft(bottoms.item(0)), 10);
    // setTimeout(() => faderRight(bottoms.item(1)), 10);
    //
    //
    // var txts = ['Product Design', 'Software Engineering', 'UI/UX'];
    // var i = 0;
    // var j = 0;
    // var speed = 100;
    // function typeWriter() {
    //     if (i < txts[j].length) {
    //         document.getElementById("type").innerHTML += txts[j].charAt(i);
    //         i++;
    //         if (i < txts[j].length) {
    //             setTimeout(typeWriter, speed);
    //         } else {
    //             setTimeout(typeWriter, 10*speed);
    //         }
    //     } else if (i <= 2 * txts[j].length) {
    //         document.getElementById("type").innerHTML = document.getElementById("type").innerHTML.slice(0, -1);
    //         i++;
    //         setTimeout(typeWriter, speed);
    //     } else {
    //         i = 0;
    //         j = (j + 1) % 3;
    //         setTimeout(typeWriter, speed);
    //     }
    // }
    //
    // typeWriter();




    /* ========================================================================= */
	/*	Fix Slider Height
	/* ========================================================================= */	

    // Slider Height
    var slideHeight = $(window).height();
    
    $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height',slideHeight);

    $(window).resize(function(){'use strict',
        $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height',slideHeight);
    });
	
	
	
	$("#works, #testimonial").owlCarousel({	 
		navigation : true,
		pagination : false,
		slideSpeed : 700,
		paginationSpeed : 400,
		singleItem:true,
		navigationText: ["<i class='fa fa-angle-left fa-lg'></i>","<i class='fa fa-angle-right fa-lg'></i>"]
	});
	
	
	/* ========================================================================= */
	/*	Featured Project Lightbox
	/* ========================================================================= */

	$(".fancybox").fancybox({
		padding: 0,

		openEffect : 'elastic',
		openSpeed  : 650,

		closeEffect : 'elastic',
		closeSpeed  : 550,

		closeClick : true,
			
		beforeShow: function () {
			this.title = $(this.element).attr('title');
			this.title = '<h3>' + this.title + '</h3>' + '<p>' + $(this.element).parents('.portfolio-item').find('img').attr('alt') + '</p>';
		},
		
		helpers : {
			title : { 
				type: 'inside' 
			},
			overlay : {
				css : {
					'background' : 'rgba(0,0,0,0.8)'
				}
			}
		}
	});
	
});


function codeTransition() {
    var home = document.getElementById("home-slider");
    var code = document.getElementById("code");
    $("#home-slider").one("transitionend", function() {
        console.log("1");
        home.style.display = "none";
        code.style.display = "flex";
        setTimeout(function () {
            console.log("2");
            code.classList.remove("codeOutTransition");
            code.classList.add("codeInTransition");
        }, 500);
    })
    document.getElementById("site-body").style.backgroundColor = "black";
    home.classList.add("homeOutTransitionCode");
}


function codeOutTransition() {
    var home = document.getElementById("home-slider");
    var code = document.getElementById("code");
    $("#code").one("transitionend", function() {
        console.log("3");
        home.style.display = "flex";
        code.style.display = "none";
        document.getElementById("site-body").style.backgroundColor = "white";
        home.classList.remove("homeOutTransitionCode");
    })
    code.classList.add("codeOutTransition");
    code.classList.remove("codeInTransition");
}


var wow = new WOW ({
	offset:       75,          // distance to the element when triggering the animation (default is 0)
	mobile:       false,       // trigger animations on mobile devices (default is true)
});
wow.init();

