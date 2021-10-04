//var stripe = Stripe('pk_test_51H4BOyHMizufl1MZmZvUZIqED1XKjHiObucZMDe5Q5X9DFnFwCa8nKn7QQUtB3Zc5kE6MA0WUmSo745ecxih29oK00078CoxPi');
var stripe = Stripe('pk_live_51H4BOyHMizufl1MZOwRNxONToDtfUZCj8rCyB76QDxCLKehftkkYI7jjwh0RqsEXThE44Ukyp7pokMyEoE6nA4lN00jghz8LME');
var button = document.getElementById('donate-button');
var amount = document.getElementById('amount-input');
var currency = document.getElementById('currency-symbol');
var currencyMapper = {
	"£": "GBP",
	"$": "USD",
	"€": "EUR",
	"₹": "INR"
}
var minimums = {
	"GBP": 2,
	"USD": 2.5,
	"INR": 190,
	"EUR": 2.25,
}
var recommended = {
	"GBP": 10,
	"USD": 15,
	"INR": 300,
	"EUR": 12,
}
// var email = document.getElementById('email-input');
// var acceptUpdates = document.getElementById('accept-updates');

currency.addEventListener('change', function(e) {
    e.preventDefault();
    console.log("Currency changed. Updating recommended donation.");
    amount.value = recommended[currencyMapper[currency.value]];
});

// set up event listener for button which creates post request when donate button is clicked
button.addEventListener('click', function(e) {

e.preventDefault();
var currencySymbol = currencyMapper[currency.value];
// check that the form is filled out properly
if(amount.value < minimums[currencySymbol]){
    // If the user enters less than 2 pounds, show some text to alert them that they should increase their donation.
    // Also show an option to get the book for free.
    console.log('Amount less than minimum')
    document.getElementById('donation-amount-helper-text').id = 'show-donation-amount-helper-text';
    return
}
// else if(!checkEmail(email.value)){
//     console.log("invalid email")
//     document.getElementById('email-helper-text').id = 'show-email-helper-text';
//     return
// }
else{
    console.log(currency.value);
    console.log(currencyMapper[currency.value]);
    fetch('/create-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: amount.value * 100,
            currency: currencySymbol
            // email: email.value,
            // allowsUpdates: acceptUpdates.checked
        }),
        })
        .then((response) => response.json())
        .then((session) => {
            stripe.redirectToCheckout({
                sessionId: session.id
                // metadata={
                //     allowsUpdates: acceptUpdates.checked,
                // }
            });
            
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }
});

// function checkEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }
