
var loading = function(e) {
  e.preventDefault();
  e.stopPropagation();
  e.target.classList.add('loading');
  e.target.setAttribute('disabled','disabled');
  setTimeout(function(){
    e.target.classList.remove('loading');
    e.target.removeAttribute('disabled');
  },1000);
};

var btns = document.querySelectorAll('#download');
for (var i=btns.length-1;i>=0;i--) {
  btns[i].addEventListener('click',loading);
}

window.takeScreenShot = function() {
  function updateImage() {
    html2canvas(Ss1, {
      dpi: 300,
      onrendered: function(canvas) {
        var screenshot = canvas.toDataURL("image/png");
        download(screenshot, "mytext", "image/png");
       } 
    });
  };
  function edValueKeyPress() {
    textInput.innerText = divPreview.value || '';
    updateImage();
  }
 updateImage();
} 