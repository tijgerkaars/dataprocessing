/**
http://bl.ocks.org/d3noob/b3ff6ae1c120eea654b5

python -m SimpleHTTPServer 8888 &
http://localhost:8888/.
**/
window.onload = function() {
  d3.json("data.json", function(error, data) {

    // dimensions of the graph
    var width = 1000,
        height = 300;
    // add margins to the graph
    var margin = {top: 20, right: 50, bottom: 10, left: 130, yAx: 1},
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom,
        opacitySet1 = 0.1,
        opacitySet2 = 1,
        set = 1;

    if (set = 0){
      temp = opacitySet2
      opacitySet2 = opacitySet1
      opacitySet1 = temp
    }

    // data processing
    /***/
    // variables
    var Bilt = [],
        Leeuwarden = [],
        yRange = [0,0],
        place = 0,
        formateren = d3.time.format("%d-%m-%Y");
    // formate data, get max and min points, split into two datasets(1 per location)
    for (var i = 0; i < data.length; i++) {
      data[i].dates = [data[i].dates.slice(6,8), data[i].dates.slice(4,6), data[i].dates.slice(0,4)].join("-");
      data[i].dates = formateren.parse(data[i].dates)
      // change strings to numbers
      data[i].STN = Number(data[i].STN)
      data[i].TG = Number(data[i].TG)/10
      data[i].TN = Number(data[i].TN)/10
      data[i].TX = Number(data[i].TX)/10
      // find max and min y
      if (data[i].TG > yRange[1]) {
        yRange[1] = data[i].TG
      }
      if (data[i].TN > yRange[1]) {
        yRange[1] = data[i].TN
      }
      if (data[i].TX > yRange[1]) {
        yRange[1] = data[i].TX
      }
      if (data[i].TG < yRange[0]) {
        yRange[0] = data[i].TG
      }
      if (data[i].TN < yRange[0]) {
        yRange[0] = data[i].TN
      }
      if (data[i].TX < yRange[0]) {
        yRange[0] = data[i].TX
      }
      // split data on place
      if (data[i].STN == 260){
        Bilt.push(data[i])
      }
      else if (data[i].STN = 270) {
        Leeuwarden.push(data[i])
      }
    }
    yRange = [(yRange[0] - margin.yAx), (yRange[1] + margin.yAx)]
    //console.log(Bilt, Leeuwarden)
    //console.log(yRange, Bilt[0].dates, "\n", Bilt[Bilt.length - 1])
    /***/

    // scales
    // the vertical scaling
    var y = d3.scale.linear()
        .rangeRound([height, 0])
        .domain([yRange[0] - margin.yAx, yRange[1] + margin.yAx]);
    // the horizontal scaling
    var x = d3.time.scale()
        .range([0, width])
        .domain([Bilt[0].dates, Bilt[Bilt.length-1].dates]);

    // define axes
    // x axis orientation and scal
    var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          // scale the amount of ticks to the size of the axis
          .ticks(width/(data.length/8))
    // y axis orientation and scal
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var nullLine = d3.svg.line()
    .x(function(d) { return x(d.dates);})
    .y(function(d) { return y(0);})

    // define a line
    var valueline1 = d3.svg.line()
    .x(function(d) { return x(d.dates);})
    .y(function(d) { return y(d.TN);})

    var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.dates);})
    .y(function(d) { return y(d.TG);})

    var valueline3 = d3.svg.line()
    .x(function(d) { return x(d.dates);})
    .y(function(d) { return y(d.TX);})

    var svg = d3.select("body")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")

    // creat a canvas for the chart
    var chart = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    // append the x axis to the chart
    chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(" + margin.left + "," + height + ")")
          .call(xAxis)
        // add a axis title
        .append("text")
          .attr("y", 20)
          .attr("x", width)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("@1994@");
    // append the y axis to the chart
    chart.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + margin.left + ",0)")
          .call(yAxis)
        // add a axis title
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", "0")
          .attr("dy", "-3.2em")
          .style("text-anchor", "end")
          .text("temperature in °C");

    chart.append("g")
          .attr("class", "title")
          .attr("transform", "translate(" + (width + margin.left) + "," + margin.top + ")")
        .append("text")
          .style("text-anchor", "end")
          .text("temperatures in the Netherlands in 1994")

    chart.append("g")
          .attr("class", "subTitle")
          .attr("transform", "translate(" + (width + margin.left) + "," + (margin.top + 20) + ")")
        .append("text")
          .style("text-anchor", "end")
          .text("Leeuwarden")

    chart.append("path")
          .attr("id", "0")
          .attr("class", "nullLine")
          .attr("d", nullLine(Bilt))
          .attr("transform", "translate(" + margin.left +"," + 0 + ")")
          .style("stroke", "black")
          .style("stroke", "#000")
          .style("stroke-width", "1")
          .style("shape-rendering", "crispEdges")
          .style("opacity", "0.4")

    var path = 0;
    buttonText = d3.select("button")
    buttonText[0][0].innerText = "Bilt"

    chart.append("path")
          .attr("id", "1")
          .attr("class", "line")
          .attr("d", valueline1(Bilt))
          .attr("transform", "translate(" + margin.left +"," + 0 + ")")
          .style("stroke", "Blue")
          .style("opacity", opacitySet1)
    chart.append("path")
          .attr("id", "2")
          .attr("class", "line")
          .attr("d", valueline2(Bilt))
          .attr("transform", "translate(" + margin.left +"," + 0 + ")")
          .style("stroke", "Orange")
          .style("opacity", opacitySet1)
    chart.append("path")
          .attr("id", "3")
          .attr("class", "line")
          .attr("d", valueline3(Bilt))
          .attr("transform", "translate(" + margin.left +"," + 0 + ")")
          .style("stroke", "Red")
          .style("opacity", opacitySet1)
    chart.append("path")
          .attr("id", "4")
          .attr("class", "line")
          .attr("d", valueline1(Leeuwarden))
          .attr("transform", "translate(" + margin.left +"," + 0 + ")")
          .style("stroke", "Blue")
          .style("opacity", opacitySet2)
    chart.append("path")
          .attr("id", "5")
          .attr("class", "line")
          .attr("d", valueline2(Leeuwarden))
          .attr("transform", "translate(" + margin.left +"," + 0 + ")")
          .style("stroke", "Orange")
          .style("opacity", opacitySet2)
    chart.append("path")
          .attr("id", "6")
          .attr("class", "line")
          .attr("d", valueline3(Leeuwarden))
          .attr("transform", "translate(" + margin.left +"," + 0 + ")")
          .style("stroke", "Red")
          .style("opacity", opacitySet2)

    button = d3.select("button")
        .on("click", function() {
          if (d3.selectAll("text")[0][26].innerHTML == "Leeuwarden") {
            d3.selectAll("text")[0][26].innerHTML = "Bilt"
          }
          else if (d3.selectAll("text")[0][26].innerHTML == "Bilt"){
            d3.selectAll("text")[0][26].innerHTML = "Leeuwarden"
          }
          paths = d3.selectAll("path")
          for (var i = 3; i < paths.size(); i++) {
            if (d3.select(paths[0][i]).style("opacity") == opacitySet1) {
              d3.select(paths[0][i]).style("opacity", opacitySet2)
              buttonText = d3.select("button")
              buttonText[0][0].innerText = "Bilt"
            }
            else if (d3.select(paths[0][i]).style("opacity") == opacitySet2) {
              d3.select(paths[0][i]).style("opacity", opacitySet1)
              buttonText = d3.select("button")
              buttonText[0][0].innerText = "Leeuwarden"
            }
          }
        })
      })
}
