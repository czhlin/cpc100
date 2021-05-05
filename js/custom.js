
(function ($) {
	'use strict';
    
        $(window).on('load', function(){
            $("#preloader").removeClass("loader_show");
            $("#preloader").addClass("hide");
            // $(".loader").addClass("fadeout");
            $("body").addClass("enable_page");
        })

        /* Custom mouse cursor */
        // document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
        //     e.style.left = n.clientX + "px",
        //     e.style.top = n.clientY + "px"
        // });
        // var	e = document.getElementById("bnz-pointer");

        // $(document).mousemove(function(e) {

        //     $(".swiper-button-next, .swiper-button-prev, input.button, a")
        //     .on("mouseenter", function() {
        //         $('.bnz-pointer').addClass("bnz-large")
        //     })
        //     .on("mouseleave", function() {
        //         $('.bnz-pointer').removeClass("bnz-large")
        //     })

        //     $(".swiper-pagination-bullet, .form-control")
        //     .on("mouseenter", function() {
        //         $('.bnz-pointer').addClass("bnz-small")
        //     })
        //     .on("mouseleave", function() {
        //         $('.bnz-pointer').removeClass("bnz-small")
        //     })

        //     $(".swiper-slide")
        //     .on("mouseenter", function() {
        //         $('.bnz-pointer').addClass("bnz-drag")
        //     })
        //     .on("mouseleave", function() {
        //         $('.bnz-pointer').removeClass("bnz-drag")
        //     })

        //     $(".bnz-pointer-none")
        //     .on("mouseenter", function() {
        //         $('.bnz-pointer').addClass("bnz-none")
        //     })
        //     .on("mouseleave", function() {
        //         $('.bnz-pointer').removeClass("bnz-none")
        //     })

        // });
       
        // Slider Carousel 1
        if ($(".theme_slider_1").length) {
            var slider_text = new Swiper('.slider_text .swiper-container', {
                centeredSlides: true,
                resistance: true,
                resistanceRatio: 0.6,
                speed: 1400,
                spaceBetween: 0,
                parallax: true,
                effect: "slide",
                slidesPerView: '1',
                slideToClickedSlide: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });

            var slider_images = new Swiper('.slider_images .swiper-container', {
                centeredSlides: true,
                resistance: true,
                resistanceRatio: 0.6,
                speed: 1400,
                spaceBetween: 50,
                parallax: false,
                effect: "fade",
                slidesPerView: '1',
                slideToClickedSlide: true,
                mousewheel: false,
                
            });
            
            slider_text.controller.control = slider_images;
            slider_images.controller.control = slider_text;
        }

        if ($(".theme_slider_2").length) {
            var slider_text = new Swiper('.slider_text .swiper-container', {
                centeredSlides: true,
                resistance: true,
                resistanceRatio: 0.6,
                autoplay: false,
                speed: 1400,
                spaceBetween: 0,
                parallax: true,
                effect: "fade",
                slidesPerView: '1',
                slideToClickedSlide: true,
                
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        }

        // Author Slider
        var swiper = new Swiper('.author_slider .swiper-container', {
            resistance: true,
            resistanceRatio: 0.6,
            speed: 1400,
            spaceBetween: 0,
            parallax: true,
            effect: "slide",
            slidesPerView: '1',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        // post_by_author Slider
        var swiper = new Swiper('.post_by_author .swiper-container', {
            resistance: true,
            resistanceRatio: 0.6,
            speed: 1400,
            spaceBetween: 45,
            parallax: true,
            effect: "slide",
            slidesPerView: '3',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }
        });

        // Video
        $(".play_btn").click(function () {
            $("#content").hide();
            $("#yt")[0].src += "?autoplay=1";
            $("#yt").show();
        });

        
        /* Content Animation */
        AOS.init({
            easing: 'ease-in-out',
            once: true,
        });
    
   
})(jQuery);
	