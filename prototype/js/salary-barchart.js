
//************************  guess *************************


document.getElementById("guess2").onclick = function(){
    var startNum = document.getElementById("formGroupExampleInput").value;

    var options = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
    };
    var demo = new CountUp("formGroupExampleInput", startNum, 33, 0, 2.5, options);
    if (!demo.error) {
        demo.start();
    } else {
        console.error(demo.error);
    }
}





//************************  bar chart *************************

//load data
queue()
    .defer(d3.csv,("data/highest_paycheck_2013.csv"))
    .defer(d3.csv,("data/highest_paycheck_2014.csv"))
    .await(createVis);
    //.await(attachPhoto);



function createVis(error, data1, data2) {
    changeToNumber(data1);
    changeToNumber(data2);
    //console.log(data2);
    //console.log("entries: " + data.length);
    var salaryVis = new SalaryVis("salary-barchart", data1, data2);

    document.getElementById("salary2013").onclick = function(){
        //console.log(data1);
        salaryVis.data = data1;
        salaryVis.updateVis();
        //initBarChart(data1);
    }

    document.getElementById("salary2014").onclick = function(){
       // console.log(data2);
        salaryVis.data = data2;
        salaryVis.updateVis();
        //drawBarChart(data2);
    }

}

var changeToNumber = function(data){
    data.forEach(function(element){
        element.Age = +element.Age;
        element.Paycheck = +element.Paycheck;
    });
}


SalaryVis = function(_parentElement, _data1, _data2){
    this.parentElement = _parentElement;
    this.data1=_data1;
    this.data2=_data2;

    this.data = _data1;

    this.initVis();
}




SalaryVis.prototype.initVis = function(data){

    var vis = this;
    vis.data = vis.data.sort(function (a, b) {
        return b.Paycheck - a.Paycheck;
    });

    vis.margin = {top: 20, right: 10, bottom: 150, left: 50};
    vis.width = 800 - vis.margin.left - vis.margin.right;
    vis.height = 400 - vis.margin.top - vis.margin.bottom;

    //create svg
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");



    //define scale
    vis.y = d3.scaleLinear()
        .domain([0, 100])
        .range([vis.height,0]);


    vis.x = d3.scaleBand()
        .rangeRound([0,vis.width])
        .padding(0.5)
        .paddingInner(0.5);

    //define axis
    vis.xAxis = d3.axisBottom()
        .scale(vis.x);

    vis.yAxis = d3.axisLeft()
        .scale(vis.y);

    vis.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.height + ")")
        .attr("fill", "grey");

    vis.svg.append("g")
        .attr("class", "y-axis axis")
        .attr("fill", "grey");

    vis.updateVis();


}

SalaryVis.prototype.updateVis = function(){

    var vis = this;
   // console.log(vis.data);

    //get domain
    vis.names = [];
    vis.data.forEach(function(element){
        vis.names.push(element.Name)
    });

    vis.x.domain(vis.names);

    //draw bar
    var bars=vis.svg.selectAll(".sbars")
        .data(vis.data);

    bars.enter()
        .append("rect")
        .attr("class","sbars")
        .merge(bars)
        .attr("x",function(d){
            return vis.x(d.Name);
        })
        .attr("y",function(d){
            return vis.y(d.Paycheck);
        })
        .attr("height",function(d){
            return vis.height-vis.y(d.Paycheck);
        })
        .attr("width",vis.x.bandwidth())
        .attr("fill", "white");

    bars.exit().remove();

//add text
    var pays=vis.svg.selectAll(".paycheck")
        .data(vis.data);

    pays.enter().append("text")
        .merge(pays)
        .text(function(d){
            return d.Paycheck;
        })
        .attr("class","paycheck")
        .attr("text-anchor", "middle")
        .attr("x",function(d){
            return vis.x(d.Name)+vis.x.bandwidth()/2;
        })
        .attr("y",function(d){
            return vis.y(d.Paycheck)-10;
        })
        .attr("fill", "white");

    pays.exit().remove();


    vis.svg.select(".y-axis").call(vis.yAxis);

    vis.svg.select(".x-axis").call(vis.xAxis)
        .selectAll("text")
        .text(function(d,i){
            return vis.names[i];
        })
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", -vis.x.bandwidth()/2)
        .attr("transform", function(d) {
            return "rotate(-90)"
        });



}


