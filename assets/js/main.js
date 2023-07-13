document.addEventListener("DOMContentLoaded", function() {

    $('html').addClass('js-enabled');

    setup_mobile_height();
    setup_theme_switcher();
});

$(window).on('load', function() {
    $(".js-preloader").fadeOut(800, function() {
        $(".js-main-container").fadeIn(800);

        setup_scrollreveal();
        setup_progress_bar_animation();
    });
});

function setup_progress_bar_animation()
{
    var $animation_elements = $("[class*='a-']");
    var $window = $(window);

    $window.on('scroll resize', function() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            // Check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');

                // Animate progress bar
                if ($element.hasClass('a-progress-bar')) {
                    $element.css('width', $element.attr('data-percent') + '%');
                }

            }
            //else {
            //    $element.removeClass('in-view');
            //}
        });
    });

    $window.trigger('scroll');

}



function setup_scrollreveal()
{
    if(typeof ScrollReveal !== 'undefined' && $.isFunction(ScrollReveal)) {

        window.sr = ScrollReveal();

        var default_config = {
            duration: 500,
            delay: 0,
            easing: 'ease'
        };
        var header_config = $.extend(false, default_config, {
            duration: 1200,
            delay: 700,
            distance: '10px',
            scale: 0.95,
            origin: 'bottom',
            interval: 175,
            viewOffset: {top: 0, right: 0, bottom: 0, left: 0}
        });
        var footer_config = $.extend(false, default_config, {
            duration: 1500,
            distance: '0px'
        });

        sr.reveal('.a-header', header_config);
        sr.reveal('.a-footer', footer_config);

    }

}



function setup_mobile_height() {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  // Update on resize
  /*window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });*/
}



function setup_theme_switcher()
{
    var light = $('link[id="light-css"]');
    var dark = $('link[id="dark-css"]');
    var $button = $('#theme-switcher');
    var $icon = $('#theme-switcher i');

    if ( localStorage.getItem('theme') == 'dark' || (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches) ) {
        dark.removeAttr('disabled');
        light.attr('disabled', 'disabled');
        $icon.removeClass('fa-moon').addClass('fa-sun');
    }

    $button.on('click', function() {
        var attr = light.attr('disabled');
        if ( typeof attr !== typeof undefined && attr !== false ) {
            light.removeAttr('disabled');
            dark.attr('disabled', 'disabled');
            localStorage.setItem("theme", "light");
            $icon.removeClass('fa-sun').addClass('fa-moon');
        } else {
            light.attr('disabled', 'disabled');
            dark.removeAttr('disabled');
            localStorage.setItem("theme", "dark");
            $icon.removeClass('fa-moon').addClass('fa-sun');
        }
    });

    var timeoutId = 0;
    $button.on('mousedown', function() {
        timeoutId = setTimeout(function(){
            var r = confirm("Are you sure you want to clear the theme setting?");
            if ( r == true ) {
              localStorage.removeItem("theme");
              location.reload();
            }
        }, 1000);
    }).on('mouseup mouseleave', function() {
        clearTimeout(timeoutId);
    });

}
