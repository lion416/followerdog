paypal.Button.render({
    
        env: 'sandbox', // sandbox | production

        style: {
            size: 'small',
            color: 'gold',
            shape: 'rect',
            label: 'checkout'
        },
    
        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        client: {
            sandbox: 'AUCXmb3KqLDl7Z9U5jJlhLytqGuxB8244P5YbDYJGGOuob2ldQnB6xuU1mPdTI7wdnVa_0Acyl06JSSC'
        },
    
        // Show the buyer a 'Pay Now' button in the checkout flow
        commit: true,
    
        // payment() is called when the button is clicked
        payment: function(data, actions) {
            var userId = my_cookie2("genel", "user_id");
            var option = $('#selectPlan').find(":selected").val();
            var price;
            var quantity;
            switch(option) {
                case '1': 
                    price = 5.99;
                    quantity = 1;
                    break;
                case '2':
                    price = 5.49;
                    quantity = 3;
                    break;
                case '3':
                    price = 4.99;
                    quantity = 6;
                    break;
                case '4':
                    price = 4.19;
                    quantity = 12;
            }
            var total = price * quantity;
            // Make a call to the REST api to create the payment
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            custom: userId + '_' + price.toString() + '_' + quantity.toString(),
                            amount: { total: total.toString(), currency: 'USD' }
                        }
                    ]
                },
                experience: {
                    input_fields: {
                        no_shipping: 1
                    }
                }
            });
        },
        // onAuthorize() is called when the buyer approves the payment
        onAuthorize: function(data, actions) {
    
            // Make a call to the REST api to execute the payment
            return actions.payment.execute().then(function() {
                var option = $('#selectPlan').find(":selected").val();
                var price;
                var quantity;
                switch(option) {
                    case '1': 
                        price = 5.99;
                        quantity = 1;
                        break;
                    case '2':
                        price = 5.49;
                        quantity = 3;
                        break;
                    case '3':
                        price = 4.99;
                        quantity = 6;
                        break;
                    case '4':
                        price = 4.19;
                        quantity = 12;
                }
                var e = my_cookie2("genel", "user_id"),
                    t = my_cookie2(e, "username");
                $.ajax({
                    url: "https://71fb0ee2.ngrok.io/payment",
                    data: {
                        userid: e,
                        username: t,
                        payment: quantity
                    },
                    method: "POST",
                    dataType: "json"
                }).done(function(t) {
                    "success" == t.result ? (0 == t.reward ? $("#input_email_div").removeClass("hide") : 1 == t.reward && $("#input_email_div").addClass("hide"), my_cookie2(e, "left_time", t.left_time), $("#time_left").val(moment.duration(parseInt(t.left_time)).humanize()), $("#license-expired-msg").addClass("hide")) : (0 == t.reward ? $("#input_email_div").removeClass("hide") : 1 == t.reward && $("#input_email_div").addClass("hide"), my_cookie2(e, "left_time", 0), $("#time_left").val("Expired, please renew."), $("#license-expired-msg").removeClass("hide"))
                })
                window.alert('Payment Complete! Please allow a few minutes for payment to get processed.');
            });
        }
    
    }, '#paypal-button-container');