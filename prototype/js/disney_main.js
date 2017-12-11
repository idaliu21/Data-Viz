
var allData;
var dateParser = d3.timeParse("%Y");
var dateFormatter = d3.timeFormat("%Y");

// load data for disney
d3.csv("data/disney.csv", function(csv) {
    disney_data= csv;

    disney_data.forEach(function (d) {
        d.female_per = +d.female_per;
        d.male_per= +d.male_per;
        d.year = +d.year;
    });

    //sort the data by female percentage
    disney_data.sort(function (a,b) {
        return a.female_per - b.female_per;
    });

    // (3) Create event handler
    var MyEventHandler = {};

    // (4) Create visualization instances
    var countVis = new CountVis("disney_time", disney_data, MyEventHandler);
    var disneyVis  = new DisneyVis("disney", disney_data);


    // (5) Bind event handler
    $(MyEventHandler).bind("selectionChanged", function(event, rangeStart, rangeEnd){
        // disneyVis.onSelectionChange(rangeStart, rangeEnd);
        // $("#date").html("Date:  "+dateFormatter(rangeStart)+" - "+dateFormatter(rangeEnd) );
    });

});



// // React to 'brushed' event and update all bar charts
// function brushed() {
//
//     // // * TO-DO *
//     // // Get the extent of the current brush
//     // var selectionRange = d3.brushSelection(d3.select(".brush").node());
//     //
//     // // Convert the extent into the corresponding domain values
//     // var selectionDomain = selectionRange.map(areachart.x.invert);
//     //
//     // // Update focus chart (detailed information)
//     // // barcharts[i].selectionChanged(selectionDomain);
//     // barcharts.selectionChanged(selectionDomain);
//     // console.log(selectionDomain);
//     // areachart.wrangleData();
//
//     barcharts.forEach(function (chart) {
//         var selection = d3.event.selection;
//         chart.selectionChanged(selection.map(areachart.x.invert));
//         // console.log(selection.map(areachart.x.invert));
//     });
//
//
// }
