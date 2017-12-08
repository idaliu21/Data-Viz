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
    vis.width = 1200 - vis.margin.left - vis.margin.right;
    vis.height = 1000 - vis.margin.top - vis.margin.bottom;


    //create svg
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    vis. createVis();



}

ageVis.prototype.createVis=function(){
    var vis = this;


    var rect_width=23;
    var rect_height=30;
    //the distance between rects
    var interval_width=25;
    var interval_height=40;
    var rectActor,rectActress;
    var mouseovertext1;


    var temp_Data=[];
    for(var i=0;i<vis.actorData.length;i++)
    {
        temp_Data[i]=vis.actorData[i];

    }
    var actor_number=vis.actorData.length;

    for(var j=0;j<vis.actressData.length;j++)
    {
        temp_Data[vis.actorData.length+j]=vis.actressData[j];
    }
    for(i=5;i<18;i++)
    {
        vis.label1=vis.svg.append("text")
            .attr("x", vis.width*0.75)
            .attr("y", i*interval_height-22)
            .text(i*5+" to "+(i+1)*5);
        vis.label1.exit().remove();


    }

   var bars= vis.svg.selectAll('rect')
        .data(temp_Data);

       bars.enter()
        .append('rect')
       .attr("class", "rectActor")
        //.merge(rectActor)
        .attr('x', function (d,i) {
            if(i<actor_number)
            {
                var x = vis.width*0.75 - d.No * interval_width;
                return x;
            }
            else
            {
                var x = vis.width*0.75 + (d.No-1) * interval_width+60;
                return x;
            }

        })
        .attr('y', function (d,i) {
            var group = parseInt(d.Age / 5);
            var y = (group ) * interval_height;
            return y;
        })
        .attr('width', rect_width)
        .attr('height', rect_height)
        .attr("fill", function(d,i){
            if(i<actor_number)
            {
                var color=parseInt((d.Age-10)/10)
                return blue[color];
            }
            else
            {
                var color=parseInt((d.Age-10)/10)
                return orange[color];
            }
        })
        .on("mouseover", function (d,i) {
            d3.select(this)
                .attr('width', rect_width-3)
                .attr('height', rect_height-3)
                .attr('x', function () {
                    if(i<actor_number)
                    {
                        var x = vis.width*0.75 - d.No * interval_width;
                        return x+1.5;
                    }
                    else
                    {
                        var x = vis.width*0.75 + (d.No-1) * interval_width+60;
                        return x+1.5;
                    }

                })
                .attr('y', function () {
                    var group = parseInt(d.Age / 5);
                    var y = (group ) * interval_height;
                    return y+1.5;
                })
                .attr("fill", function(){
                    if(i<actor_number)
                    {
                        return "blue";
                    }
                    else
                    {
                        return "orange";
                    }
                });

        })
        .on("mouseout", function(d,i){
               d3.select(this)
                   .attr('width', rect_width)
                   .attr('height', rect_height)
                   .attr('x', function () {
                       if(i<actor_number)
                       {
                           var x = vis.width*0.75 - d.No * interval_width;
                           return x;
                       }
                       else
                       {
                           var x = vis.width*0.75 + (d.No-1) * interval_width+60;
                           return x;
                       }

                   })
                   .attr('y', function () {
                       var group = parseInt(d.Age / 5);
                       var y = (group ) * interval_height;
                       return y;
                   })
                   .attr("fill", function(){
                       if(i<actor_number)
                       {
                           var color=parseInt((d.Age-10)/10)
                           return blue[color];
                       }
                       else
                       {
                           var color=parseInt((d.Age-10)/10)
                           return orange[color];
                       }
                   });
           });


    vis.g = vis.svg.append("g")
        .attr("class", "tooltip") ;
};



ageVis.prototype.updateVis = function() {
    var vis = this;


    var rect_width=23;
    var rect_height=30;
    //the distance between rects
    var interval_width=25;
    var interval_height=40;
    var rectActor,rectActress;
    var mouseovertext1;


    var temp_Data=[];
    for(var i=0;i<vis.actorData.length;i++)
    {
        temp_Data[i]=vis.actorData[i];

    }
    var actor_number=vis.actorData.length;

    for(var j=0;j<vis.actressData.length;j++)
    {
        temp_Data[vis.actorData.length+j]=vis.actressData[j];
    }

    console.log(temp_Data);


    //draw rects
/*    rectActor = vis.svg.selectAll('.rectActor')
        .data(vis.actorData);
    console.log(vis.actorData);


    rectActress = vis.svg.selectAll('.rectActress')
        .data(vis.actressData);*/





    if(vis.button==0) {

        for(i=5;i<18;i++)
        {
            vis.label1=vis.svg.append("text")
                .attr("x", vis.width *0.75)
                .attr("y", i*interval_height-22)
                .text(i*5+" to "+(i+1)*5);
            vis.label1.exit().remove();


        }
        var bars =  vis.svg.selectAll('rect')
            .data(temp_Data);

        bars.enter()
            .append('rect')
            .merge(bars)							//Merges the enter selection with the update selection
            .transition()							//Initiate a transition on all elements in the update selection (all rects)
            .duration(1000)
            .attr("class", "rectActor")
            .attr('width', rect_width)
            .attr('height', rect_height);

           bars  .attr('x', function (d,i) {
                if(i<actor_number)
                {
                    var x = vis.width*0.75 - d.No * interval_width;
                    return x;
                }
                else
                {
                    var x = vis.width*0.75 + (d.No-1) * interval_width+60;
                    return x;
                }

            })
            .attr('y', function (d,i) {
                    var group = parseInt(d.Age / 5);
                    var y = (group ) * interval_height;
                    return y;
            })

            .attr("fill", function(d,i){
                if(i<actor_number)
                {
                var color=parseInt((d.Age-10)/10)
                return blue[color];
                }
                else
                {
                    var color=parseInt((d.Age-10)/10)
                    return orange[color];
                }
            })
            .on("mouseover", function (d) {

            })
            .on("mouseout", function () {

            });


        bars.exit()
            .transition()		//Initiates a transition on the one element we're deleting
            .duration(500)
            .remove();

    }


      if(vis.button==1)
      {


          for(i=2;i<19;i++)
          {
              vis.label1=vis.svg
                  .append("text")
                  .attr("x", vis.width*0.75)
                  .attr("y", i*interval_height-22)
                  .text(i*5+" to "+(i+1)*5);
              vis.label1.exit().remove();
          }

          rect_width=8;
          rect_height=30;
          //the distance between rects
          interval_width=10;
          interval_height=40;
          var i=0;
          var bars =  vis.svg.selectAll('rect')
              .data(temp_Data);

         bars.enter()
             .append('rect')
             .attr("class", "rectActor")
             .merge(bars)							//Merges the enter selection with the update selection
             .transition()							//Initiate a transition on all elements in the update selection (all rects)
             .duration(1000)
             .attr('width', rect_width)
             .attr('height', rect_height)
             .attr('x', function (d,i) {
                  var x;
                  if(i<actor_number) {
                      x = vis.width*0.75 - d.No * interval_width;
                      return x;
                  }
                  else
                  {
                      x = vis.width*0.75 + (d.No-1) * interval_width+60;
                      return x;
                  }
              })
              .attr('y', function (d) {
                      var group = parseInt(d.First / 5);
                      var y = (group ) * interval_height;
                      return y;
              })

              .attr("fill", function(d,i){
                  if(i<actor_number)
                  {
                      var color=parseInt((d.First-10)/10);
                      return blue[color];
                  }
                  else
                  {
                      var color=parseInt((d.First-10)/10);
                      return orange[color];
                  }
              });

         bars.on("mouseover", function (d,i) {
                 d3.select(this)
                     .attr("fill", "blue");
             })
             .on("mouseout", function(d,i) {
                 d3.select(this)
                     .attr("fill", function () {
                         if (i < actor_number) {
                             var color = parseInt((d.Age - 10) / 10);
                             return blue[color];
                         }
                         else {
                             var color = parseInt((d.Age - 10) / 10);
                             return orange[color];
                         }
                     })
             });


       bars.exit()
           .transition()		//Initiates a transition on the one element we're deleting
           .duration(500)
           .remove();


    }


}