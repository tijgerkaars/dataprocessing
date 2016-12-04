/**
Jobber Bekkers
10543988

only Sierra Leone and Mozambique are recognized.
their color is being scaled.

create a choropleth map of the world

**/
window.onload = function() {
  d3.json("Data.json", function(error, data){
    var temp = [],
        min = 0,
        max = 0,
        fill = "black";
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
      if (data[keys[i]][1] > max || max == 0){
        max = data[keys[i]][1]
      }
      if (data[keys[i]][1] < min || min == 0) {
        min = data[keys[i]][1]
      }
      temp.push(data[keys[i]])
    }
    console.log(min, max)
    data = temp
    var colorScale = ["#e5f5e0", "#31a354"],
        color = d3.scale.linear()
                  .domain([min, max])
                  .range(colorScale)
    var map = new Datamap({element: document.getElementById('container'),
    })
    var country = d3.select("svg").selectAll("path")
    for (var i = 0; i < data.length; i++){
      var code = country.filter(function(d,i){
        if (d3.select(this).classed(data[i][0])) {
          return d3.select(this);
        }
        else {
          fill = "black"
        }
      })
      fill = color(data[i][1])
      code.style("fill", fill)
    }
  })
}
