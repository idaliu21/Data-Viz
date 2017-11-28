var dateFormatter = d3.timeFormat("%Y");
var dateParser = d3.timeParse("%Y");
//load data
queue()
    .defer(d3.csv,("data/best_actor.csv"))
    .defer(d3.csv,("data/best_actress.csv"))
    .defer(d3.csv,("data/actor_new.csv"))
    .defer(d3.csv,("data/actress_new.csv"))
    .await(createVis);

var orange=["#FFF2ED", "#FFE2D6", "#FFD1C0", "#FFC1A9", "#FFB193", "#FFA17C", "#FF9066","#FF804F"];
var blue=["#EBF5FB", "#D6EAF8","#AED6F1", "#85C1E9","#5DADE2", "#3498DB" ,"#2E86C1","#2874A6"];
var ageVis;
function createVis(error, Data1,Data2,Data3,Data4 ) {
    if (error) {
        console.log(error);
    }
    changeToNumber(Data1);
    changeToNumber(Data2);
    changeToNumber1(Data3);
    changeToNumber1(Data4);
    ageVis = new ageVis("oscar-nomination-age", Data1, Data2,Data3,Data4);


}


var changeToNumber = function(data){



    data.forEach(function(element,i){

        element.Year=dateParser(element.Year);
        element.Age = +element.Age;
        element.No = +element.No;
        element.Name=element.Name;
        element.Movie=element.Movie;


    });


};


var changeToNumber1= function(data){


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
        element.No=element.First;

    });



    data.sort(function(a,b){return a.First-b.First;});
    data.forEach(function(element,i){
        if (element.First>100)
            console.log(element.First+"aaa  "+element.Last+" aa "+i);
    });


    var j=0,q=0;
    for(var i=0;i<data.length;i++)
    {

       if(j!=data[i].First)
       {
           q=1;
           data[i].No=q;
           j=data[i].First;
       }
       else
       {
           q++;
           data[i].No=q;
       }
    }



};


ageVis = function(_parentElement, _data1, _data2, data3,data4){
    this.parentElement = _parentElement;
    this.BestActorData=_data1;
    this.BestActressData=_data2;
    this.NominActorData=data3;
    this.NominActressData=data4;

    var vis=this;
    this.initVis(vis.BestActorData,vis.BestActressData, vis.NominActorData,vis.NominActressData);
};



ageVis.prototype.initVis = function(ActorData,ActressData,NominActorData,NominActressData){
    var vis=this;

    vis.actorData=vis.BestActorData;
    vis.actressData=vis.BestActressData;


    vis.button=0;
    document.getElementById("Best").onclick = function(){
        vis.button=0;
        vis.actorData=vis.BestActorData;
        vis.actressData=vis.BestActressData;
        vis.updateVis();
    };


    document.getElementById("Nominee").onclick = function(){
        vis.button=1;
        vis.actorData=vis.NominActorData;
        vis.actressData=vis.NominActressData;
        vis.updateVis();
    };


    vis.margin = {top: 100, right: 10, bottom: 350, left: 50};
    vis.width = 1000 - vis.margin.left - vis.margin.right;
    vis.height = 1000 - vis.margin.top - vis.margin.bottom;


    //create svg
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    vis.updateVis();
   // vis.updateVis();

    vis.svg.selectAll(".Legend1")
        .data(orange)
        .enter()
        .append('rect')
        .attr("class", "Legend1")
        .attr("x",0)
        .attr("y", function(d,i){
            return i*12-35;
        })
        .attr("width",40)
        .attr("height", 12)
        .attr("fill", function(d)
        {
            return d;
        });

    vis.svg.selectAll(".Legend2")
        .data(blue)
        .enter()
        .append('rect')
        .attr("class", "Legend1")
        .attr("x",0)
        .attr("y", function(d,i){
            return i*12-35+150;
        })
        .attr("width",40)
        .attr("height", 12)
        .attr("fill", function(d)
        {
            return d;
        });


    vis.svg.append('text')
        .attr("class", "LegendLabel")
        .attr("x",0)
        .attr("y",-40)
        .attr("fill", "#4A4A4A ")
        .text("Age Distribution");



    vis.svg.selectAll(".LegendText1")
        .data(orange)
        .enter()
        .append('text')
        .attr("class", "LegendText1")
        .attr("x",45)
        .attr("y", function(d,i){
            return i*12-35+12;
        })
        .attr("fill", "#4A4A4A ")
        .attr("font-size", "11px")
        .text(function(d,i){
            return parseInt((i+1)*10)+" - "+parseInt((i+2)*10);
        })

    vis.svg.selectAll(".LegendText2")
        .data(orange)
        .enter()
        .append('text')
        .attr("class", "LegendText2")
        .attr("x",45)
        .attr("y", function(d,i){
            return i*12-35+12+150;
        })
        .attr("fill", "#4A4A4A ")
        .attr("font-size", "11px")
        .text(function(d,i){
            return parseInt((i+1)*10)+" - "+parseInt((i+2)*10);
        })



}


ageVis.prototype.updateVis = function() {
    var vis = this;


    var rect_width=50;
    var rect_height=33;
    //the distance between rects
    var interval_width=60;
    var interval_height=35;
    var rectActor,rectActress;
    var mouseovertext1;



    //draw rects
    rectActor = vis.svg.selectAll('.rectActor')
        .data(vis.actorData);
    console.log(vis.actorData);


    rectActress = vis.svg.selectAll('.rectActress')
        .data(vis.actressData);

    vis.g = vis.svg.append("g")
        .attr("class", "tooltip") ;



    if(vis.button==0) {

        for(i=4;i<18;i++)
        {
            vis.label1=vis.svg.append("text")
                .attr("x", i*interval_width)
                .attr("y", vis.height / 2+25)
                .text(i*5+" to "+(i+1)*5);
            vis.label1.exit().remove();


        }

        rectActor
            .enter()
            .append('rect')
            .attr("class", "rectActor")
            .merge(rectActor)
            .attr('x', function (d) {
                var group = parseInt(d.Age / 5);
                var x = (group ) * interval_width;
                return x;
            })
            .attr('y', function (d) {
                var y = vis.height / 2 - d.No * interval_height;
                return y;
            })
            .attr('width', rect_width)
            .attr('height', rect_height)
            .attr("fill", function(d){
                var color=parseInt((d.Age-10)/10)
                return blue[color];
            })
            .on("mouseover", function (d) {

                mouseovertext1 = vis.g.append("text")
                    .attr("class", "tooltip")
                    .attr("x", function () {
                       var group = parseInt(d.Age / 5);
                       var x = (group ) * interval_width;
                        return x;
                    })
                    .attr("y", function () {
                       var y = vis.height / 2 - d.No * interval_height;
                        return y;
                    })
                    .attr("fill", "black")
                    .attr("display", "block")
                    .attr("stroke-width", "1px")
                    .attr("font-size", "12px")
                    .text(function () {
                        console.log(d.Name);
                        return ("Name: " + d.Name + "\ Age: " + d.Age);
                    });

            })
            .on("mouseout", function () {
                mouseovertext1.attr("display", "none");
            });


        rectActor.exit().remove();


        rectActress
            .enter()
            .append('rect')
            // .attr("clip-path", "url(#clipPath)")
            .attr("class", "rectActress")
            .merge(rectActress)
            .attr('x', function (d) {
                var group = parseInt(d.Age / 5);
                var x = (group ) * interval_width;
                return x;
            })
            .attr('y', function (d) {
                var y = vis.height / 2 + (d.No-1) * interval_height+40;
                return y;
            })
            .attr('width', rect_width)
            .attr('height', rect_height)
            .attr("fill", function(d){
                var color=parseInt((d.Age-10)/10)
                return orange[color];
            })
            .on("mouseover", function (d, i) {
                vis.mouseovertext1 = vis.svg.append("text")
                    .attr("class", "tooltip")
                    .attr("x", function () {
                        var group = parseInt(d.Age / 5);
                        var x = (group) * interval_width;
                        return x;
                    })
                    .attr("y", function () {
                        var y = vis.height / 2 +d.No * interval_height+20;
                        return y;
                    })
                    .attr("font-family", "sans-serif")
                    .attr("fill", "grey")
                    .attr("display", "block")
                    .attr("font-size", "12px")
                    .text(function () {
                        return ("Name: " + d.Name + "\ Age: " + d.Age);
                    });

            })
            .on("mouseout", function () {
                vis.mouseovertext1.remove();
            });

        rectActress.exit().remove();

    }


    if(vis.button==1)
    {

        for(i=1;i<18;i++)
        {
            vis.label1=vis.svg.append("text")
                .attr("x", i*interval_width)
                .attr("y", vis.height / 2+25)
                .text(i+" to "+(i+1));
            vis.label1.exit().remove();


        }

        rect_width=50;
        rect_height=8;
        //the distance between rects
        interval_width=60;
        interval_height=10;
        var i=0;


        rectActor
            .enter()
            .append('rect')
            .merge(rectActor)
            .attr('x', function (d) {
                var group = parseInt(d.First / 5);
                var x = (group ) * interval_width;
                return x;
            })
            .attr('y', function (d) {
                var y = vis.height / 2 - d.No * interval_height;
                return y;
            })
            .attr('width', rect_width)
            .attr('height', rect_height)
            .attr("fill", function(d){
                var color=parseInt((d.First-10)/10);
                return blue[color];
            })
          /*  .on("mouseover", function (d) {

                vis.mouseovertext1 = vis.svg.append("text")
                    .attr("class", "tooltip")
                    .attr("x", function () {
                        var group = parseInt(d.Age / 5);
                        var x = (group - 1) * interval_width;
                        return x;
                    })
                    .attr("y", function () {
                        var y = vis.height / 2 - d.No * interval_height;
                        return y;
                    })
                    .attr("fill", "grey")
                    .attr("display", "block")
                    .attr("font-size", "12px")
                    .text(function () {
                        console.log(d.Name);
                        return ("Name: " + d.Name + "\ Age: " + d.Age);
                    });

            })
            .on("mouseout", function () {
                vis.mouseovertext1.remove();
            })
            */
            ;
        rectActor.exit().remove();




        rectActress
            .enter()
            .append('rect')
            .merge(rectActress)
            .attr('x', function (d) {
                console.log("11");
                var group = parseInt(d.First / 5);
                var x = (group ) * interval_width;
                return x;
            })
            .attr('y', function (d) {
                var y = vis.height / 2 + (d.No-1) * interval_height+40;
                return y;
            })
            .attr('width', rect_width)
            .attr('height', rect_height)
            .attr("fill", function(d){
                var color=parseInt((d.First-10)/10);
                return orange[color];
            });

        rectActress.exit().remove();

    }


}