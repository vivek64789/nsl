


// banner slider

jQuery("#banner").owlCarousel({
        autoPlay : true,
        slideSpeed : 300,
        navigation : false,
        pagination : false,
        navigationText: [
            "<span class='th-btnsquareprev'><i class='fa fa-long-arrow-left'></i></span>",
            "<span class='th-btnsquarenext'><i class='fa fa-long-arrow-right'></i></span>"
        ],
        itemsCustom : [
            [0, 1],
            [480, 1],
            [768, 1],
            [992, 1],
            [1200, 1],
        ],
    });

jQuery("#partner-slider").owlCarousel({
        autoPlay : true,
        slideSpeed : 300,
        navigation : false,
        pagination : false,
        navigationText: [
            "<span class='th-btnsquareprev'><i class='fa fa-long-arrow-left'></i></span>",
            "<span class='th-btnsquarenext'><i class='fa fa-long-arrow-right'></i></span>"
        ],
        itemsCustom : [
            [0, 2],
            [480, 3],
            [768, 3],
            [992, 4],
            [1200, 6],
        ],
    });

// magnific popup
  $(document).ready(function() {
    $('.popup-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
      },
      
    });
  });

// Header fixed on scroll

    // $(function() {
    //     $(window).scroll(function() {
    //         var scroll = $(window).scrollTop();
    //         if (scroll >= 100) {
    //             $("header").addClass('smaller');
    //         } else {
    //             $("header").removeClass("smaller");
    //         }
    //     });
    // });


    $( ".ham-menu" ).click(function() {
      $(".nav-menu").toggleClass("open-menu");
      $(".ham-menu").toggleClass("close-nav");
    });

    // $( ".close-nav" ).click(function() {
    //   $(".nav-menu").removeClass("open-menu");
    // });

    // loader
$(window).load(function () {
    setTimeout(function(){
         $(".preloader").addClass('close-load');
    }, 1500);
});