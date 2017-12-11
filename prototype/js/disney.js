

DisneyVis = function(_parentElement, _data ){
    this.parentElement = _parentElement;
    this.data = _data;
    this.initVis();
    console.log(this.data);
};

/*
 * Data wrangling
 */

DisneyVis.prototype.wrangleData = function(){
    var vis = this;

    this.displayData = this.data;

    // Update the visualization
    vis.updateVis();
};

var formatPercent = d3.format(".0%");

DisneyVis.prototype.initVis = function(){
    var vis = this;

    vis. width_disney = 1250;
    vis.height_disney = 500;

    vis. radius =4;
    vis. disneytop =130;
    vis. disneyleft = 10;
    vis. disneypadding = 12;

    vis. color_orange = ["#EFE0E0", "#FFF2ED","#FFDDD0", "#FFC9B4", "#FFBEA5", "#FFA988", "#FF956C","#FF8A5D"];
    // vis. color_blue = ["#62ABFD","#7EB5F7","#9AC0F1","#B6CAEB","#D2D5E5"];
    vis. blue=["#D2D5E5","#B6CAEB", "#9DC5EA", "#85C1E9","#5DADE2", "#3498DB" ,"#2E86C1","#2874A6"];



// append svg to the block
    vis. svg_filmdata = d3.select('#disney').append("svg")
        .attr("width",vis.width_disney)
        .attr("height",vis.height_disney);

// add tool tip for movie names and percentage
    vis. tool_tip_disney = d3.tip()
        .attr("class", "d3-tip")
        .attr("font-size",10)
        .offset([100, 80])
        .style("opacity", .5)
        .html(function(d) {
            return "Name:"+d.title +"<br>"+"Female Dialogue: " + Math.round(d.female_per * 100)+"%"+"</br>"+"Male Dialogue: " + Math.round(d.male_per*100)+"%"+"<br>"
        });

    vis.svg_filmdata.call(vis.tool_tip_disney);

    vis.wrangleData();
};


DisneyVis.prototype.updateVis = function() {
    var vis = this;
    vis.width_rec = 79 * vis.disneypadding + 2 * vis.radius;

    // scale for male
    vis. xscale_male =d3.scaleLinear()
        .range([0, vis.width_rec *0.42,vis.width_rec*0.77, vis.width_rec*0.85 ])
        .domain([1, 0.8, 0.6, 0.5]);
    // sccale for female
    vis. xscale_female = d3.scaleLinear()
        .range([0,vis.width_rec*0.08, vis.width_rec*0.15 ])
        .domain([0.5, 0.6, 1]);

    //add axis for female
    vis. xAxis = d3.axisTop()
        .scale(vis.xscale_female)
        .tickValues([0.5, 0.6, 1])
        .tickFormat(formatPercent);
    vis.svg_filmdata.append("g")
        .attr("class","axis1 x-axis")
        .attr("transform","translate("+(vis.width_rec * 0.85 + vis.radius + vis.disneyleft) +","+130+")")
        .call(vis.xAxis);
    vis.svg_filmdata.append("text")
        .attr("class", "label_right")
        .attr("fill", "black")
        .attr("x", vis.width_rec + vis.disneyleft)
        .attr("y", 95)
        .attr("font-size",18)
        .style("text-anchor", "end")
        .text("Words for Actress");

    //add axis for male
    vis. xAxis_left = d3.axisTop()
        .scale(vis.xscale_male)
        .tickValues([1, 0.8, 0.6, 0.5])
        .tickFormat(formatPercent);
    vis.svg_filmdata.append("g")
        .attr("class","axis1 x-axis")
        .attr("transform","translate("+ (vis.radius+ vis.disneyleft) +","+130+")")
        .call(vis.xAxis_left);
    vis.svg_filmdata.append("text")
        .attr("class", "label_left")
        .attr("fill", "black")
        .attr("x", vis.width_rec/4 + 300)
        .attr("y", 90)
        .attr("font-size",18)
        .style("text-anchor", "end")
        .text("Words for Actor");


    //append circles
    vis.svg_filmdata.selectAll("circle")
        .data(vis.data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .on("mouseover", handleMouseOver)  //vis.tool_tip_disney.show,
        .on("mouseout", handleMouseOut
            )//vis.tool_tip_disney.hide
        .style("fill", function (d,i) {
            var index_;
            if (i % 25 ==0) {index_ = (i / 25) + 1}
            else{ index_=Math.ceil(i/25) }
            if (index_ < 40) {
                return vis.blue[7]}
            else if (index_ < 50) {
                return vis.blue[6]}
            else if (index_ < 54) {
                return vis.blue[5]}
            else if (index_ < 56) {
                return vis.blue[4]}
            else if (index_ < 58) {
                return vis.blue[3]}
            else if (index_ < 62) {
                return vis.blue[2]}
            else if (index_ < 65) {
                return vis.blue[1]}
            else if (index_ < 69) {
                return vis.blue[0]}
            else if (index_ < 70) {
                return vis.color_orange[0]}
            else if (index_ < 71) {
                return vis.color_orange[2]}
            else if (index_ < 72) {
                return vis.color_orange[3]}
            else if (index_ < 74) {
                return vis.color_orange[4]}
            else if (index_ < 77) {
                return vis.color_orange[5]}
            else {return vis.color_orange[6] }
        })
        .attr("r", vis.radius)
        .attr("cy",function (d,index) {
            // console.log(index);
            if (index % 25 ==0){
                return vis.disneypadding * 25 + vis.disneytop;
            }
            else{
                return vis.disneypadding*(index % 25) + vis.disneytop;
            }}
        )
        .attr("cx", function(d, index) {
                if (index % 25 ==0){
                    return ((index/25)+1) * vis.disneypadding + vis.disneyleft;
                }
                else{
                    return (Math.ceil(index/25)) * vis.disneypadding + vis.disneyleft }
            }
        );


//////////////////////////////Pie//////////////////////////////////
    var svg1 = d3.select('body')
        .append('svg')
        .attr("width",300)
        .attr("height",200);
    var radius = 70;
    // .attr({ width: 500, height: 200 });
    // Create Event Handlers for mouse
    var svg_reveal = d3.select('#pie').append("svg")
        .attr("width",300)
        .attr("height",300);

    function handleMouseOver(d,i) {
        ////pie and its text////
        var data = [{"percent":d.female_per, "gender":"f"},{"percent":d.male_per, "gender":"m"}];
        var pie = d3.pie()
            .value(function(d) { return d.percent; })(data);
        var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);
        var g = svg_reveal.selectAll("arc")
            .data(pie)
            .enter().append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + 100 + "," + 200 + ")");
        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) {
                if(d.data.gender =="f"){return "#FFD1C0";}
                else return "#AED6F1";
            });
        document.getElementById("disney-test").innerHTML =
            "<strong>"+"Movie:"+"</strong>"+"<br>"+d.title +"<br>"+
            "<strong>"+"Female Words: "+"</strong>"+"<br>" + Math.round(d.female_per * 100)+"%"+"</br>"+
            "<strong>"+"Male Words: "+"</strong>"+"<br>"+ Math.round(d.male_per*100)+"%"+"<br>";

        //mouseover for the points
        // Use D3 to select element, change color and size
        d3.select(this)
             .attr("r",vis.radius * 1.8)
    }

    function handleMouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        d3.select(this)
            .attr("r",vis.radius )
        // Select text by id and then remove
        // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
    }
};
