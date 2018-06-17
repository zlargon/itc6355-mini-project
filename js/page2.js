const myCanvas = document.getElementById('myCanvas')
let isMouseDown = false;
let lastX, lastY;

myCanvas.addEventListener('mouseup', () => { isMouseDown = false });
myCanvas.addEventListener('mouseleave', () => { isMouseDown = false });

myCanvas.addEventListener('mousedown', e => {
  isMouseDown = true;
  lastX = e.pageX - myCanvas.offsetLeft;
  lastY = e.pageY - myCanvas.offsetTop;
});

myCanvas.addEventListener('mousemove', e => {
  if (isMouseDown) {
    const ctx = myCanvas.getContext('2d');
    const color = document.querySelector('input[name="color"]:checked').value;

    const x = e.pageX - myCanvas.offsetLeft;
    const y = e.pageY - myCanvas.offsetTop;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 9;
    ctx.lineJoin = 'round';
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();

    lastX = x;
    lastY = y;
  }
});

function clearCanvas () {
  const ctx = myCanvas.getContext('2d');
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function downloadCanvas () {
  html2canvas(myCanvas, {
    background: 'white',
    onrendered: function (canvas) {
      const imgData = canvas.toDataURL('image/jpeg');

      fetch(imgData)
        .then(res => res.blob())
        .then(blob => {
          saveAs(blob, "image.jpg");
        })
    }
  });
}
