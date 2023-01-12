const country = document.querySelector("h2");
const Application = PIXI.Application;
const Sprite  = PIXI.Sprite ;
const app = new Application({
  width: $(window).width(),
  height: $(window).height()
});

document.querySelector(".banner_home").appendChild(app.view);
const loader = PIXI.Loader.shared;


loader
  .add(listImage)
  .load(setup);

function setup(loader, resources) {
  const img = [];
  for (let i = 0; i < listImage.length; i++) {
      img[i] = PIXI.Sprite.from(
        resources[listImage[i]].name
      );
  }

  function centerImage(image) {
    image.anchor.set(0.5);
    image.x = app.renderer.width / 2;
    image.y = app.renderer.height / 2;
  }

  // căn giữa
    for (let i = 0; i < listImage.length; i++){
      centerImage(img[i]);
    }

  const container = new PIXI.Container();
  for (let i = listImage.length-1; i >=0; i--)
  {
    container.addChild(img[i]);
  }
  app.stage.addChild(container);

  container.sortableChildren = true;

  const options = {
    amplitude: 300, //300
    wavelength: 0, //160
    speed: 700, //500
    brightness: 1, //1
    radius: -1 //-1
  };

  const shockwaveFilter = new PIXI.filters.ShockwaveFilter(
    [app.screen.width , app.screen.height],
    options,
    0
  );

  container.filters = [shockwaveFilter];

    let currentCountry = 1;
    let waveReady = true;

    function eventUp() {
        if (currentCountry < listImage.length && waveReady === true) {
          currentCountry++;
          shockwaveFilter.center = [app.screen.width , app.screen.height]
          shockwaveFilter.wavelength = 300;
          country.innerHTML = listImage[currentCountry - 1];
          app.ticker.add(slide1To2);
          function slide1To2() {
            startAnimation(img[currentCountry-2], img[currentCountry-1]);
            if (shockwaveFilter.time > 3) endAnimation(img[currentCountry-2], img[currentCountry-1], slide1To2);
        }

        }        
    }

  function eventDown() {
        
        if (currentCountry > 1 && waveReady === true) {
          currentCountry--;
          shockwaveFilter.center = [0 , 0]
          shockwaveFilter.wavelength = 300;
          country.innerHTML = listImage[currentCountry - 1];
          app.ticker.add(slide1To2);
          function slide1To2() {
            startAnimation(img[currentCountry], img[currentCountry-1]);
            if (shockwaveFilter.time > 3) endAnimation(img[currentCountry], img[currentCountry-1], slide1To2);
        }
        }
    }
    
    
    
  const el = document.querySelector("div");
  el.onwheel = zoom;
  function zoom(event) {
    if(event.deltaY < 0)
    {
        eventDown();
    }
    else
    {
      eventUp();
        
    }
    }
    
    $(".controls").bind("swipeup", function(e) {

        eventUp();

    });
    $(".controls").bind("swipedown", function(e) {
      eventDown();
    });

    $(".controls").bind("swiperight", function(e) {
        eventDown();
    });
    $(".controls").bind("swipeleft", function(e) {

        eventUp();

    });
  
document.addEventListener('keydown', (event) => {
  var name = event.key;
  var code = event.code;
  if (name == "ArrowUp")
  {
    eventDown();
  }

  if (name == "ArrowRight")
  {
    eventUp();
  }
  if (name == "ArrowLeft")
  {
    eventDown();
  }
    if (name == "ArrowDown")
  {
    eventUp();
  }
}, false);
  
  function startAnimation(image1, image2) {
    shockwaveFilter.time += 0.02;
    image1.alpha -= 0.008;
    image2.alpha = 1;
    waveReady = false;
  }

  function endAnimation(image1, image2, tickerCallback) {
    shockwaveFilter.time = 0;
    shockwaveFilter.wavelength = 0;
    image2.zIndex = 2;
    image1.zIndex = 1;
    image1.alpha = 0;
    waveReady = true;
    app.ticker.remove(tickerCallback);
  }
}
