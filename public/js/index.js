var register = document.forms.register;
var login = document.forms.login;
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
    console.log(n);
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
    $("#counterofimages").append('<p align="center">'+ n +'</p>');
}


var loginRegisterSwitcher = false;

document.getElementById("loginToRegister").onclick = function () {
    document.getElementById('register').style.display = "block";
    document.getElementById('login').style.display = "none";
}

document.getElementById("registerToLogin").onclick = function () {
    document.getElementById('login').style.display = "block";
    document.getElementById('register').style.display = "none";
}

register.elements.registerUser.onclick = function () {
    if (register.elements.password.value === register.elements.confirmPassword.value) {
        firebase.auth().createUserWithEmailAndPassword(register.elements.email.value, register.elements.password.value).then(function (response) {
            document.getElementById('login').style.display = "block";
            document.getElementById('register').style.display = "none";
            document.getElementById('message').innerHTML = "Registration complete";
            document.getElementById('message').style.color = "green";
        })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById('message').innerHTML = errorMessage;
            });
    }
    else {
        document.getElementById('message').innerHTML = "Passwords are not same";
    }
}

login.elements.loginUser.onclick = function () {
    firebase.auth().signInWithEmailAndPassword(login.elements.email.value, login.elements.password.value).then(function (response) {
        console.log(response)
    })
        .catch(function (error) {
            console.log(error)
        });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.open('./home.html', '_self');
    } else {
    }
});