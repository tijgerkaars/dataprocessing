/**
Jobber Bekkers
10543988

Data source = http://databank.worldbank.org/data/reports.aspx?source=education-statistics-~-all-indicators#

python -m SimpleHTTPServer 8888 &
http://localhost:8888/.

als je op een land klikt wordt in de command promt het object dat bij dat land hoort geprint,
als er op een land geklikt word wordt het svg element waar de piechart zou moeten komen verwijderd en en nieuwe aangemaakt
als je een box checked worden de anderen uitgezet en word de data die je krijgt als je op een land klikt aangepast


**/
window.onload = function() {
  var set = "SE.ADT.LITR.ZS"
  box = d3.selectAll("input")
    .on("click", function(d) {
      set = this.id
      d3.selectAll("input").each(function(d){
        if (d3.select(this).attr("id") != set){
          d3.select(this).node().checked = false;
        }
      })
        .attr("checked", "false")
    })
  d3.json("/Homework/D3LinkedViews/data.json", function(data){
    var height = 300,
        width = height * 2,
        fill = "black";
    var selected;
    var map = new Datamap({element: document.getElementById('container'),
    })
    d3.select("body").select("div")[0][0].style.height = height +  "px"
    d3.select("body").select("div")[0][0].style.width = width + "px"


    d3.select("body").select("div").select("svg")
      .attr("height", height)
      .attr("width", width)
    var country = d3.select("svg").selectAll("path")
    for (var i = 0; i < 1; i++){
      var code = country.filter(function(d,i){
        if (d3.select(this).classed(data[i])) {
          return d3.select(this);
        }
        else {
          fill = "black"
        }
      })
      code.on("click", function(k) {
        d3.selectAll("#pie").select("svg").remove();
        d3.selectAll("#pie").select("text").remove();
        selected = k
        var color = d3.scale.category20();
        var new_data,
            circle_width = width/3,
            circle_height = height/3,
            radius = Math.min(circle_width, circle_height) / 2;

        for (var h = 0; h < data.length; h++) {
          if (data[h].CountryCode == k.id && data[h].SeriesCode == set) {
            new_data = data[h]
          }
        }

        pie_slice = 2*Math.PI
        color = ["red", "lightgreen"]

        if (new_data.data == "..") {
          new_data.data = 0
          color[0] = "lightgrey"
        }

        var arc = d3.svg.arc()
            .outerRadius(radius-10)
            .innerRadius(0)
            .startAngle((Number(new_data.data))/100 * pie_slice)
            .endAngle(pie_slice)

        var slice = d3.svg.arc()
            .outerRadius(radius-10)
            .innerRadius(0)
            .startAngle(0)
            .endAngle((Number(new_data.data))/100 * pie_slice)
        console.log(new_data)
        if (new_data.data == "..") {
          new_data.data = 0
        }

        var labelArc = d3.svg.arc()
            .outerRadius(radius-40)
            .innerRadius(radius-40);
        var svg = d3.selectAll("#pie").append("svg")
            .attr("width", circle_width)
            .attr("height", circle_height)
          .append("g")
            .attr("transform", "translate(" + circle_width/2 + "," + circle_height/2 + ")");
        var g = svg.append("path")
              .attr("class", "arc")
              .attr("d", arc)
              .style("fill", color[0])
              .style("opacity", "0.8")
        var gg = svg.append("path")
              .attr("class", "arc")
              .attr("d", slice)
              .style("fill", color[1])
              .style("opacity", "1")
        legend = d3.selectAll("#pie")
        legend.append("text")
            .attr("x", circle_width/2 + "px")
            .attr("y", circle_height + "px")
            .text(data.SeriesName)
      })
    }
  })
}
