$(window).on("load",function(){ "use strict";
    $(".loader").fadeOut(800);
});

$(window).on("resize",function(){ "use strict";
    var viewWidth = this.innerWidth;
    var viewHeight = this.innerHeight;
    var viewRatio = viewWidth / viewHeight;
    if ($('video').length > 0){
        if (viewRatio >= 1.7777){
            $('video').css('width', '100%');
            $('video').css('height', 'auto');
            var vHeight = $('video').height();
            var topSize = - (vHeight - viewHeight) / 2;
            $('video').css('top', topSize);
            $('video').css('left', 0);
        }else{
            $('video').css('width', 'auto');
            $('video').css('height', '100%');
            var vWidth = $('video').width();
            var leftSize = (viewWidth - vWidth) / 2;
            $('video').css('top', 0);
            $('video').css('left', leftSize);
            console.log(leftSize)
        }
    };
    
});

jQuery(function ($) {
    "use strict";

    /* ================================== cover sliders start ============================ */

        var swiper = new Swiper('.main-slider', {
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            speed: 1600,
            effect: "fade",
            loop: true,
            autoplay: 5000
        });



        var swiper = new Swiper('.parallax-slider', {
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            speed: 600,
            autoplay: 5000
        });


    /* ================================== cover sliders end ============================ */

    // portfolio filtering
    $(".project-wrapper").mixItUp();
    //portfolio fancybox setting
    // Popup
    $(".fancybox").fancybox({
        openEffect: 'fade',
        closeClick: true

    });
    //Video Popup

    //Happy Client Slider
    $("#owl-slider").owlCarousel({
        pagination: true
        , slideSpeed: 300
        , paginationSpeed: 400
        , singleItem: true
        , transitionStyle: "fade"
    });

    //blog text slider
    $("#blog-text-slider").owlCarousel({
        pagination: true
        , slideSpeed: 300
        , paginationSpeed: 400
        , singleItem: true
        , transitionStyle: "fade"
    });

    // navbar styling
    $(function(){
      var $window = $(window).on('resize', function(){
            var height = $('.navbar-header').height();
            $('.navbar-nav').height(height);


        }).trigger('resize'); //on page load

    });

    // stats counters
    $(".service-3 ").appear(function () {
        $('.count').each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });
    // progress bars
    $('.progress .progress-bar').css("width",
        function() {
            return $(this).attr("aria-valuenow") + "%";
     });


    // gradient layout
    function checkGradeient() {
        //gradient animations
        var colors = new Array(
            [62,35,255],
            [60,255,60],
            [255,35,98],
            [45,175,230],
            [255,0,255],
            [255,128,0]);

        var step = 0;
//color table indices for:
// current color left
// next color left
// current color right

// next color right
        var colorIndices = [0,1,2,3];

//transition speed
        var gradientSpeed = 0.002;

        function updateGradient()
        {

            if ( $===undefined ) return;

            var c0_0 = colors[colorIndices[0]];
            var c0_1 = colors[colorIndices[1]];
            var c1_0 = colors[colorIndices[2]];
            var c1_1 = colors[colorIndices[3]];

            var istep = 1 - step;
            var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
            var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
            var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
            var color1 = "rgb("+r1+","+g1+","+b1+")";

            var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
            var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
            var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
            var color2 = "rgb("+r2+","+g2+","+b2+")";

            $('#gradient').css({
                background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
                background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

            step += gradientSpeed;
            if ( step >= 1 )
            {
                step %= 1;
                colorIndices[0] = colorIndices[1];
                colorIndices[2] = colorIndices[3];

                //pick two new target color indices
                //do not pick the same as the current one
                colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

            }
        }

        setInterval(updateGradient,10);
    }

    if($('body').hasClass("gradientLayout")){
        checkGradeient()
    }



    //Contact Us
    $("#submit_btn").click(function() {
        //get input field values
        var user_name       = $('input[name=name]').val();
        var user_email      = $('input[name=email]').val();
        var user_telephone      = $('input[name=phone]').val();
        var user_subject      = $('input[name=subject]').val();
        var user_message    = $('textarea[name=message]').val();

        //simple validation at client's end
        var post_data, output;
        var proceed = true;
        if(user_name==""){
            proceed = false;
        }
        if(user_email==""){
            proceed = false;
        }
        if(user_message=="") {
            proceed = false;
        }

        //everything looks good! proceed...
        if(proceed)
        {
            //data to be sent to server
            post_data = {'userName':user_name, 'userEmail':user_email, 'userTelephone':user_telephone, 'userSubject':user_subject, 'userMessage':user_message};

            //Ajax post data to server
            $.post('contact.php', post_data, function(response){

                //load json data from server and output message
                if(response.type == 'error')
                {
                    output = '<div class="alert-danger" style="padding:10px; margin-bottom:25px;">'+response.text+'</div>';
                }else{
                    output = '<div class="alert-success" style="padding:10px; margin-bottom:25px;">'+response.text+'</div>';

                    //reset values in all input fields
                    $('#form-elements input').val('');
                    $('#form-elements textarea').val('');
                }

                $("#result").hide().html(output).slideDown();
            }, 'json');

        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#form-elements input, #form-elements textarea").keyup(function() {
        $("#result").slideUp();
    });


});