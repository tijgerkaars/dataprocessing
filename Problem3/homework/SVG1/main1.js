/* use this to test out your function */
window.onload = function() {
 	changeColor("be", "yellow");
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
  console.log(id)
  id.style.fill = color
}
