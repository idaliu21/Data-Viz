var dateFormatter = d3.timeFormat("%Y");
var dateParser = d3.timeParse("%Y");
//load data
queue()
    .defer(d3.csv,("data/best_actor.csv"))
    .defer(d3.csv,("data/best_actress.csv"))
    .defer(d3.csv,("data/actor_new.csv"))
    .defer(d3.csv,("data/actress_new.csv"))
    .defer(d3.csv,("data/best_actor_photo.csv"))
    .defer(d3.csv,("data/best_actress_photo.csv"))
    .defer(d3.csv,("data/actor_new_photo.csv"))
    .defer(d3.csv,("data/actress_new_photo.csv"))

    .await(createVis);

var orange=["#FFF2ED", "#FFE2D6", "#FFD1C0", "#FFC1A9", "#FFB193", "#FFA17C", "#FF9066","#FF804F"];
var blue=["#EBF5FB", "#D6EAF8","#AED6F1", "#85C1E9","#5DADE2", "#3498DB" ,"#2E86C1","#2874A6"];
var ageVis;
function createVis(error, Data1,Data2,Data3,Data4,Data5,Data6,Data7,Data8 ) {
    if (error) {
        console.log(error);
    }
    changeToNumber(Data1);
    changeToNumber(Data2);
    changeToNumber1(Data3);
    changeToNumber1(Data4);
    changeToNumber2(Data5);
    changeToNumber2(Data6);
    changeToNumber3(Data7);
    changeToNumber3(Data8);



    ageVis = new ageVis("oscar-nomination-age", Data1, Data2,Data3,Data4,Data5,Data6,Data7,Data8);



}
var label=[];

var button_click=0;

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




var changeToNumber2 = function(data){



    data.forEach(function(element,i){

        element.Year=dateParser(element.Year);
        element.Age = +element.Age;
        element.No = +element.No;
        element.Name=element.Name;
        element.Movie=element.Movie;
        element.bday=element.bday;
        element.bplace=element.bplace;
        if(element.imdbID.length==1)
        {
            element.imdbID="000000"+element.imdbID;
        }
        else if(element.imdbID.length==2)
        {
            element.imdbID="00000"+element.imdbID;
        }
        else if(element.imdbID.length==3)
        {
            element.imdbID="0000"+element.imdbID;
        }
        else if(element.imdbID.length==4)
        {
            element.imdbID="000"+element.imdbID;
        }
        else if(element.imdbID.length==5)
        {
            element.imdbID="00"+element.imdbID;
        }
        else if(element.imdbID.length==6)
        {
            element.imdbID="0"+element.imdbID;
        }

    });

};


var changeToNumber3= function(data){


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
        if(element.imdbID.length==1)
        {
            element.imdbID="000000"+element.imdbID;
        }
        else if(element.imdbID.length==2)
        {
            element.imdbID="00000"+element.imdbID;
        }
        else if(element.imdbID.length==3)
        {
            element.imdbID="0000"+element.imdbID;
        }
        else if(element.imdbID.length==4)
        {
            element.imdbID="000"+element.imdbID;
        }
        else if(element.imdbID.length==5)
        {
            element.imdbID="00"+element.imdbID;
        }
        else if(element.imdbID.length==6)
        {
            element.imdbID="0"+element.imdbID;
        }

        element.bday=element.bday;
        element.bplace=element.bplace;
    });


    data.sort(function(a,b){return a.First-b.First;});

};



ageVis = function(_parentElement, _data1, _data2, data3,data4,Data5,Data6,Data7,Data8 ){
    this.parentElement = _parentElement;
    this.BestActorData=_data1;
    this.BestActressData=_data2;
    this.NominActorData=data3;
    this.NominActressData=data4;
    this.BestActorPhotoData=Data5;
    this.BestActressPhotoData=Data6;
    this.NominActorPhotoData=Data7;
    this.NominActressPhotoData=Data8;

    var vis=this;
    this.initVis(vis.BestActorData,vis.BestActressData, vis.NominActorData,vis.NominActressData,vis.BestActorPhotoData
    ,vis.BestActressPhotoData, vis.NominActorPhotoData,vis.NominActressPhotoData);
};



ageVis.prototype.initVis = function(ActorData,ActressData,NominActorData,NominActressData,BestActorPhotoData,
                                    BestActressPhotoData,NominActorPhotoData,NominActressPhotoData ){




    var vis=this;

    vis.actorData=vis.BestActorData;
    vis.actressData=vis.BestActressData;
    vis.bestDataLength=178;
    vis.nominDataLength=819;



    document.getElementById("Best").onclick = function(){
        vis.svg.selectAll('.explanation1')
            .transition()
            .duration(50)
            .attr("display","none");

        vis.svg.selectAll('.explanation')
            .transition()
            .duration(50)
            .attr("display","none");


        button_click=0;
        vis.actorData=vis.BestActorData;
        vis.actressData=vis.BestActressData;
        vis.temp_Data=[];
        for(var i=0;i<vis.actorData.length;i++)
        {
            vis.temp_Data[i]=vis.actorData[i];

        }
        vis.actor_number=vis.actorData.length;

        for(var j=0;j<vis.actressData.length;j++)
        {
            vis.temp_Data[vis.actorData.length+j]=vis.actressData[j];
        }

        vis.temp_PhotoData=[];
        for(var i=0;i<vis.BestActorPhotoData.length;i++)
        {
            vis.temp_PhotoData[i]=vis.BestActorPhotoData[i];

        }
        for(var j=0;j<vis.BestActorPhotoData.length;j++)
        {
            vis.temp_PhotoData[vis.BestActorPhotoData.length+j]=vis.BestActressPhotoData[j];
        }

        vis.updateVis();
        // console.log(vis.temp_Data);
    };



    document.getElementById("Nominee").onclick = function(){

        vis.svg.selectAll('.explanation1')
            .transition()
            .duration(50)
            .attr("display","none");

        vis.svg.selectAll('.explanation')
            .transition()
            .duration(50)
            .attr("display","none");


        button_click=1;
        vis.actorData=vis.NominActorData;
        vis.actressData=vis.NominActressData;
        vis.temp_Data=[];
        for(var i=0;i<vis.actorData.length;i++)
        {
            vis.temp_Data[i]=vis.actorData[i];

        }
        vis.actor_number=vis.actorData.length;

        for(var j=0;j<vis.actressData.length;j++)
        {
            vis.temp_Data[vis.actorData.length+j]=vis.actressData[j];
        }

        vis.temp_PhotoData=[];
        for(var i=0;i<vis.NominActorPhotoData.length;i++)
        {
            vis.temp_PhotoData[i]=vis.NominActorPhotoData[i];

        }
        for(var j=0;j<vis.NominActorPhotoData.length;j++)
        {
            vis.temp_PhotoData[vis.NominActorPhotoData.length+j]=vis.NominActressPhotoData[j];
        }
        console.log("vis.temp_Datassafdf");
       console.log(vis.temp_Data);
        vis.updateVis();

    };


    vis.compare=0;
    document.getElementById("Compare").onclick=function(){

        vis.compare++;
        if(vis.compare%2!=0)
        {
            document.getElementById('Compare').innerText = 'Return';
            vis.updateVis1();
        }
        else
        {document.getElementById('Compare').innerText = 'Compare';
        vis.updateVis();}


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


//create description
var img= document.createElement("IMG");
img.setAttribute("id", "starImage");
img.setAttribute("src", "pic/best_actor/0004778.jpg");
img.setAttribute("width", "304");
img.setAttribute("height", "400");
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
tableAge.setAttribute("id", "Age");
document.getElementById("myTable").appendChild(tableAge);

var q = document.createTextNode("Age of 29 when win the academy award");
tableAge.appendChild(q);




//movie
var tableMovie = document.createElement("TR");
tableMovie.setAttribute("id", "Movie");
document.getElementById("myTable").appendChild(tableMovie);

var r = document.createTextNode("Award-Winning Film: The Pianist");
tableMovie.appendChild(r);








ageVis.prototype.createVis=function(){


    //create data vis
    var vis = this;


    var rect_width=13;
    var rect_height=30;
    //the distance between rects
    var interval_width=15;
    var interval_height=40;
    var rectActor,rectActress;
    var mouseovertext1;



    vis.temp_Data=[];
    for(var i=0;i<vis.actorData.length;i++)
    {
        vis.temp_Data[i]=vis.actorData[i];

    }
    vis.actor_number=vis.actorData.length;

    for(var j=0;j<vis.actressData.length;j++)
    {
        vis.temp_Data[vis.actorData.length+j]=vis.actressData[j];
    }



    vis.temp_PhotoData=[];
    for(var i=0;i<vis.BestActorPhotoData.length;i++)
    {
        vis.temp_PhotoData[i]=vis.BestActorPhotoData[i];

    }
    for(var j=0;j<vis.BestActorPhotoData.length;j++)
    {
        vis.temp_PhotoData[vis.BestActorPhotoData.length+j]=vis.BestActressPhotoData[j];
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
        .attr("x", vis.width*0.5+5)
        .attr("y",function(d,i)
        {
            return d.value*interval_height-22;});


    /**********************************************
 第一次画 BARS



     /**********************************************/
// console.log(vis.temp_Data);

   var bars= vis.svg.selectAll('.rectActor')
        .data(vis.temp_Data)
        .enter()
        .append('rect')
           .attr("class", "rectActor")
        //.merge(rectActor)
        .attr('x', function (d,i) {
            if(i<vis.actor_number)
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
        if(i<vis.actor_number)
        {
            return 1;
        }
        else
        {
            return 0.5;
        }
    })
        .attr("fill", function(d,i){
            if(i<vis.actor_number)
            {
                var color=parseInt((d.Age-10)/10)
                return blue[color];
            }
            else if(i<vis.bestDataLength)
            {
                var color=parseInt((d.Age-10)/10)
                return orange[color];
            }
        })
        .on("mouseover", function (d,i) {
            if (i<vis.actor_number)
            {
                img.setAttribute("src", "pic/best_actor/"+vis.BestActorPhotoData[i].imdbID+".jpg");
                document.getElementById("Birthday").innerHTML ="Born on "+vis.BestActorPhotoData[i].bday;
                document.getElementById("Name").innerHTML =vis.BestActorPhotoData[i].Name;
                document.getElementById("Movie").innerHTML ="Award-Winning Film"+vis.BestActorPhotoData[i].Movie;
                document.getElementById("Age").innerHTML ="Age of "+vis.BestActorPhotoData[i].Age+"when win the academy award";

            }
            else {
                img.setAttribute("src", "pic/best_actress/" + vis.BestActressPhotoData[i-vis.actor_number].imdbID + ".jpg");
                document.getElementById("Birthday").innerHTML ="Born on "+vis.BestActressPhotoData[i-vis.actor_number].bday;
                document.getElementById("Name").innerHTML = vis.BestActressPhotoData[i-vis.actor_number].Name;
                document.getElementById("Movie").innerHTML = "Award-Winning Film"+vis.BestActressPhotoData[i-vis.actor_number].Movie;
                document.getElementById("Age").innerHTML ="Age of "+vis.BestActressPhotoData[i-vis.actor_number].Age+"when win the academy award";
            }


            d3.select(this)
                .attr('width', rect_width-3)
                .attr('height', rect_height-3)
                .attr('x', function () {
                    if(i<vis.actor_number)
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
                    if(i<vis.actor_number)
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
                       if(i<vis.actor_number)
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
                       if(i<vis.actor_number)
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
    vis.svg.selectAll('.explanation')
        .transition()
        .duration(50)
        .attr("display","none");

    vis.svg.selectAll('.explanation1')
        .transition()
        .duration(50)
        .attr("display","none");

    var rect_width=13;
    var rect_height=30;
    //the distance between rects
    var interval_width=15;
    var interval_height=40;
    var rectActor,rectActress;
    var mouseovertext1;



    if(button_click==0) {
        //Select…

        var j=0;
        for(i=5;i<18;i++)
        {
            label[j]={key: j, value: i };
            j++;
        };
        vis.label1=vis.svg.selectAll(".label")
            .data(label,function(d) {
                return d.key;});

        //Exit…
        vis.label1.exit()
            .remove();

        //Enter…
        vis.label1.enter()
            .append("text")
            .attr("class","label")
            .attr("x", vis.width*0.5+5)
            .merge(vis.label1)	//Update…
            .transition()
            .duration(500)
            .attr("y",function(d,i)
            {
                return d.value*interval_height-22;})
            .text(function(d) {
                return (d.value*5+" to "+(d.value+1)*5);
            });





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
            .data(vis.temp_Data);

        bars.enter()
            .append('rect')
            .merge(bars)							//Merges the enter selection with the update selection
            .transition()							//Initiate a transition on all elements in the update selection (all rects)
            .duration(1000)
            .attr("class", "rectActor")
            .attr('width', rect_width)
            .attr('height', rect_height);

           bars  .attr('x', function (d,i) {
                if(i<vis.actor_number)
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
                if(i<vis.actor_number)
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

               bars
            .on("mouseover", function (d,i) {


                console.log("3");
                if (i<vis.actor_number)
                {
                    img.setAttribute("src", "pic/best_actor/"+vis.BestActorPhotoData[i].imdbID+".jpg");
                    document.getElementById("Birthday").innerHTML ="Born on "+vis.BestActorPhotoData[i].bday;
                    document.getElementById("Name").innerHTML =vis.BestActorPhotoData[i].Name;
                    document.getElementById("Movie").innerHTML ="Award-Winning Film"+vis.BestActorPhotoData[i].Movie;
                    document.getElementById("Age").innerHTML ="Age of "+vis.BestActorPhotoData[i].Age+"when win the academy award";

                }
                else {
                    img.setAttribute("src", "pic/best_actress/" + vis.BestActressPhotoData[i-vis.actor_number].imdbID + ".jpg");
                    document.getElementById("Birthday").innerHTML ="Born on "+vis.BestActressPhotoData[i-vis.actor_number].bday;
                    document.getElementById("Name").innerHTML = vis.BestActressPhotoData[i-vis.actor_number].Name;
                    document.getElementById("Movie").innerHTML = "Award-Winning Film"+vis.BestActressPhotoData[i-vis.actor_number].Movie;
                    document.getElementById("Age").innerHTML ="Age of "+vis.BestActressPhotoData[i-vis.actor_number].Age+"when win the academy award";
                }


                d3.select(this)
                    .attr('width', rect_width-3)
                    .attr('height', rect_height-3)
                    .attr('x', function () {
                        if(i<vis.actor_number)
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
                        if(i<vis.actor_number)
                        {
                            return "blue";
                        }
                        else
                        {
                            return "orange";
                        }
                    });



            })
            .on("mouseout", function (d,i) {
                d3.select(this)
                    .attr('width', rect_width)
                    .attr('height', rect_height)
                    .attr('x', function () {
                        if(i<vis.actor_number)
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
                        if(i<vis.actor_number)
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


        bars.exit()
            .transition()		//Initiates a transition on the one element we're deleting
            .duration(500)
            .remove();

    }


      if(button_click==1)
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
                  .attr("x", vis.width*0.5+5)
                  .remove();

              //Enter…
              vis.label1.enter()
                  .append("text")
                  .attr("class","label")
                  .attr("x", vis.width*0.5+5)
                  .merge(vis.label1)	//Update…
                  .transition()
                  .duration(500)
                  .attr("y", function(d,i){
                      console.log("111");
                      return (d.value)*interval_height-22;
                  })

                  .text(function(d,i){
                      return d.value*5+" to "+( d.value+1)*5;});



          rect_width=2;
          rect_height=30;
          //the distance between rects
          interval_width=3;
          interval_height=40;
          var i=0;
          var bars =  vis.svg.selectAll('.rectActor')
              .data(vis.temp_Data);



          /**********************************************
          当点击 Oscar nominee 的BUTTON时候，重新开始画这个图表
此处有BUG！！！


          /**********************************************/
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
                  if(i<vis.actor_number) {
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
           .attr("opacity", function(d,i){
               if(i>vis.actor_number)
               {        return 0.5;}
               else
               {
                   return 1;
               }

           })
              .attr("fill", function(d,i){
                  if(i<vis.actor_number)
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
                 if (i<vis.actor_number)
                 {
                     img.setAttribute("src", "pic/actor_new/"+vis.NominActorPhotoData[i].imdbID+".jpg");
                     document.getElementById("Birthday").innerHTML ="Born on "+vis.NominActorPhotoData[i].bday;
                     document.getElementById("Name").innerHTML =vis.NominActorPhotoData[i].Nominee;
                     document.getElementById("Movie").innerHTML ="Birthplace: "+vis.NominActorPhotoData[i].bplace;
                     document.getElementById("Age").innerHTML ="Age of "+vis.NominActorPhotoData[i].Age+"when win the academy award";

                 }
                 else {
                     img.setAttribute("src", "pic/best_actress/" + vis.NominActressPhotoData[i-vis.actor_number].imdbID + ".jpg");
                     document.getElementById("Birthday").innerHTML ="Born on "+vis.NominActressPhotoData[i-vis.actor_number].bday;
                     document.getElementById("Name").innerHTML = vis.NominActressPhotoData[i-vis.actor_number].Nominee;
                     document.getElementById("Movie").innerHTML = "Birthplace: "+vis.NominActressPhotoData[i-vis.actor_number].bplace;
                     document.getElementById("Age").innerHTML ="Age of "+vis.BNominActressPhotoData[i-vis.actor_number].Age+"when win the academy award";
                 }
                 d3.select(this)
                     .attr("fill", "blue");
             })
             .on("mouseout", function(d,i) {
                 d3.select(this)
                     .attr("fill", function () {
                         if (i <vis. actor_number) {
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

    if (button_click == 0) {


        var vis = this;


        var rect_width = 13;
        var rect_height = 30;
        //the distance between rects
        var interval_width = 15;
        var interval_height = 40;
        var rectActor, rectActress;
        var mouseovertext1;


        var bars = vis.svg.selectAll('.rectActor')
            .data(vis.temp_Data)
            .transition()
            .delay(function (d, i) {
                return i * 60;
            })//Initiate a transition on all elements in the update selection (all rects)
            .duration(1000)
            .attr("class", "rectActor")
            .attr('width', rect_width)
            .attr('height', rect_height);



        bars.attr('x', function (d, i) {
             console.log("compare");
            var x = vis.width * 0.5 + (d.No - 1) * interval_width + 60;
            return x;
        })
            .attr('y', function (d, i) {
                var group = parseInt(d.Age / 5);
                var y = (group ) * interval_height;
                return y;
            })

            .attr("fill", function (d, i) {
                if (i < vis.actor_number) {
                    var color = parseInt((d.Age - 10) / 10)
                    return blue[color];
                }
                else {
                    var color = parseInt((d.Age - 10) / 10)
                    return orange[color];
                }
            });

        vis.svg
            .append('rect')
            .attr("class", "explanation")
            .attr('width', 10)
            .attr('height', interval_height * 3)
            .attr("x", vis.width * 0.5 - 30)
            .attr("y", parseInt(40 / 5) * interval_height)
            .attr("fill", blue[4])
            .attr("display","none");

        vis.svg.selectAll('.explanation')
            .transition()
            .delay(7000)
            .duration(500)
            .attr("display","block");

        vis.svg
            .append('rect')
            .attr("class", "explanation1")
            .attr('width', 10)
            .attr('height', interval_height * 3)
            .attr("x", vis.width * 0.5 - 15)
            .attr("y", parseInt(30 / 5) * interval_height)
            .attr("fill", orange[4])
            .attr("display","none");

        vis.svg.selectAll('.explanation1')
            .transition()
            .delay(7500)
            .duration(500)
            .attr("display","block");

        bars.exit()
            .transition()		//Initiates a transition on the one element we're deleting
            .duration(500)
            .remove();

    }


  if (button_click == 1) {
      var vis = this;
        var rect_width = 2;
        var rect_height = 30;
        //the distance between rects
        var interval_width = 3;
        var interval_height = 40;
        var rectActor, rectActress;
        var mouseovertext1;


        var bars = vis.svg.selectAll('.rectActor')
            .data(vis.temp_Data)
            .transition()
            .delay(function (d, i) {
                return i * 10;
            })//Initiate a transition on all elements in the update selection (all rects)
            .duration(1000)
            .attr("class", "rectActor")
            .attr('width', rect_width)
            .attr('height', rect_height);

        bars.attr('x', function (d, i) {

            var x = vis.width * 0.5 + (d.No - 1) * interval_width + 60;
            return x;

        })
            .attr('y', function (d, i) {
                var group = parseInt(d.First / 5);
                var y = (group ) * interval_height;
                return y;
            })

            .attr("fill", function (d, i) {
                if (i < vis.actor_number) {
                    var color = parseInt((d.First - 10) / 10);
                    return blue[color];
                }
                else {
                    var color = parseInt((d.First - 10) / 10);
                    return orange[color];
                }
            });



      vis.svg
          .append('rect')
          .attr("class", "explanation")
          .attr('width', 10)
          .attr('height', interval_height * 3+5)
          .attr("x", vis.width * 0.5 - 30)
          .attr("y", parseInt(40 / 5) * interval_height-30)
          .attr("fill", blue[4])
          .attr("display","none");

      vis.svg
          .append("text")
          .attr("class", "explanation")
          .attr("x", vis.width * 0.5 - 50)
          .attr("y", parseInt(40 / 5) * interval_height-40)
          .text(function(){
              console.log("sasdf");
              return "The Age that Actor Concentrated";
          })
          .attr("display","none");



      vis.svg.selectAll('.explanation')
          .transition()
          .delay(6000)
          .duration(500)
          .attr("display","block");


      vis.svg
          .append("text")
          .attr("class", "explanation1")
          .attr("x", vis.width * 0.5 - 50)
          .attr("y", parseInt(40 / 5) * interval_height-40)
          .text("The Age that Actress Concentrated")
          .attr("display","none");

      vis.svg
          .append('rect')
          .attr("class", "explanation1")
          .attr('width', 10)
          .attr('height', interval_height * 3+5)
          .attr("x", vis.width * 0.5 - 15)
          .attr("y", parseInt(30 / 5) * interval_height-30)
          .attr("fill", orange[4])
          .attr("display","none");

      vis.svg.selectAll('.explanation1')
          .transition()
          .delay(6000)
          .duration(500)
          .attr("display","block");

      bars.exit()
          .transition()		//Initiates a transition on the one element we're deleting
          .duration(500)
          .remove();


  }
}