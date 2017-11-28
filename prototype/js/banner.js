var slider = document.getElementById("slidecontainer");
var value = slider.value;

/*var svg1 = d3.select(".banner").append("svg")
    .attr("width", 1000)
    .attr("height", 40)
    .append("g");*/


svg.append('text')
    .attr("class", "LegendLabel")
    .attr("x",0)
    .attr("y",-40)
    .attr("fill", "#4A4A4A ")
    .text("Age Distribution");


svg1.append("rect")
    .attr("x",function(d){
        return 20;
    })
    .attr("y",function(d){
        return 30;
    })
    .attr("height",40)
    .attr("width",600)
    .attr("fill", "red");



slider.oninput = function() {
    var label=svg.selectAll("#slidecontainer")
        .append('text')
        .attr("class", "LegendLabel")
        .attr("x",0)
        .attr("y",-40)
        .attr("fill", "#4A4A4A ")
        .text(value);
    label.exit().remove();
}
