function getRandom(min, max) {

    return Math.random() * (max - min) + min;
}


var Clouds = document.getElementsByClassName("cloud");
var WinWidth = window.innerWidth;
var WinHeight = window.innerHeight;

for(var i = 0; i < Clouds.length; i++){

    var thisCloud = Clouds[i];
    var randomTop = getRandom(0, WinHeight);
    var randomLeft = getRandom(-WinWidth, 0);
    thisCloud.style.top = randomTop + "px";
    thisCloud.style.left = randomLeft + "px";
};


