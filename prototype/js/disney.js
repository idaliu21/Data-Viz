
var width_disney = 1400,
    height_disney = 900;

var radius = 6;
var disneytop =100;
var disneyleft = 100;
var disneypadding= 16;

var color_orange = ["#EFE0E0", "#FFF2ED","#FFDDD0", "#FFC9B4", "#FFBEA5", "#FFA988", "#FF956C","#FF8A5D"];
var color_blue = ["#62ABFD","#7EB5F7","#9AC0F1","#B6CAEB","#D2D5E5"];

var formatPercent = d3.format(".0%");

var disney_data=[];
// append svg to the block
var svg_filmdata = d3.select('#disney').append("svg")
    .attr("width",width_disney)
    .attr("height",height_disney);

// add tool tip for movie names and percentage
var tool_tip_disney = d3.tip()
    .attr("class", "d3-tip")
    .attr("font-size",10)
    .offset([30, 80])
    .html(function(d) {
        return d.title +"<br>"+"female: " + Math.round(d.female_per * 100)+"%"+"</br>"+"male: " + Math.round(d.male_per*100)+"%" });
svg_filmdata.call(tool_tip_disney);

// load data for disney
d3.csv("data/disney.csv", function(csv) {
    disney_data= csv;

    disney_data.forEach(function (d) {
        d.female_per = +d.female_per;
        d.male_per= +d.male_per;
        d.year = +d.year;
    });

    //sort the data by female percentage
    disney_data.sort(function (a,b) {
        return a.female_per - b.female_per;
    });


    createVis();
    // Create visualization instances
});


function createVis() {
    console.log(disney_data);


    var width_rec = 79 * disneypadding + 2 * radius;

    // scale for male
    var xscale_male =d3.scaleLinear()
        .range([0, width_rec*0.42,width_rec*0.77, width_rec*0.85 ])
        .domain([1, 0.8, 0.6, 0.5]);
    // sccale for female
    var xscale_female =d3.scaleLinear()
        .range([0,width_rec*0.08, width_rec*0.15 ])
        .domain([0.5, 0.6, 1]);

    //add axis for female
    var xAxis = d3.axisTop()
        .scale(xscale_female)
        .tickValues([0.5, 0.6, 1])
        .tickFormat(formatPercent);
    svg_filmdata.append("g")
        .attr("class","axis x-axis")
        .attr("transform","translate("+(width_rec * 0.85 + radius +disneyleft) +","+80+")")
        .call(xAxis);
    svg_filmdata.append("text")
        .attr("class", "label_right")
        .attr("fill", "black")
        .attr("x", width_rec - 30 + disneyleft)
        .attr("y", 30)
        .attr("font-size",15)
        .style("text-anchor", "end")
        .text("Words for female");

    //add axis for male
    var xAxis_left = d3.axisTop()
        .scale(xscale_male)
        .tickValues([1, 0.8, 0.6, 0.5])
        .tickFormat(formatPercent);
    svg_filmdata.append("g")
        .attr("class","axis x-axis")
        .attr("transform","translate("+ (radius+disneyleft) +","+80+")")
        .call(xAxis_left);
    svg_filmdata.append("text")
        .attr("class", "label_left")
        .attr("fill", "black")
        .attr("x", width_rec/4 +100)
        .attr("y", 30)
        .attr("font-size",15)
        .style("text-anchor", "end")
        .text("Words for male");


    //append circles
    svg_filmdata.selectAll("circle")
        .data(disney_data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        // .attr("fill", function (d) {
        //     if (d.female_per>0.5){
        //         return "red";
        //     }
        //     else{
        //         return "blue";
        //     }
        //     // "url(#gradient)")
        // })
        .attr("r", radius)
        .on("mouseover", tool_tip_disney.show)
        .on("mouseout", tool_tip_disney.hide)
        .style("fill", function (d,i) {
            var index_;
            if (i % 25 ==0) {index_ = (i / 25) + 1}
            else{ index_=Math.ceil(i/25) }
            // return "rgb("+0+","+(255-index_*3)+", " + (255-index_*3) + ")"
            if (index_ < 50) {
                return color_blue[0]}
            else if (index_ < 58) {
                return color_blue[1]}
            else if (index_ < 62) {
                return color_blue[2]}
            else if (index_ < 65) {
                return color_blue[3]}
            else if (index_ < 68) {
                return color_blue[4]}

            else if (index_ < 70) {
                return color_orange[0]}
            else if (index_ < 72) {
                return color_orange[2]}
            else if (index_ < 74) {
                return color_orange[3]}
            else if (index_ < 76) {
                return color_orange[4]}
            else {return color_orange[5] }
        })
        .attr("cy",function (d,index) {
            // console.log(index);
            if (index % 25 ==0){
                return disneypadding * 25 + disneytop;
            }
            else{
                return disneypadding*(index % 25) + disneytop;
            }}
        )
        .attr("cx", function(d, index) {
                if (index % 25 ==0){
                    return ((index/25)+1) * disneypadding + disneyleft;
                }
                else{
                    return (Math.ceil(index/25)) * disneypadding + disneyleft }
            }
        );

    // document.getElementById("film-data").innerHTML = "Film Dialogue Broken-down by Gender";


}
