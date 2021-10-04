// var stripe = Stripe('pk_test_ihTnYmXEIexYBnKN3e8Hl9Ya00lXhCGgIA');
var stripe = Stripe('pk_live_51H4BOyHMizufl1MZOwRNxONToDtfUZCj8rCyB76QDxCLKehftkkYI7jjwh0RqsEXThE44Ukyp7pokMyEoE6nA4lN00jghz8LME');
var button = document.getElementById('download-button');
var sessionId = params.get('id');

// set up event listener for button which creates post request when donate button is clicked
button.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/protected/learn_better_at_home?id=' + sessionId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
        .catch((error) => {
        console.error('Error:', error);
        })
    });
});
