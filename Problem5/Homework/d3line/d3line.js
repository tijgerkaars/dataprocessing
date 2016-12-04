/**
python -m SimpleHTTPServer 8888 &
http://localhost:8888/.
**/
window.onload = function() {
  d3.json("data.json", function(error, data) {

    var width = 1000,
        height = 300;

    console.log(data)

    // add margins to the graph
    var margin = {top: 20, right: 50, bottom: 10, left: 50},
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;
    // calculate the actual bar width
    barWidth = width/data.length
    // creat a canvas for the chart
    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // the vertical scaling
    var y = d3.scale.linear()
        .range([height, 0]);
    // the horizontal scaling
    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, data.length]);

    var counter = 0
    for (var i = 0; i < data.length; i++){
      var place = 0
      if (counter == 0){
        place = data[i].length[0]
      }
      if (data[i] == place){

      }
    }


  })
}
