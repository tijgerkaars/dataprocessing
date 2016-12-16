/**
Jobber Bekkers
10543988

source = http://stats.oecd.org/Index.aspx?DataSetCode=BLI

python -m SimpleHTTPServer 8888 &
http://localhost:8888/.

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
    console.log("test", data, "test end")
    var temp = [],
        min = 0,
        max = 0,
        fill = "black";
    var selected;
    var map = new Datamap({element: document.getElementById('container'),
    })
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
        console.log("###", k)
        d3.selectAll("#pie").select("svg").remove();
        selected = k
        var color = d3.scale.category20();
        console.log("code", code)
        var new_data,
            width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        for (var h = 0; h < data.length; h++) {
          if (data[h].CountryCode == k.id && data[h].SeriesCode == set) {
            new_data = data[h]
          }
        }
        console.log(new_data)

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6"]);

        var arc = d3.svg.arc()
            .outerRadius(radius-10)
            .innerRadius(0);
        var labelArc = d3.svg.arc()
            .outerRadius(radius-40)
            .innerRadius(radius-40);
        var pie = d3.layout.pie()
            .sort(null)
            .value(100)
        var svg = d3.selectAll("#pie").append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
        var g = svg.selectAll(".arc")
            .data(pie(Number(new_data.data)))
          .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", "red")
      })
    }
  })
}
