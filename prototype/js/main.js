
d3.json("data/gender_distribution.json", function(data) {

    console.log(data);
});
/*
queue()
    .defer(d3.json,"data/gender_distribution.json")
    //.defer(d3.json,"data/myWorldFields.json")
    .await(createVis);



function createVis(error, Gender){
    console.log(Gender);
}
*/



