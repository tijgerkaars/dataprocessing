/* use this to test out your function */
window.onload = function() {
  var text = {"Brazil": ["BRA", "92.5868072509766"], "Afghanistan": ["AFG", "38.168041229248"], "Madagascar": ["MDG", "64.6563034057617"], "Bangladesh": ["BGD", "61.4938316345215"], "Bhutan": ["BTN", "63.9068183898926"], "Nepal": ["NPL", "64.6636428833008"], "Cambodia": ["KHM", "78.3459396362305"], "Armenia": ["ARM", "99.7684173583984"], "Ethiopia": ["ETH", "49.0315208435059"], "Rwanda": ["RWA", "71.2434997558594"], "Peru": ["PER", "94.3743515014648"], "Nigeria": ["NGA", "59.5680809020996"], "Bolivia": ["BOL", "95.1419219970703"], "Cameroon": ["CMR", "74.9855804443359"], "Burkina Faso": ["BFA", "37.7467002868652"], "Ecuador": ["ECU", "94.5154724121094"], "Benin": ["BEN", "38.4471397399902"], "Ghana": ["GHA", "76.5758972167969"], "El Salvador": ["SLV", "87.6482162475586"], "Togo": ["TGO", "66.5375900268555"], "Guatemala": ["GTM", "79.0742111206055"], "China": ["CHN", "96.3574523925781"], "Chile": ["CHL", "96.6275482177734"], "Dominican Republic": ["DOM", "92.4654235839844"], "Tanzania": ["TZA", "80.3594970703125"], "Uganda": ["UGA", "73.8098373413086"], "Philippines": ["PHL", "96.6180267333984"], "Indonesia": ["IDN", "95.4376831054688"], "Paraguay": ["PRY", "95.5361099243164"], "Vietnam": ["VNM", "94.5142669677734"], "Mongolia": ["MNG", "98.3676376342773"], "Haiti": ["HTI", "60.6893501281738"], "Pakistan": ["PAK", "56.4403114318848"], "Morocco": ["MAR", "71.7105484008789"], "Honduras": ["HND", "88.4245834350586"], "Egypt, Arab Rep.": ["EGY", "75.8426208496094"], "Myanmar": ["MMR", "93.0900497436523"], "Mexico": ["MEX", "94.5455932617188"], "Congo, Dem. Rep.": ["ZAR", "77.2216720581055"], "India": ["IND", "72.2253036499023"], "Azerbaijan": ["AZE", "99.8052597045898"], "Senegal": ["SEN", "55.6248512268066"], "Colombia": ["COL", "94.5770568847656"], "Kyrgyz Republic": ["KGZ", "99.5013198852539"], "Sri Lanka": ["LKA", "92.6141662597656"], "Kenya": ["KEN", "78.0233993530273"], "Niger": ["NER", "19.1026000976563"], "Nicaragua": ["NIC", "82.4718475341797"]}
 	changeColor(text, "yellow");
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
  console.log(id);
  for (var country in id) {
    console.log(country, ": ", id[country])
    //console.log(document.getElementById(country[0]))
    //.style.fill = color
  }

}
