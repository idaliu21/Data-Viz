
/*
 * CountVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the actual data: perDayData
 */
var dateParser = d3.timeParse("%Y");

CountVis = function(_parentElement, _data, _MyEventHandler){
    this.parentElement = _parentElement;

    this.data = d3.nest()
        .key(function(d) { return d.year; })
        .entries(_data);

    this.data.forEach(function (d) {
        d.count = Object.keys(d.values).length;
    });

    //sort the data by year
    this.data.sort(function(a,b){
        return new Date(b.key) - new Date(a.key);
    });

    this.data.forEach(function (t) {
        t.key= dateParser(+t.key);
    });

    this.myEventHandler = _MyEventHandler;
    this.initVis();
    // console.log(this.data);
};

/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

CountVis.prototype.initVis = function(){
    var vis = this;

    vis.margin = { top: 40, right: 0, bottom: 60, left: 60 };

    vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
    vis.height = 250 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    // Scales and axes
    vis.x = d3.scaleTime()
        .range([150, vis.width-150]);    //250, -350

    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    vis.xAxis = d3.axisBottom()
        .scale(vis.x);

    vis.yAxis = d3.axisLeft()
        .scale(vis.y)
        .ticks(6);


    // Set domains
    var minMaxY= [0, d3.max(vis.data.map(function(d){ return d.count; }))];
    vis.y.domain(minMaxY);

    var minMaxX = d3.extent(vis.data.map(function(d){ return d.key; }));
    vis.x.domain(minMaxX);


    vis.svg.append("g")
        .attr("class", "x-axis axis1")
        .attr("transform", "translate(0," + vis.height + ")");

    vis.svg.append("g")
        .attr("class", "y-axis axis1")
        .attr("transform", "translate(150," + 0 + ")");    //250

    // Axis title
    vis.svg.append("text")
        .attr("x", 250)
        .attr("y", -8)
        .text("movies");


    // Append a path for the area function, so that it is later behind the brush overlay
    vis.timePath = vis.svg.append("path")
        .attr("class", "area area-time");

    // Define the D3 path generator
    vis.area = d3.area()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return vis.x(d.key);
        })
        .y0(vis.height)
        .y1(function(d) { return vis.y( d.count ); });


    // Initialize brushing component
    // vis.brush = d3.brushX()
    //     .on("brush",function(){
    //         console.log('1');
    //         // User selected specific region
    //         vis.currentBrushRegion = d3.event.selection;
    //         //     if (vis.currentBrushRegion == null) {
    //         //         // vis.currentBrushRegion=[0,0];
    //         //         console.log('2');
    //         //     }
    //         // console.log('2');
    //         // console.log(vis.currentBrushRegion);
    //         // vis.currentBrushRegion = vis.currentBrushRegion.map(vis.x.invert);
    //         // console.log('3');
    //         // console.log(vis.x.invert);
    //         // $(vis.myEventHandler).trigger("selectionChanged", vis.currentBrushRegion);
    //         // console.log(vis.currentBrushRegion);
    //         // console.log('4');
    //     }
    //     )
    //     .extent([[0,0],[vis.width,vis.height]]);


    // Append brush component here
    // vis.svg.append("g")
    //     .attr("class", "brush");


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
    vis.timePath
        .datum(vis.displayData)
        .attr("d", vis.area);


    // Call axis functions with the new domain
    vis.svg.select(".x-axis").call(vis.xAxis);
    vis.svg.select(".y-axis").call(vis.yAxis);

};