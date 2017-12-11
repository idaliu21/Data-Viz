
/*
 * CountVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the actual data: perDayData
 */
var dateParser = d3.timeParse("%Y");
var formatTime = d3.timeFormat("%Y");
var bisectDate = d3.bisector(function(d) { return d.key; }).left;
var formatPercent = d3.format(".0%");

CountVis = function(_parentElement, _data, _MyEventHandler){
    this.parentElement = _parentElement;

    this.data = d3.nest()
        .key(function(d) { return d.year; })
        .entries(_data);

    this.data.forEach(function (d) {
        d.count = Object.keys(d.values).length;
    });
    //get average of male / female percent
    this.data.forEach(function (d){
        var ave= function(d){
            var male = 0,
                ave;
            for(var i = 0; i <d.count;i++){
                male += d.values[i].male_per;
            }
            return male/d.count;
        };
        d.maleAve = ave(d);
    });

    //sort the data by year
    this.data.sort(function(a,b){
        return new Date(a.key) - new Date(b.key);
    });

    this.data.forEach(function (t) {
        t.key= dateParser(+t.key);
    });

    this.myEventHandler = _MyEventHandler;
    this.initVis();
    console.log(this.data);
};

/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

CountVis.prototype.initVis = function(){
    var vis = this;

    vis.margin = { top: 40, right: 0, bottom: 60, left: 0 };

    vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
    vis.height = 200 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    // Scales and axes
    vis.x = d3.scaleTime()
        .range([180, vis.width-200]);    //250, -350,  150,-150

    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    vis.xAxis = d3.axisBottom()
        .scale(vis.x);

    vis.yAxis = d3.axisLeft()
        .scale(vis.y)
        .tickValues([0.2,0.4,0.6, 0.8])
        .tickFormat(formatPercent);
        // .ticks(6);


    // Set domains
    var minMaxY= [0, d3.max(vis.data.map(function(d){ return d.maleAve; }))];  //d.count
    vis.y.domain(minMaxY);

    var minMaxX = d3.extent(vis.data.map(function(d){ return d.key; }));
    vis.x.domain(minMaxX);


    vis.svg.append("g")
        .attr("class", "x-axis axis1")
        .attr("transform", "translate(0," + vis.height + ")");

    vis.svg.append("g")
        .attr("class", "y-axis axis1")
        .attr("transform", "translate(180," + 0 + ")");    //250

    // Axis title
    vis.svg.append("text")
        .attr("x", 1600)
        .attr("y", 115)
        .text("year");
    vis.svg.append("text")
        .attr("x", 110)
        .attr("y", -8)
        .text("average percentage");
    vis.svg.append("text")
        .attr("x", 750)
        .attr("y", 180)
        .attr("font-size",18)
        .text("Male and Female Average Words");

    // Append a path for the area function, so that it is later behind the brush overlay
    vis.timePathup = vis.svg.append("path")
        .attr("class", "areaup area-time");
    vis.timePath = vis.svg.append("path")
        .attr("class", "area area-time");


    // Define the D3 path generator
    vis.areaup = d3.area()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return vis.x(d.key);
        })
        .y0(0)
        .y1(function(d) { return vis.y( d.maleAve ); });  //d.count
    vis.area = d3.area()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return vis.x(d.key);
        })
        .y0(vis.height)
        .y1(function(d) { return vis.y( d.maleAve ); });  //d.count


    // (Filter, aggregate, modify data)
    vis.wrangleData();
};

/*
 * Data wrangling
 */

CountVis.prototype.wrangleData = function(){
    var vis = this;

    this.displayData = this.data;

    // Update the visualization
    vis.updateVis();
};



/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

CountVis.prototype.updateVis = function(){
    var vis = this;

    // Call brush component here
    // vis.svg
    //     .call(vis.brush);

    // Call the area function and update the path
    // D3 uses each data point and passes it to the area function.
    // The area function translates the data into positions on the path in the SVG.
    vis.timePathup
        .datum(vis.displayData)
        .attr("d", vis.areaup);

    vis.timePath
        .datum(vis.displayData)
        .attr("d", vis.area);

    // Call axis functions with the new domain
    vis.svg.select(".x-axis").call(vis.xAxis);
    vis.svg.select(".y-axis").call(vis.yAxis);

    ////////////////////////////////////////////////////////////////
    vis.focus = vis.svg.append("g")
        .style("display","none");
    // append the x line
    vis.focus.append("line")
        .attr("class", "x")
        .style("stroke", "#30547d")
        // .style("stroke-dasharray", "8,3")
        .attr("y1", 100)
        .attr("y2", vis.height); //vis.height

    // append the rectangle to capture mouse               // **********
    vis.svg.append("rect")                                     // **********
        .attr("width", vis.width)                              // **********
        .attr("height", vis.height)                            // **********
        .style("fill", "none")                             // **********
        .style("pointer-events", "all")                    // **********
        .on("mouseover", function() { vis.focus.style("display", null); })
        .on("mouseout", function() { vis.focus.style("display", "none"); })
        .on("mousemove", mousemove);                       // **********
// place the value at the intersection
    vis.focus.append("text")
        .attr("class", "y1")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        // .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    vis.focus.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");
// place the date at the intersection
    vis.focus.append("text")
        .attr("class", "y3")
        .style("stroke", "white")
        .style("stroke-width", "2px")
        // .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "0.6em");
    vis.focus.append("text")
        .attr("class", "y4")
        .attr("dx", 8)
        .attr("dy", "0.6em");
    // place the date at the intersection
    vis.focus.append("text")
        .attr("class", "y5")
        .style("stroke", "white")
        .style("stroke-width", "2px")
        // .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "1.5em");
    vis.focus.append("text")
        .attr("class", "y6")
        .attr("dx", 8)
        .attr("dy", "1.5em");
// append the rectangle to capture mouse
    vis.svg.append("rect")
        .attr("width", vis.width)
        .attr("height", vis.height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { vis.focus.style("display", null); })    //moseover show all, null-visible ; block - useful
        .on("mouseout", function() { vis.focus.style("display", "none"); })    //mouseout, disappear
        .on("mousemove", mousemove);
//
    function mousemove() {
        var x0 = vis.x.invert(d3.mouse(this)[0] - vis.margin.left),              // position of the mouse of x.   xScale.invert - daytime object convert into the pixel,
            i = bisectDate(vis.displayData, x0, 1),                   //  x0- actual daytime object,
            d0 = vis.displayData[i - 1],                              // *
            d1 = vis.displayData[i],                                  //
            d = x0 - d0.key > d1.key - x0 ? d1 : d0;     // compare the distance, if d1 is higher, choose d1, otherwise d0

        vis.focus.select("text.y1")
            .attr("transform",
                "translate("  + (vis.x(vis.displayData[i].key) + vis.margin.left )+  "," +
                (vis.y(vis.displayData[i].maleAve)+ vis.margin.top)+ ")")
            .text("Year: "+formatTime(d.key) );

        vis.focus.select("text.y2")
            .attr("transform",
                "translate("  + (vis.x(vis.displayData[i].key) + vis.margin.left )+ "," +
                (vis.y(vis.displayData[i].maleAve)+ vis.margin.top) + ")")
            .text("Year: "+formatTime(d.key) );

        vis.focus.select("text.y3")
            .attr("transform",
                "translate("  + (vis.x(vis.displayData[i].key) + vis.margin.left )+ "," +
                (vis.y(vis.displayData[i].maleAve)+ vis.margin.top +10 ) + ")")
            .text("Average Male Words: "+Math.round(d.maleAve * 100)+"%");

        vis.focus.select("text.y4")
            .attr("transform",
                "translate("  + (vis.x(vis.displayData[i].key) + vis.margin.left )+ "," +
                (vis.y(vis.displayData[i].maleAve)+ vis.margin.top +10 ) + ")")
            .text("Average Male Words: "+Math.round(d.maleAve * 100)+"%");

        vis.focus.select("text.y5")
            .attr("transform",
                "translate("  + (vis.x(vis.displayData[i].key) + vis.margin.left )+ "," +
                (vis.y(vis.displayData[i].maleAve)+ vis.margin.top +10 ) + ")")
            .text("Average Female Words: "+Math.round((1-d.maleAve) * 100)+"%");

        vis.focus.select("text.y6")
            .attr("transform",
                "translate("  + (vis.x(vis.displayData[i].key) + vis.margin.left )+ "," +
                (vis.y(vis.displayData[i].maleAve)+ vis.margin.top +10 ) + ")")
            .text("Average Female Words: "+Math.round((1-d.maleAve) * 100)+"%");

        vis.focus.select(".x")
            .attr("transform",
                "translate("  + (vis.x(vis.displayData[i].key) + vis.margin.left )+  "," + vis.y(vis.displayData[i].maleAve) + " )")
            .attr("y2", vis.height - vis.x(vis.displayData[i].maleAve));

    }


};



