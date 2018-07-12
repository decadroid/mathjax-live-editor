$(function() {
    $('#wmtoggler').change(function() {
        $('#ss-watermark').toggle(this.checked);
    }).change(); //ensure visible state matches initially    
});

$(function() {
    $('#textToggler').change(function() {
        $('.textmark').toggle(this.checked);
    }).change(); //ensure visible state matches initially    
});

$("#preview").on("click", function() {
    $(this).toggleClass("on");
    $("#ssimg").toggle();
});