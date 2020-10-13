var imageNr = 0;
var finished = new Array();

function createImageLayer() {
  var img = new Image();
  img.style.position = "absolute";
  img.style.zIndex = -1;
  img.onload = imageOnload;
  img.src = "http://192.168.0.107:8081?action=snapshot&n=" + (++imageNr);
  var webcam = document.getElementById("webcam");
  webcam.insertBefore(img, webcam.firstChild);
}

function imageOnload() {
  this.style.zIndex = imageNr;
  while (1 < finished.length) {
    var del = finished.shift();
    del.parentNode.removeChild(del);
  }
  finished.push(this);
  createImageLayer();
}