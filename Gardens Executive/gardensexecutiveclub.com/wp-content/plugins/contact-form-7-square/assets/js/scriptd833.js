 var wpcf7Elm = document.querySelector( '.wpcf7' );
  var me;

 function wpcf7mailsent_square_payment(event){
       event.stopPropagation();
       event.stopImmediatePropagation();
       jQuery('.wpcf7-submit').removeAttr('disabled');
      
       cf7s_square_payment();
       
       wpcf7Elm.removeEventListener( 'wpcf7mailsent',wpcf7mailsent_square_payment);
   }
function cf7s_square_payment(){
    
    if (jQuery('#cf7-square-card-number').length > 0) {
       
    jQuery('.cf7_square_nonce').remove();
    
        var paymentForm = new SqPaymentForm({
            applicationId: cf7s_script.application_id,
            locationId: cf7s_script.location_id,
            inputClass: 'cf7s-input',
            inputStyles: jQuery.parseJSON(cf7s_script.payment_form_input_styles),
            cardNumber: {
                elementId: 'cf7-square-card-number',
                placeholder: cf7s_script.placeholder_card_number
            },
            cvv: {
                elementId: 'cf7-square-cvv',
                placeholder: cf7s_script.placeholder_card_cvv
            },
            expirationDate: {
                elementId: 'cf7-square-expiration-date',
                placeholder: cf7s_script.placeholder_card_expiration
            },
            postalCode: {
                elementId: 'cf7-square-postal-code',
                placeholder: cf7s_script.placeholder_card_postal_code
            },
            callbacks: {
                cardNonceResponseReceived: function (errors, nonce, cardData) {
                    if (errors) {
                        var html = '';


                        // handle errors
                        jQuery(errors).each(function (index, error) {
                            html += '<span class="wpcf7-not-valid-tip">' + error.message + '</span>';
                        });


                        // append it to DOM
                        me.closest('form').find('.cf7s_container .messages').html(html);

                        me.removeAttr('disabled');
                    } else {
                        // inject nonce to a hidden field to be submitted
                        me.closest('form').find('.cf7s_container').append('<input type="hidden" class="cf7_square_nonce" name="cf7_square_nonce" value="' + nonce + '" />');

                       // jQuery('.wpcf7-submit').removeAttr('disabled');

                        //submit form
                        me.closest('.wpcf7-form').submit();
                    }
                },
                paymentFormLoaded: function () {

                },
                unsupportedBrowserDetected: function () {

                }
            }
        });

        paymentForm.build();
        
        jQuery('.wpcf7-submit').click(function (event) {
            me = jQuery(this);
            event.stopImmediatePropagation();
            event.preventDefault();
            
            me.closest('form').find('.cf7s_container .messages').html("");
            //jQuery(this).attr('disabled', 'disabled');
            
            paymentForm.requestCardNonce();
            
            wpcf7Elm.addEventListener( 'wpcf7mailsent', wpcf7mailsent_square_payment);
                
            return false;
        });
    }
    
}
jQuery(document).ready(function (jQuery) {
    cf7s_square_payment();
});