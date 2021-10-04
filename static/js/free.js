var button = document.getElementById('free-button');
var email = document.getElementById('email-input');
// var acceptUpdates = document.getElementById('accept-updates');

// set up event listener for button which creates post request when donate button is clicked
button.addEventListener('click', function(e) {

e.preventDefault();

if(!checkEmail(email.value)){
    console.log("invalid email")
    document.getElementById('email-helper-text').id = 'show-email-helper-text';
    return
}
else{
    console.log("valid email")
    }
});

function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}