const myCanvas = document.getElementById('myCanvas')
let isMouseDown = false;
let lastX, lastY;

myCanvas.addEventListener('mouseup',    () => { isMouseDown = false });
myCanvas.addEventListener('mouseleave', () => { isMouseDown = false });
myCanvas.addEventListener('mousedown',  () => { isMouseDown = true  });
myCanvas.addEventListener('mousemove',   e => {
  const x = e.pageX - myCanvas.offsetLeft;
  const y = e.pageY - myCanvas.offsetTop;

  if (isMouseDown) {
    const ctx = myCanvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = document.querySelector('input:checked').id; // color
    ctx.lineWidth = 9;
    ctx.lineJoin = 'round';
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }

  lastX = x;
  lastY = y;
});

function clearCanvas () {
  const ctx = myCanvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function downloadCanvas () {
  myCanvas.toBlob(blob => {
    FileSaver.saveAs(blob, 'image.png');
  }, 'image/png');
}
