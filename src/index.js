import './sass/style.scss'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import 'intl-tel-input/build/css/intlTelInput.css';
import 'webpack-jquery-ui'
import 'webpack-jquery-ui/css'
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js'
import intlTelInput from 'intl-tel-input';

$(function () {
var input = $("#phone");
var iti_el = $('.iti.iti--allow-dropdown.iti--separate-dial-code');

if(iti_el.length){
    iti.destroy();
}
for(var i = 0; i < input.length; i++){
    iti = intlTelInput(input[i], {
        autoHideDialCode: false,
        autoPlaceholder: "aggressive" ,
        initialCountry: "auto",
        separateDialCode: true,
        customPlaceholder:function(selectedCountryPlaceholder,selectedCountryData){
            return ''+selectedCountryPlaceholder.replace(/[0-9]/g,'X');
        },
        geoIpLookup: function(callback) {
            $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
              var countryCode = (resp && resp.country) ? resp.country : "";
              callback(countryCode);
          });
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js" // just for 
});

   
$('#phone').on("focus click countrychange", function(e, countryData) {

    var pl = $(this).attr('placeholder') + '';
    var res = pl.replace( /X/g ,'9');
    if(res != 'undefined'){
        $(this).inputmask(res, {placeholder: "X", clearMaskOnLostFocus: true});
    }
    


});
   
   $('#phone').on("focusout", function(e, countryData) {
       var intlNumber = iti.getNumber();
       console.log(intlNumber);   
   });
   
}
})

document.getElementById("year").innerHTML = new Date().getFullYear();