const branch_id = document.querySelector(".branch h1");
const banner_home = document.querySelector(".banner_home");
const branch_category = document.querySelector(".branch h2");
const b_title = document.querySelector(".b_title");
const b_content = document.querySelector(".b_content");
const btn_play = document.querySelector(".btn_play");
const icon_left = document.querySelector(".icon_left");
const icon_left_id = document.querySelector(".icon_left .id");
const icon_left_title = document.querySelector(".icon_left .title");
const icon_right = document.querySelector(".icon_right");
const icon_right_id = document.querySelector(".icon_right .id");
const icon_right_title = document.querySelector(".icon_right .title");
const Application = PIXI.Application;
const Sprite = PIXI.Sprite;
const banner = new Application({
    width: $(window).width(),
    height: $(window).height()
});

document.querySelector(".banner_home").appendChild(banner.view);

const options = {
    amplitude: 300, //300
    wavelength: 0, //160
    speed: 700, //500
    brightness: 1, //1
    radius: 0 //-1
};

const bannerATime = 2.2;

const shockwaveFilterBanner = new PIXI.filters.ShockwaveFilter(
    [banner.screen.width, banner.screen.height],
    options,
    0
);

const sumListImg = listImage.length;
const containerBanner = new PIXI.Container();
const listImgB = [];
for (let i = 0; i < sumListImg; i++) {
    listImgB[i] = Sprite.from(listImage[i][6]);
}
function centerImage(image) {
    image.anchor.set(0.5);
    image.x = banner.renderer.width / 2;
    image.y = banner.renderer.height / 2;
}
for (let i = 0; i < listImage.length; i++) {
    centerImage(listImgB[i]);
}
for (let i = sumListImg - 1; i >= 0; i--) {
    containerBanner.addChild(listImgB[i])
}

containerBanner.filters = [shockwaveFilterBanner]

banner.stage.addChild(containerBanner);

branch_id.innerHTML = listImage[0][1];
branch_category.innerHTML = listImage[0][2];
b_title.innerHTML = listImage[0][3];
b_content.innerHTML = listImage[0][4];
btn_play.setAttribute('data-link', listImage[0][5]);
banner_home.setAttribute('data-id', listImage[0][0]);

icon_left.style.opacity = 1;
icon_right.style.opacity = 1;
try {
    icon_left_id.innerHTML = listImage[0 - 1][1];
    icon_left_title.innerHTML = listImage[0 - 1][3];
    icon_left.setAttribute('data-id', listImage[0 - 1][0]);
} catch (error) {
    icon_left.style.opacity = 0;
    icon_left.setAttribute('data-id', 'null');
}

try {
    icon_right_id.innerHTML = listImage[0 + 1][1];
    icon_right_title.innerHTML = listImage[1][3];
    icon_right.setAttribute('data-id', listImage[1][0]);
} catch (error) {
    icon_right.style.opacity = 0;
    icon_right.setAttribute('data-id', 'null');
}



$(".icon_right").click(function () {
    banner_right();
})

$(".icon_left").click(function () {
    banner_left();
})

let BwaveReady = true;

function banner_right() {
    if (icon_right.getAttribute('data-id') >= 0 && BwaveReady === true) {
        const id_b = Number(icon_right.getAttribute('data-id'));
        branch_id.innerHTML = listImage[id_b][1];
        branch_category.innerHTML = listImage[id_b][2];
        b_title.innerHTML = listImage[id_b][3];
        b_content.innerHTML = listImage[id_b][4];
        btn_play.setAttribute('data-link', listImage[id_b][5]);
        banner_home.setAttribute('data-id', listImage[id_b][0]);

        icon_left.style.opacity = 1;
        icon_right.style.opacity = 1;

        try {
            icon_left_id.innerHTML = listImage[id_b - 1][1];
            icon_left_title.innerHTML = listImage[id_b - 1][3];
            icon_left.setAttribute('data-id', listImage[id_b - 1][0]);
        } catch (error) {
            icon_left.style.opacity = 0;
            icon_left.setAttribute('data-id', 'null');
        }

        try {
            icon_right_id.innerHTML = listImage[id_b + 1][1];
            icon_right_title.innerHTML = listImage[id_b + 1][3];
            icon_right.setAttribute('data-id', listImage[id_b + 1][0]);
        } catch (error) {
            icon_right.style.opacity = 0;
            icon_right.setAttribute('data-id', 'null');
        }
        shockwaveFilterBanner.center = [banner.screen.width, banner.screen.height];
        listImgB[id_b].alpha = 0;
        banner.ticker.add(tmpAnimation);
        function tmpAnimation() {
            RunBannerAnimation(id_b - 1, id_b);
            if (shockwaveFilterBanner.time > bannerATime) {
                shockwaveFilterBanner.time = 0;
                shockwaveFilterBanner.wavelength = 0;
                banner.ticker.remove(tmpAnimation);
                listImgB[id_b].zIndex = 2;
                listImgB[id_b - 1].zIndex = 1;
                listImgB[id_b - 1].alpha = 0;
                BwaveReady = true;
                console.log("-------------------")
            }
        }
    }
}

function banner_left() {
    if (icon_left.getAttribute('data-id') >= 0 && BwaveReady === true) {
        const id_b = Number(icon_left.getAttribute('data-id'));
        branch_id.innerHTML = listImage[id_b][1];
        branch_category.innerHTML = listImage[id_b][2];
        b_title.innerHTML = listImage[id_b][3];
        b_content.innerHTML = listImage[id_b][4];
        btn_play.setAttribute('data-link', listImage[id_b][5]);
        banner_home.setAttribute('data-id', listImage[id_b][0]);


        icon_left.style.opacity = 1;
        icon_right.style.opacity = 1;
        try {
            icon_left_id.innerHTML = listImage[id_b - 1][1];
            icon_left_title.innerHTML = listImage[id_b - 1][3];
            icon_left.setAttribute('data-id', listImage[id_b - 1][0]);
        } catch (error) {
            icon_left.style.opacity = 0;
            icon_left.setAttribute('data-id', 'null');
        }
        try {
            icon_right_id.innerHTML = listImage[Number(id_b) + 1][1];
            icon_right_title.innerHTML = listImage[Number(id_b) + 1][3];
            icon_right.setAttribute('data-id', listImage[Number(id_b) + 1][0]);
        } catch (error) {
            icon_right.style.opacity = 0;
            icon_right.setAttribute('data-id', 'null');
        }
        shockwaveFilterBanner.center = [0, 0];
        listImgB[id_b].alpha = 0;
        banner.ticker.add(tmpAnimation);
        function tmpAnimation() {
            RunBannerAnimation(id_b + 1, id_b);
            if (shockwaveFilterBanner.time > bannerATime) {
                shockwaveFilterBanner.time = 0;
                shockwaveFilterBanner.wavelength = 0;
                banner.ticker.remove(tmpAnimation);
                listImgB[id_b].zIndex = 2;
                listImgB[id_b + 1].zIndex = 1;
                listImgB[id_b + 1].alpha = 0;
                BwaveReady = true;
                console.log("-------------------")
            }
        }
    }
}

function RunBannerAnimation(x, y) {
    shockwaveFilterBanner.wavelength = 300
    shockwaveFilterBanner.time += 0.03;
    for (let i = 0; i < sumListImg; i++) {

        if (i == y) {
            if (Number(listImgB[y].alpha) < 0) {
                listImgB[y].alpha = 0;
            }
            listImgB[y].alpha += Number(0.02);
        }
        else { listImgB[i].alpha -= 0.02; }
    }

    BwaveReady = false;
}

$(".card_item").click(function () {
    $(".banner_home").animate({ "top": "0vh" }, 1000)
    $('h1,h2,p,div,a').removeClass("black")
    $('.menu_h').css('background-color','transparent')
    $("#icon_menu").css("stroke", "#fff")
    id = $(this).data("id");
    const id_b = id;
    branch_id.innerHTML = listImage[id_b][1];
    branch_category.innerHTML = listImage[id_b][2];
    b_title.innerHTML = listImage[id_b][3];
    b_content.innerHTML = listImage[id_b][4];
    btn_play.setAttribute('data-link', listImage[id_b][5]);
    banner_home.setAttribute('data-id', listImage[id_b][0]);


    icon_left.style.opacity = 1;
    icon_right.style.opacity = 1;
    try {
        icon_left_id.innerHTML = listImage[id_b - 1][1];
        icon_left_title.innerHTML = listImage[id_b - 1][3];
        icon_left.setAttribute('data-id', listImage[id_b - 1][0]);
    } catch (error) {
        icon_left.style.opacity = 0;
        icon_left.setAttribute('data-id', 'null');
    }
    try {
        icon_right_id.innerHTML = listImage[Number(id_b) + 1][1];
        icon_right_title.innerHTML = listImage[Number(id_b) + 1][3];
        icon_right.setAttribute('data-id', listImage[Number(id_b) + 1][0]);
    } catch (error) {
        icon_right.style.opacity = 0;
        icon_right.setAttribute('data-id', 'null');
    }
    banner.ticker.add(tmpAnimation);
    function tmpAnimation() {

        RunBannerAnimation(0, id);
        if (shockwaveFilterBanner.time > bannerATime) {
            shockwaveFilterBanner.time = 0;
            shockwaveFilterBanner.wavelength = 0;
            banner.ticker.remove(tmpAnimation);
            BwaveReady = true;
            console.log("-------------------")
        }
    }
})
const el = document.querySelector("body");
el.onwheel = zoom;
function zoom(event) {
    if (event.deltaY < 0) {
        banner_left()
    }
    else {
        banner_right()

    }
}

$(".controls").bind("swipeup", function (e) {

    banner_right();

});
$(".controls").bind("swipedown", function (e) {
    banner_left();
});

$(".controls").bind("swiperight", function (e) {
    banner_left();
});
$(".controls").bind("swipeleft", function (e) {

    banner_right();

});

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    if (name == "ArrowUp") {
        banner_left();
    }

    if (name == "ArrowRight") {
        banner_right();
    }
    if (name == "ArrowLeft") {
        banner_left();
    }
    if (name == "ArrowDown") {
        banner_right();
    }
}, false);