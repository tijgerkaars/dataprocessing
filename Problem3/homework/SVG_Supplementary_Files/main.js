/* use this to test out your function */
window.onload = function() {
 	changeColor(fra, "green");
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
  id.style.fill = color
}
