var register = document.forms.register;
var login = document.forms.login;

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

var loginRegisterSwitcher = false;

document.getElementById("loginToRegister").onclick = function () {
    document.getElementById('register').style.display = "block";
    document.getElementById('login').style.display = "none";
}

document.getElementById("registerToLogin").onclick = function () {
    document.getElementById('login').style.display = "block";
    document.getElementById('register').style.display = "none";
}