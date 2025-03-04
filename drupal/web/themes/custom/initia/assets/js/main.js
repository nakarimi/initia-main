$(document).ready(function () {
  $(".labelSearch").click(function (e) {
    $("#search-block-form").submit();
  });

  console.log('Hello, world!');
  $(".field--type-address br").replaceWith(" - ");

  $(".toggleSearch").click(function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    const $searchblock = $(".searchblock");

    if ($searchblock.hasClass("expanded")) {
      $searchblock.removeClass("expanded"); // Collapse the block
    } else {
      $searchblock.addClass("expanded"); // Expand the block
    }
  });

  $(".child-1 .custom-accordion .accordion-button").click();
  
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

  $('.gray-carouselle').slick({
      arrows: false,
      dots: false,
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 3, // Show 4 slides by default on desktop
      responsive: [
          {
              breakpoint: 768, // For mobile view
              settings: {
                  slidesToShow: 1, // Show 1 full slide
                  slidesToScroll: 1,
                  centerMode: false, // Enable centering
              }
          }
      ]
  });
  $(".prev-btn").click(function () {
      $(".gray-carouselle").slick("slickPrev");
  });

  $(".next-btn").click(function () {
      $(".gray-carouselle").slick("slickNext");
  });
  $(".prev-btn").addClass("slick-disabled");
  $(".gray-carouselle").on("afterChange", function () {
      if ($(".slick-prev").hasClass("slick-disabled")) {
          $(".prev-btn").addClass("slick-disabled");
      } else {
          $(".prev-btn").removeClass("slick-disabled");
      }
      if ($(".slick-next").hasClass("slick-disabled")) {
          $(".next-btn").addClass("slick-disabled");
      } else {
          $(".next-btn").removeClass("slick-disabled");
      }
  });
});
