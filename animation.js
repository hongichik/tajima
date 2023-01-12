$(".icon_left").hover(function () {
    $(".icon_left svg").css("width", "70%")
    $(".icon_left svg").animate({ "width": "100%" }, 1000)
        .queue(function () {
            $(".icon_left svg").dequeue();
        });
})

$(".icon_right").hover(function () {
    $(".icon_right svg").css("width", "70%")
    $(".icon_right svg").animate({ "width": "100%" }, 1000)
        .queue(function () {
            $(".icon_right svg").dequeue();
        });
})
$(".icon_menu").click(function () {
    $(".banner_home").animate({ "top": "-100vh" }, 1000)
    $('h1,h2,p,div,a').addClass("black")
    $('.menu_h').css('background-color','white')
    $("#icon_menu").css("stroke", "black")
    window.scrollTo(0, 0)
})
$(".btn_about").click(function () {
    $(".banner_home").animate({ "top": "-100vh" }, 1000)
    $('h1,h2,p,div,a').addClass("black")
    $('.menu_h').css('background-color','white')
    $("#icon_menu").css("stroke", "black")
})
$(".btn_home").click(function () {
    $(".banner_home").animate({ "top": "0vh" }, 1000)
    $('h1,h2,p,div,a').removeClass("black")
    $('.menu_h').css('background-color','transparent')
    $("#icon_menu").css("stroke", "#fff")
})
$(document).ready(function () {
    $("<img/>")
        .on('load', function () { console.log("image loaded correctly"); })
        .on('error', function () { console.log("error loading image"); })
        .attr("src", function () {
            $("#preloader").hide()
        }
        )
        ;
});

