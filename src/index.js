// sets canvas size based on given width and height (as fraction of viewport size)
function setCanvasSize(widthFraction, heightFraction, cellSize) {
    let canvas = document.getElementById("canvas");

    canvas.width = Number(window.innerWidth / cellSize) * cellSize;
    canvas.height = Number(window.innerWidth / cellSize) * cellSize;
}