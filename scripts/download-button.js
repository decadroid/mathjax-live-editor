$(".download").bind("click", window.takeScreenShot = function() {
    function updateImage() {
        html2canvas(Ss1, {
            dpi: 300,
            onrendered: function(canvas) {
                var screenshot = canvas.toDataURL("image/png");
                download(screenshot, "mytext.png", "image/png");
            }
        });
    };

    function edValueKeyPress() {
        textInput.innerText = divPreview.value || '';
        updateImage();
    }
    updateImage();
});

$(".download").bind("click", function(e) {
    var download = $('.mydownload'),
        meter = $('.meter');
    download.toggleClass('is-active');

    setTimeout(function() {
        meter.toggleClass('is-done');
    }, 1000);

    setTimeout(function() {
        download.removeClass('is-active');
        meter.removeClass('is-done');
    }, 2000);

    e.preventDefault();
    e.stopPropagation();
});

/* $('#reset').on('click', function() {
  download.removeClass('is-active');
  meter.removeClass('is-done');
}); */
