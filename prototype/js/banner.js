


var slider = document.getElementById("slider1");
var output = document.getElementById("demo");
output.innerHTML = 26000;

slider.oninput = function() {
    output.innerHTML = parseInt(this.value*522.49+" ");
}


var button= document.getElementById("bannerbutton");
button.addEventListener("click",function()
{
     slider.value=53;
    output.innerHTML = parseInt(28310+" ");
});