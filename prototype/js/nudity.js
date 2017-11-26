
var width_nudity = 300,
    height_nudity = 900;

var svg_reveal = d3.select('#reveal').append("svg")
    .attr("width",500)
    .attr("height",height_nudity);
var svg_naked = d3.select('#naked').append("svg")
    .attr("width",width_nudity)
    .attr("height",height_nudity);
var svg_partially= d3.select('#partially').append("svg")
    .attr("width",500)
    .attr("height",height_nudity);

//input data for the 3 diagrams
var reveal =
    [{ data:28.8,
        gender : 'female'},
    { data: 7,
     gender: 'male'}];

var naked =
    [{ data:26.2,
        gender : 'female'},
     { data: 9.4,
        gender: 'male'}];

var partially = [33.3,33.3,33.3];

var data_1=[ 0,1,2,3 ];
////////////////////////////////draw revealing
var rev = svg_reveal.selectAll("rect")
    .data(reveal)
    .enter().append("rect")
    .attr("x", function (d,index) {
        return index*70 + 200;
    })
    .attr("y", function(d){
        return 600 - d.data*10;
    })
    .attr("fill", function (d) {
        if (d.gender == 'female'){return "#FF8A5D"}
        else {return "#62ABFD"}
    })
    .attr("width", 60)
    .attr("height",function (d) {
        return d.data*10;
    });
//
svg_reveal.selectAll("rect1")
    .data(data_1)
    .enter().append("rect")
    .attr("x", 200)
    .attr("y", function(d,i){
        return 600 - i * 288/4 ;
    })
    .attr("fill", "black")
    .attr("width", 60)
    .attr("height",3);
//left text
svg_reveal.selectAll("text")
    .data(reveal)
    .enter()
    .append("text")
    .append("tspan")
    .attr("class", "name1")
    .attr("fill", "white")
    .attr("x", function (d,index) {
        return index*90 + 200;
    })
    .attr("dy", 630)
    .attr("font-size",20)
    .text(function (d) {
        return d.data + "%" ;
    });
svg_reveal.selectAll("text")
    .append("tspan")
    .attr("class", "name1")
    .attr("fill", "white")
    .attr("x", function (d,index) {
        return index*90 + 200;
    })
    .attr("dy", 20)
    .attr("font-size",20)
    .text(function (d) {
        return d.gender ;
    });
svg_reveal.append("text")
    .attr("class", "label1")
    .attr("fill", "white")
    .attr("x", 360)
    .attr("y", 700)
    .attr("font-size",24)
    .style("text-anchor", "end")
    .text("wore sexually revealing clothes");



//////////////////////////// middle diagram
svg_naked.selectAll("rect")
    .data(naked)
    .enter().append("rect")
    .attr("x", function (d,index) {
        return index*70 + 50;
    })
    .attr("y", function(d){
        return 600 - d.data*10;
    })
    .attr("fill", function (d) {
        if (d.gender == 'female'){return "#FF8A5D"}
        else {return "#62ABFD"}
    })
    .attr("width", 60)
    .attr("height",function (d) {
        return d.data*10;
    });
svg_naked.selectAll("rect1")
    .data(data_1)
    .enter().append("rect")
    .attr("x", 50)
    .attr("y", function(d,i){
        return 600 - i * 262/3 ;
    })
    .attr("fill", "black")
    .attr("width", 60)
    .attr("height",3);
//text for middle
svg_naked.selectAll("text")
    .data(naked)
    .enter()
    .append("text")
    .append("tspan")
    .attr("class", "name1")
    .attr("fill", "white")
    .attr("x", function (d,index) {
        return index*90 + 50;
    })
    .attr("dy", 630)
    .attr("font-size",20)
    .text(function (d) {
        return d.data + "%"  ;
    });
svg_naked.selectAll("text")
    .append("tspan")
    .attr("class", "name1")
    .attr("fill", "white")
    .attr("x", function (d,index) {
        return index*90 + 50;
    })
    .attr("dy", 20)
    .attr("font-size",20)
    .text(function (d) {
        return d.gender ;
    });
svg_naked.append("text")
    .attr("class", "label1")
    .attr("fill", "white")
    .attr("x", 200)
    .attr("y", 700)
    .attr("font-size",24)
    .style("text-anchor", "end")
    .text("get partially naked");




// /////////////////////////right diagram
svg_partially.selectAll("rect")
    .data(partially)
    .enter().append("rect")
    .attr("x", 120)
    .attr("y", function(d,i){
        return 600 - (i+1)*d *2.5;
    })
    .attr("fill", function (d,i) {
        if ( i == 0){return "#FF8A5D"}
        else {return "#aaa9aa"}
    })
    .attr("width", 60)
    .attr("height",function (d) {
        return d*2.5;
    });
svg_partially.append("text")
    .attr("class", "label1")
    .attr("fill", "white")
    .attr("x", 180)
    .attr("y", 630)
    .attr("font-size",20)
    .style("text-anchor", "end")
    .text("33.3%");
svg_partially.append("text")
    .attr("class", "label1")
    .attr("fill", "white")
    .attr("x", 180)
    .attr("y", 650)
    .attr("font-size",20)
    .style("text-anchor", "end")
    .text("female");

svg_partially.append("text")
    .attr("class", "wrapme")
    .attr("fill", "white")
    .attr("x", 230)
    .attr("y", 700)
    .attr("width",200)
    .attr("font-size",24)
    .style("text-anchor", "end")
    .text("shown in sexually revealing attire or are partially naked");



///////////////////function to wrap text
function wrap(text) {
    text.each(function() {
        var text = d3.select(this);
        var words = text.text().split(/\s+/).reverse();
        var lineHeight = 20;
        var width = parseFloat(text.attr('width'));
        var y = parseFloat(text.attr('y'));
        var x = text.attr('x');
        var anchor = text.attr('text-anchor');

        var tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('text-anchor', anchor);
        var lineNumber = 0;
        var line = [];
        var word = words.pop();

        while (word) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > width) {
                lineNumber += 1;
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = text.append('tspan').attr('x', x).attr('y', y + lineNumber * lineHeight).attr('anchor', anchor).text(word);
            }
            word = words.pop();
        }
    });
}
d3.selectAll('.wrapme').call(wrap);
