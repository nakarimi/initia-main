$(document).ready(function () {
    $(".slider").slick({
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: false,
        arrows: false,
        dots: true,
        appendDots: $('.slider-dots-box'), // Custom dots container
        dotsClass: 'slider-dots d-flex'   // Custom dots styling class
    });

    $(".toggleSearch").click(function () {
        $(".search-block").toggle(500, function () {
            if ($(".search-block").is(":visible")) {
                $(this).css("animation", "slideIn 0.5s forwards");
            }
        });
    });

    // When an <a> inside .menu-content is clicked

    $('.menu-content a').on('click', function (e) {
        $('.menu-content').toggleClass('expandedme');
        e.preventDefault(); // Prevent the default link behavior

        // Remove 'active' class from all <a> elements

        $('.menu-content a').removeClass('active');
        $('.menu-content a.hidden-to-replace').addClass('replacement');
        $('.menu-content a.replacement').addClass('active');

        // Add 'active' class to the clicked <a> element
        $(this).addClass('active');

        // Get the SVG and text of the clicked <a> element
        var menuSVG = $(this).find('svg').prop('outerHTML'); // Get the SVG HTML
        var menuText = $(this).text().trim(); // Get the text (trimmed) of the clicked <a>

        // Set the SVG and text inside the .replacement
        $('.replacement').html(menuSVG + ' ' + menuText); // Append SVG and text
    });

    // When .show-menu is clicked, toggle the expanded class on .menu-content
    $('.show-menu').on('click', function () {
        $('.menu-content').toggleClass('expandedme'); // Toggle the expanded state of the menu
    });

    /// Mobile slider for elements


    $(function () {
        $('.two-elments').slick({
            slidesToShow: 1.03,
            slidesToScroll: 1,
            mobileFirst: true,
            arrows: false,
            dots: false,
            margin: 20,
            responsive: [
                {
                    breakpoint: 769,
                    settings: 'unslick'
                }
            ]
        });

        $(window).on('resize', function () {
            $('.two-elments').slick('resize');
        });
    });


    $('.mycarouselle').slick({
        arrows: false,
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 4, // Show 4 slides by default on desktop
        responsive: [
            {
                breakpoint: 768, // For mobile view
                settings: {
                    slidesToShow: 1.04, // Show 1 full slide
                    slidesToScroll: 1,
                    centerMode: true, // Enable centering
                    centerPadding: '20px', // Adjust padding to show half of the next slide
                }
            },

            {
                breakpoint: 992, // For mobile view
                settings: {
                    slidesToShow: 1.04, // Show 1 full slide
                    slidesToShow: 3, // Show 1 full slide
                    slidesToScroll: 1,
                    centerMode: true, // Enable centering
                    centerPadding: '10px', // Adjust padding to show half of the next slide
                }
            }
        ]
    });

    // Handle focus and prevent hidden slides from being focusable
    $('.mycarouselle').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        // Add 'inert' to all slides that are not visible
        $('.slick-slide').attr('inert', 'true');
    });

    $('.mycarouselle').on('afterChange', function (event, slick, currentSlide) {
        // Remove 'inert' from active and visible slides
        $('.slick-active').removeAttr('inert');
    });

    $(window).scroll(function () {
        var menuOffsetTop = $('#menu-content').offset().top; // Get the original position of the menu container
        var pixel = $(window).scrollTop(); // Get the current scroll position

        // If the scroll position reaches or exceeds the original offset of the #menu-content, make it fixed
        if (pixel >= menuOffsetTop) {
            $('.menu-content').addClass('fixed-menu');
        } else {
            $('.menu-content').removeClass('fixed-menu');
        }
    });
    $("a[href^='#']").click(function (e) {
        e.preventDefault();

        var target = $($(this).attr("href"));
        var position = target.offset().top;

        var offset = 90; // Adjust according to your fixed header height

        var scrollToPosition = position - offset;

        $("html, body").animate({
            scrollTop: scrollToPosition
        }, 800); // Adjust speed if necessary
    });
});
