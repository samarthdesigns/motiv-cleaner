var counter;
if (localStorage.getItem("count") === null) {
    localStorage.setItem("count", 0)
    counter = localStorage.getItem("count")
}
else {
    counter = localStorage.getItem("count")
}
if (localStorage.getItem("Images") === null) {
    var images = [];
}
else {
    images = JSON.parse(localStorage.getItem("Images"));
}

var element = {};
var localImagePull = localStorage.getItem("Images");

var constraints = { video: { facingMode: "user" }, audio: false };

const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    homeTrigger = document.querySelector("#home"),
    leaderTrigger = document.querySelector("#leader")


function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Oops. Something is broken.", error);
        });
}

window.addEventListener("load", cameraStart, false);

cameraTrigger.onclick = function () {
    $('#camera').fadeIn();
    $('.leader').fadeOut();
    $('.home-holder').fadeOut();
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/jpg");
    element.id = counter;
    element.value = cameraOutput.src;
    images.push(element);
    localStorage.setItem("Images", JSON.stringify(images));
    counter = counter++;
    localStorage.setItem("count", counter);
    cameraOutput.classList.add("taken");
};

homeTrigger.onclick = function () {
    $('#camera').fadeOut();
    $('.leader').fadeOut();
    $('.home-holder').fadeIn();
    images = JSON.parse(localStorage.getItem("Images"));
    var n = Object.keys(images).length;
    $("#images").empty();
    for (i = 0; i < n; i++) {
        $("#images").append('<img src="'+ images[i].value +'" class="image-setter"/>');
    }
}

leaderTrigger.onclick = function () {
    $('#camera').fadeOut();
    $('.leader').fadeIn();
    $('.home-holder').fadeOut();
    images = JSON.parse(localStorage.getItem("Images"));
    var n = Object.keys(images).length;
    $("#counterofimages").empty();
    $("#counterofimages").append('<p align="center">'+ n +'</p>');
}