/**

Jobber Bekkers
10543988

barchart.js
translates a dataset into a barchart.
scales x and y to fit values into a width and height
hovering over the bar changes the color
hovering over the tip shows the numerical dataset

data.json was coppied to this folder as it was being difficult

**/
window.onload = function() {
  d3.json("Data.json", function(error, data) {

    var width = 1000,
        height = 300,
        // thinner than 1.5 crashes the chart if the width entered is smaller than: (minBarWidth * data.length)
        // 1.5 gives a terrible presentation, above 3 is acceptable
        minBarWidth = 1.5;
    // ensure visible bars in the chart
    if (width/data.length < minBarWidth) {
      width = data.length * minBarWidth
    }
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
    // prepare strings to be turned into numbers
    for (var i = 0; i < data.length; i ++) {
      data[i].data = (data[i].data).trim()
    }
    //find the max
    max = 0
    for (var i = 0; i < data.length; i++) {
      // change data from /0.1mm into /1mm
      data[i].data = (Number(data[i].data))/10
      if (data[i].data > max) {
        max = data[i].data
      }
      // set data < 0 to 0
      // data < 0 is less than 0.05mm in the souce
      // zero is thus reprecentative
      else if (data[i].data < 0) {
        data[i].data = 0
      }
    }
    // give domain for vertical transformation
    y.domain([0, max])
    // create bars for all the data points
    var bar = chart.selectAll("g")
          .data(data)
          .enter().append("g")
          .attr("transform", function(d, i) { return "translate(" + (i * barWidth + margin.left) + ",0)"; });
    // create the actual bars for the data point
    bar.append("rect")
        .attr("y", function(d) { return y(d.data);})
        .attr("height", function(d) { return height - y(d.data);})
        .attr("width", width / data.length - 1)
    // add the text to the bar
    bar.append("text")
        .attr("x", (width / data.length) / 2)
        .attr("y", function(d) { return y(d.data) + 3; })
        .attr("dy", ".75em")
        // default to invicible
        .attr("opacity", 0)
        .text(function(d) { return d.data + "mm"; })
        // on hover no longer invicible
        .on("mouseover", function() {
          d3.select(this)
          .attr("opacity", 1)})
        // after hover invicible again
        .on("mouseout", function() {
          d3.select(this)
          .attr("opacity", 0)})
    // x axis orientation and scal
    var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          // scale the amount of ticks to the size of the axis
          // deviding by 16 is a magic number that seems to work
          .ticks(width/(data.length/16))
    // y axis orientation and scal
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
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
          .text("days of 1994");
    // append the y axis to the chart
    chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(" + margin.left + ",0)")
          .call(yAxis)
        // add a axis title
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", 0)
          .attr("dy", "-3.2em")
          .style("text-anchor", "end")
          .text("mm of rain");

    });

    function type(d) {
      d.data = +d.data; // coerce to number
      return d;
    }
  }
