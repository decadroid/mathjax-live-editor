var SS1 = document.getElementById('Ss1');
var textInput = document.getElementById('MathInput');
var divPreview = document.getElementById('MathPreview');
var ssImg = document.getElementById('ssimg');

function updateImage() {
    html2canvas(SS1, {
        dpi: 300,
        onrendered: function(canvas) {
            var data = canvas.toDataURL("image/png");
            ssImg.setAttribute("src", data);
        }
    });
};

function edValueKeyPress() {
    textInput.innerText = divPreview.value || '';
    updateImage();
}
updateImage();