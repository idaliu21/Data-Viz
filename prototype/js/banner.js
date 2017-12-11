


var slider = document.getElementById("slider1");
var output = document.getElementById("demo");
output.innerHTML = 0;

slider.oninput = function() {
    output.innerHTML = parseInt(this.value*522.49+" ");
};


var button= document.getElementById("bannerbutton");
button.addEventListener("click",function()
{
     slider.value=53;
    var startNum = slider.value;

    var options = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
    };
    var demo = new CountUp("demo", startNum, 28310, 0, 2.5, options);
    if (!demo.error) {
        demo.start();
    } else {
        demo = new CountUp("demo", 0, 28310, 0, 2.5, options);
        demo.start();
    }

    output.style.color = "#FF804F";

});