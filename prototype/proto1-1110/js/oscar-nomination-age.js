var dateFormatter = d3.timeFormat("%Y");
var dateParser = d3.timeParse("%Y");
//load data
queue()
    .defer(d3.csv,("data/actor_new.csv"))
    .defer(d3.csv,("data/actress_new.csv"))
    .await(createVis);

var ageVis;
function createVis(error, Data1,Data2) {
    if (error) {
        console.log(error);
    }
    changeToNumber(Data1);
    changeToNumber(Data2);
    ageVis = new ageVis("oscar-nomination-age", Data1, Data2);
}


var changeToNumber = function(data){
    var tempFirstYear;



    data.forEach(function(element,i){
        element.First = +element.First;
        tempFirstYear=element.First;
        element.Last = +element.Last;
        element.born= +element.born;
        element.Nominations=+element.Nominations;
        element.First = element.First-element.born;
        element.Last = element.Last-element.born;
        element.born=dateParser(element.born);
        element.Date=dateParser(tempFirstYear);

    });

    data.sort(function(a,b){return a.Date-b.Date;});
    data.forEach(function(element,i){
        if (element.First>100)
            console.log(element.First+"aaa  "+element.Last+" aa "+i);
    })

}

ageVis = function(_parentElement, _data1, _data2){
    this.parentElement = _parentElement;
    this.ActorData=_data1;
    this.ActressData=_data2;
    this.data = _data1;

    var vis=this;
    this.initVis(vis.ActorData,vis.ActressData);
}


ageVis.prototype.initVis = function(ActorData,ActressData){
    var vis=this;

    console.log(this.ActorData);
    console.log(this.ActressData);
    vis.margin = {top: 100, right: 10, bottom: 350, left: 50};
    vis.width = 1000 - vis.margin.left - vis.margin.right;
    vis.height = 1000 - vis.margin.top - vis.margin.bottom;


    //create svg
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    //max and min of the axis
    vis.maxActressLast=d3.max(vis.ActressData,function(d){return d.Last});
    vis.maxDate=d3.max(vis.ActorData,function(d){return d.Date});
    vis.minDate=d3.min(vis.ActorData,function(d){return d.Date});

    //define scale
    vis.yActor = d3.scaleTime()
        .domain([vis.minDate, vis.maxDate])
        .range([vis.height,0]);


    vis.xActor = d3.scaleLinear()
        .domain([0, vis.maxActressLast])
        .range([0,vis.width/2]);

    vis.xActress = d3.scaleLinear()
        .domain([ vis.maxActressLast,0])
        .range([vis.width/2,0]);


    //define axis
    vis.xAxisActor = d3.axisBottom()
        .scale(vis.xActor)
        .ticks(10);

    vis.xAxisActress = d3.axisBottom()
        .scale(vis.xActress)
        .ticks(10);


    vis.yAxisActor= d3.axisLeft()
        .scale(vis.yActor)
        .ticks(10)
        .tickFormat(dateFormatter );




   /* vis.lineActorFirst = d3.line()
        .x(function(d) { return vis.xActor(d.First); })
        .y(function(d) { return vis.yActor(d.Date); });

    vis.lineActorLast = d3.line()
        .x(function(d) { return vis.xActor(d.Last); })
        .y(function(d) { return vis.yActor(d.Date); });*/



    vis.updateVis();

}

ageVis.prototype.updateVis = function(){
    var vis=this;

    vis.g = vis.svg.append("g")
        .attr("class", "drawcircle") ;
    vis.gLine=vis.svg.append("g")
        .attr("class", "drawline") ;


    vis.circleFirstActor=vis.g.selectAll('.drawcircle')
        .data(vis.ActorData)
        .enter()
        .append('circle')
        // .attr("clip-path", "url(#clipPath)")
        .attr("class", "circle")
        .attr('cx', function(d){
            return vis.xActor(d.First)+vis.width/2;
        })
        .attr('cy', function(d) {
            return vis.yActor(d.Date);
        })
        .attr('r', 2)
        .attr("fill","#6B9A41")
        .on("mouseover", function(d,i) {
            // console.log("mouseover1");

            vis.mouseovertext1=vis.svg.append("text")
                .attr("class","tool")
                .attr("x",vis.xActor(d.First)+vis.width/2)
                .attr("y",vis.yActor(d.Date))
                .attr("font-family", "sans-serif")
                .attr("fill", "grey")
                .attr("display","block")
                .attr("font-size","12px")
                .text(function()
                {
                    return ("First Nomination Age: "+d.First);
                });

        })
        .on("mouseout", function() {
            vis.mouseovertext1.remove();
        });

    vis.circleFirstActress=vis.g.selectAll('.drawcircle')
        .data(vis.ActressData)
        .enter()
        .append('circle')
        // .attr("clip-path", "url(#clipPath)")
        .attr("class", "circle")
        .attr('cx', function(d){
           // console.log(vis.xActress(d.First));
            return -vis.xActress(d.First)+vis.width/2;
        })
        .attr('cy', function(d) {
            return vis.yActor(d.Date);
        })
        .attr('r', 2)
        .attr("fill","#6B9A41")
        .on("mouseover", function(d,i) {
            // console.log("mouseover1");

            vis.mouseovertext1=vis.svg.append("text")
                .attr("class","tool")
                .attr("x",-vis.xActress(d.First)+vis.width/2)
                .attr("y",vis.yActor(d.Date))
                .attr("font-family", "sans-serif")
                .attr("fill", "grey")
                .attr("display","block")
                .attr("font-size","12px")
                .text(function()
                {
                    return ("First Nomination Age: "+d.First);
                });

        })
        .on("mouseout", function() {
            vis.mouseovertext1.remove();
        })
    ;



    vis.ActorData.forEach(function(d){
        vis.svg.select('.drawline')
            .append("line")
            .style("stroke", "#6B9A41")
            .attr("opacity",0.4)
            .attr("class", "line")
            .attr('x1', vis.width/2)
            .attr('x2', function(){
                return vis.xActor(d.First)+vis.width/2;
            })
            .attr('y1', function() {
                return vis.yActor(d.Date);
            })
            .attr('y2', function() {
                return vis.yActor(d.Date);
            })

    });


    vis.ActressData.forEach(function(d){
        vis.svg.select('.drawline')
            .append("line")
            .style("stroke", "#6B9A41")
            .attr("opacity",0.4)
            .attr("class", "line")
            .attr('x1',vis.width/2 )
            .attr('x2', function(){
                return (vis.width/2-vis.xActress(d.First));
            })
            .attr('y1', function() {
                return vis.yActor(d.Date);
            })
            .attr('y2', function() {
                return vis.yActor(d.Date);
            })

    });







    vis.svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate("+ (vis.width/2) +"," + (vis.height) + ")")
        .call(vis.xAxisActor);

    vis.svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate("+ (0) +"," + (vis.height) + ")")
        .call(vis.xAxisActress);

    vis.svg.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate("+ (vis.width/2) +","+(0)+")")
        .call(vis.yAxisActor);




    vis.label1=vis.svg.append("text")
        .attr("x", vis.width/2)
        .attr("y", -30)
        .text("Nomination Year")


    vis.label2=vis.svg.append("text")
        .attr("x", vis.Width/2)
        .attr("y", vis.height-10)
        .text("First Nomination Age")

    vis.label3=vis.svg.append("text")
        .attr("x", vis.Width-30)
        .attr("y", vis.height-10)
        .text("First Nomination Age")
        .attr("transform", "translate("+ (vis.width-130) +","+(0)+")");


    vis.label3=vis.svg.append("text")
        .attr("x", vis.Width-30)
        .attr("y", -30)
        .text("Actress")
        .attr("transform", "translate("+ (vis.width/2-250) +","+(0)+")");

    vis.label4=vis.svg.append("text")
        .attr("x", vis.Width-30)
        .attr("y", -30)
        .text("Actor")
        .attr("transform", "translate("+ (vis.width-250) +","+(0)+")");



}