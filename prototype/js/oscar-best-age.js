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
var label=[];

var changeToNumber = function(data){



    data.forEach(function(element,i){

        element.Year=dateParser(element.Year);
        element.Age = +element.Age;
        element.No = +element.No;
        element.Name=element.Name;
        element.Movie=element.Movie;


    });

    var j=0,q=0;
    for(var i=0;i<data.length;i++)
    {

        if(j!=parseInt(data[i].Age/5))
        {
            q=1;
            data[i].No=q;
            j=parseInt(data[i].Age/5);
        }
        else
        {
            q++;
            data[i].No=q;
        }
    }


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


    var j=0,q=0;
    for(var i=0;i<data.length;i++)
    {

       if(j!=parseInt(data[i].First/5))
       {
           q=1;
           data[i].No=q;
           j=parseInt(data[i].First/5);
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
    console.log("best Actor");
    console.log(vis.BestActorData);
    console.log("best Actress");
    console.log(vis.BestActressData);



    vis.button=0;
    vis.button1=0;
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

    document.getElementById("Compare").onclick=function(){

          vis.updateVis1();
    };


    vis.margin = {top: 0, right: 10, bottom: 350, left: 0};
    vis.width = 1000 - vis.margin.left - vis.margin.right;
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

    //create description
    var img= document.createElement("IMG");
    img.setAttribute("id", "starImage");
    img.setAttribute("src", "pic/paycheck.jpg");
    img.setAttribute("width", "304");
    img.setAttribute("height", "228");
    document.getElementById("oscar-description").appendChild(img);


    var tableText = document.createElement("TABLE");
    tableText.setAttribute("id", "myTable");
    document.getElementById("oscar-description").appendChild(tableText);



//name
    var tableName = document.createElement("TR");
    tableName.setAttribute("id", "Name");
    document.getElementById("myTable").appendChild(tableName);

    var t = document.createTextNode("Adrien Brody");
    tableName.appendChild(t);



//birthday
    var tableBirthday = document.createElement("TR");
    tableBirthday.setAttribute("id", "Birthday");
    document.getElementById("myTable").appendChild(tableBirthday);

    var p = document.createTextNode("Born on: Feb 2th, 1987");
    tableBirthday.appendChild(p);


    //Age
    var tableAge = document.createElement("TR");
    tableAge.setAttribute("id", "Birthday");
    document.getElementById("myTable").appendChild(tableAge);

    var q = document.createTextNode("Age of 29 when win the academy award");
    tableAge.appendChild(q);




//movie
    var tableMovie = document.createElement("TR");
    tableMovie.setAttribute("id", "Movie");
    document.getElementById("myTable").appendChild(tableMovie);

    var r = document.createTextNode("Award-Winning Film: The Pianist");
    tableMovie.appendChild(r);





    //create data vis
    var vis = this;


    var rect_width=13;
    var rect_height=30;
    //the distance between rects
    var interval_width=15;
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


    var j=0;
    for(i=5;i<18;i++)
    {
        label[j]={key: j, value: i };
        j++;
    };

    console.log(label);

    vis.label1=vis.svg.selectAll(".label")
        .data(label,function(d) {
            return d.key;
        })
        .enter()
        .append("text")
        .attr("class","label")
        .text(function(d) {
            return (d.value*5+" to "+(d.value+1)*5);
        })
        .attr("x", vis.width*0.5)
        .attr("y",function(d,i)
        {
            return d.value*interval_height-22;});


   var bars= vis.svg.selectAll('.rectActor')
        .data(temp_Data)
        .enter()
        .append('rect')
           .attr("class", "rectActor")
        //.merge(rectActor)
        .attr('x', function (d,i) {
            if(i<actor_number)
            {
                var x = vis.width*0.5 - d.No * interval_width;
                return x;
            }
            else
            {
                var x = vis.width*0.5 + (d.No-1) * interval_width+60;
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
       .attr("opacity", function(d,i){
        if(i<actor_number)
        {
            return 1;
        }
        else
        {
            return 0.5;
        }
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
        .on("mouseover", function (d,i) {
            if (i>4)
            {
                img.setAttribute("src", "pic/nudity.jpg");
                document.getElementById("Birthday").innerHTML = "Julia";

            }
            d3.select(this)
                .attr('width', rect_width-3)
                .attr('height', rect_height-3)
                .attr('x', function () {
                    if(i<actor_number)
                    {
                        var x = vis.width*0.5 - d.No * interval_width;
                        return x+1.5;
                    }
                    else
                    {
                        var x = vis.width*0.5 + (d.No-1) * interval_width+60;
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
                           var x = vis.width*0.5 - d.No * interval_width;
                           return x;
                       }
                       else
                       {
                           var x = vis.width*0.5 + (d.No-1) * interval_width+60;
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





    if(vis.button==0) {

        for(i=5;i<18;i++)
        {
            vis.label1=vis.svg.selectAll(".label1")
                .append("text")
                .attr("x", vis.width *0.5)
                .attr("y", i*interval_height-22)
                .text(i*5+" to "+(i+1)*5);
            vis.label1.exit().remove();


        }
        var bars =  vis.svg.selectAll('.rectActor')
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
                    var x = vis.width*0.5 - d.No * interval_width;
                    return x;
                }
                else
                {
                    var x = vis.width*0.5 + (d.No-1) * interval_width+60;
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

          var j=0;
          for(i=2;i<19;i++)
          {

                  label[j]={key: j, value: i };
                  j++;
          }
              //Select…
              vis.label1=vis.svg.selectAll(".label")
                  .data(label,function(d) {
                      return d.key;});

              //Exit…
              vis.label1.exit()
                  .remove();

              //Enter…
              vis.label1.enter()
                  .merge(vis.label1)	//Update…
                  .transition()
                  .duration(500)
                  .attr("x", vis.width*0.5)
                  .attr("y", function(d,i){
                      console.log("111");
                      return d.value*interval_height-22;
                  })
                  .text(function(d,i){
                      console.log("222");
                      return d.value*5+" to "+( d.value+1)*5;});



          rect_width=8;
          rect_height=30;
          //the distance between rects
          interval_width=10;
          interval_height=40;
          var i=0;
          var bars =  vis.svg.selectAll('.rectActor')
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
                      x = vis.width*0.5 - d.No * interval_width;
                      return x;
                  }
                  else
                  {
                      x = vis.width*0.5 + (d.No-1) * interval_width+60;
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

             bars
             .on("mouseover", function (d,i) {
                 if (i>4)
                 {
                     var img=document.getElementById("starImage");
                     img.setAttribute("src", "pic/nudity1.jpg");
                     document.getElementById("Birthday").innerHTML = "Jupiter";
                 }
                 d3.select(this)
                     .attr("fill", "blue");
             })
             .on("mouseout", function(d,i) {
                 d3.select(this)
                     .attr("fill", function () {
                         if (i < actor_number) {
                             var color = parseInt((d.First - 10) / 10);
                             console.log(color);
                             return blue[color];
                         }
                         else {
                             var color = parseInt((d.First - 10) / 10);
                             return orange[color];
                         }
                     })
             });


       bars.exit()
           .transition()		//Initiates a transition on the one element we're deleting
           .duration(500)
           .remove();


    }


};



ageVis.prototype.updateVis1 = function() {


    var vis = this;


    var rect_width=13;
    var rect_height=30;
    //the distance between rects
    var interval_width=15;
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




if (vis.button==0)
{
    var bars =  vis.svg.selectAll('.rectActor')
        .data(temp_Data)
        .transition()
        .delay(function(d, i) {
            return i * 100;
        })//Initiate a transition on all elements in the update selection (all rects)
        .duration(1000)
        .attr("class", "rectActor")
        .attr('width', rect_width)
        .attr('height', rect_height);

    bars .attr('x', function (d,i) {

            var x = vis.width*0.5 + (d.No-1) * interval_width+60;
            return x;
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
        });

    vis.svg
        .append('rect')
        .attr("class", "explanation")
        .attr('width', 10)
        .attr('height', interval_height*3)
        .attr("x",vis.width*0.5-30)
        .attr("y",parseInt(40 / 5)* interval_height)
        .attr("fill",blue[4]);

    bars.exit()
        .transition()		//Initiates a transition on the one element we're deleting
        .duration(500)
        .remove();




}

}