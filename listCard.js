$(document).ready(function () {
    const listCard = [];
    for (let i = 0; i < $(".card_item").length; i++) {
        listCard[i] = new Application({
            width: $(".card_item").width(),
            height: $(".card_item").width() * 0.6
        });
        $(".card_item")[i].appendChild(listCard[i].view);
    }

    shockwaveFiltert = [];
    containerCard = [];
    const optionsCard = {
        amplitude: 300, //300
        wavelength: 0, //160
        speed: 700, //500
        brightness: 1, //1
        radius: -1 //-1
    };
    $.each($(".card_item"), function (index, item) {
        console.log(item.getAttribute("data-id"))
    });
    for (let i = 0; i < $(".card_item").length; i++) {
        shockwaveFiltert[i] = new PIXI.filters.ShockwaveFilter(
            [$(".card_item").width() / 2, $(".card_item").width() * 0.6 / 2],
            optionsCard,
            0
        );
        image = Sprite.from($(".card_item")[i].getAttribute("data-img"));
        image.anchor.set(0.5);
        image.x = listCard[i].renderer.width / 2;
        image.y = listCard[i].renderer.height / 2;
        containerCard[i] = new PIXI.Container();
        containerCard[i].addChild(image)
        containerCard[i].filters = [shockwaveFiltert[i]];
        listCard[i].stage.addChild(containerCard[i]);
    }
    onlick = true;
    $(".card_item canvas").hover(function () {
        if (!onlick) {
            return;
        }
        onlick = false;
        id = $(this).parent().data("id");

        listCard[id].ticker.add(hover)
        function hover() {
            shockwaveFiltert[id].wavelength = 100
            shockwaveFiltert[id].time += 0.005;
            if (shockwaveFiltert[id].time > 0.4) {
                shockwaveFiltert[id].time = 0;
                shockwaveFiltert[id].wavelength = 0;
                listCard[id].ticker.remove(hover);
                onlick = true;
            }
        }
    })


})

