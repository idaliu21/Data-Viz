//change number here!
var maleNum = 17;
var femaleNum = 13;

//reveal number
function revealMaleNum(){
    var options = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
    };
    var demo = new CountUp("male-num", 0, 20493, 0, 2.5, options);
    if (!demo.error) {
        demo.start();
    }
}
function revealFemaleNum(){
    var options = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
    };
    var demo = new CountUp("female-num", 0, 15775, 0, 2.5, options);
    if (!demo.error) {
        demo.start();
    }
}

/*
https://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
 */
var firstTime=true;
function testScroll(ev){
    console.log("humm"+document.documentElement.scrollTop);
    if(document.documentElement.scrollTop>600 && firstTime){

        revealMaleNum();
        revealFemaleNum();
        firstTime=false;
    };
}
window.onscroll=testScroll;



//draw icons
var maleIcon = "<img class=\"male-icon\" src=\"icons/male.svg\" alt=\"male\">";
var allMaleIcon="";
for(var i=0;i<maleNum;i++){
    allMaleIcon +=maleIcon;
}
document.getElementById("male-comp").innerHTML=allMaleIcon;

var femaleIcon = "<img class=\"female-icon\" src=\"icons/female.svg\" alt=\"male\">";
var allFemaleIcon="";
for(var i=0;i<femaleNum;i++){
    allFemaleIcon +=femaleIcon;
}
document.getElementById("female-comp").innerHTML=allFemaleIcon;

//hover
var allMale = document.getElementsByClassName("male-icon");
allMale[0].addEventListener("mouseover", function() {
    allMale[0].setAttribute("src","icons/male-jump.svg")
});
allMale[0].addEventListener("mouseout", function() {
    allMale[0].setAttribute("src","icons/male.svg")
});
//***********
allMale[1].addEventListener("mouseover", function() {
    allMale[1].setAttribute("src","icons/male-jump.svg")
});
allMale[1].addEventListener("mouseout", function() {
    allMale[1].setAttribute("src","icons/male.svg")
});
//***********
allMale[2].addEventListener("mouseover", function() {
    allMale[2].setAttribute("src","icons/male-jump.svg")
});
allMale[2].addEventListener("mouseout", function() {
    allMale[2].setAttribute("src","icons/male.svg")
});
//***********
allMale[3].addEventListener("mouseover", function() {
    allMale[3].setAttribute("src","icons/male-jump.svg")
});
allMale[3].addEventListener("mouseout", function() {
    allMale[3].setAttribute("src","icons/male.svg")
});
//***********
allMale[4].addEventListener("mouseover", function() {
    allMale[4].setAttribute("src","icons/male-jump.svg")
});
allMale[4].addEventListener("mouseout", function() {
    allMale[4].setAttribute("src","icons/male.svg")
});
//***********
allMale[5].addEventListener("mouseover", function() {
    allMale[5].setAttribute("src","icons/male-jump.svg")
});
allMale[5].addEventListener("mouseout", function() {
    allMale[5].setAttribute("src","icons/male.svg")
});
//***********
allMale[6].addEventListener("mouseover", function() {
    allMale[6].setAttribute("src","icons/male-jump.svg")
});
allMale[6].addEventListener("mouseout", function() {
    allMale[6].setAttribute("src","icons/male.svg")
});
//***********
allMale[7].addEventListener("mouseover", function() {
    allMale[7].setAttribute("src","icons/male-jump.svg")
});
allMale[7].addEventListener("mouseout", function() {
    allMale[7].setAttribute("src","icons/male.svg")
});
//***********
allMale[8].addEventListener("mouseover", function() {
    allMale[8].setAttribute("src","icons/male-jump.svg")
});
allMale[8].addEventListener("mouseout", function() {
    allMale[8].setAttribute("src","icons/male.svg")
});
//***********
allMale[9].addEventListener("mouseover", function() {
    allMale[9].setAttribute("src","icons/male-jump.svg")
});
allMale[9].addEventListener("mouseout", function() {
    allMale[9].setAttribute("src","icons/male.svg")
});
//***********
allMale[10].addEventListener("mouseover", function() {
    allMale[10].setAttribute("src","icons/male-jump.svg")
});
allMale[10].addEventListener("mouseout", function() {
    allMale[10].setAttribute("src","icons/male.svg")
});
//***********
allMale[11].addEventListener("mouseover", function() {
    allMale[11].setAttribute("src","icons/male-jump.svg")
});
allMale[11].addEventListener("mouseout", function() {
    allMale[11].setAttribute("src","icons/male.svg")
});
//***********
allMale[12].addEventListener("mouseover", function() {
    allMale[12].setAttribute("src","icons/male-jump.svg")
});
allMale[12].addEventListener("mouseout", function() {
    allMale[12].setAttribute("src","icons/male.svg")
});
//***********
allMale[13].addEventListener("mouseover", function() {
    allMale[13].setAttribute("src","icons/male-jump.svg")
});
allMale[13].addEventListener("mouseout", function() {
    allMale[13].setAttribute("src","icons/male.svg")
});
//***********
allMale[14].addEventListener("mouseover", function() {
    allMale[14].setAttribute("src","icons/male-jump.svg")
});
allMale[14].addEventListener("mouseout", function() {
    allMale[14].setAttribute("src","icons/male.svg")
});
//***********
allMale[15].addEventListener("mouseover", function() {
    allMale[15].setAttribute("src","icons/male-jump.svg")
});
allMale[15].addEventListener("mouseout", function() {
    allMale[15].setAttribute("src","icons/male.svg")
});
//***********
allMale[16].addEventListener("mouseover", function() {
    allMale[16].setAttribute("src","icons/male-jump.svg")
});
allMale[16].addEventListener("mouseout", function() {
    allMale[16].setAttribute("src","icons/male.svg")
});
//***********






var allFemale = document.getElementsByClassName("female-icon");
allFemale[0].addEventListener("mouseover", function() {
    allFemale[0].setAttribute("src","icons/female-jump.svg")
});
allFemale[0].addEventListener("mouseout", function() {
    allFemale[0].setAttribute("src","icons/female.svg")
});
//***********
allFemale[1].addEventListener("mouseover", function() {
    allFemale[1].setAttribute("src","icons/female-jump.svg")
});
allFemale[1].addEventListener("mouseout", function() {
    allFemale[1].setAttribute("src","icons/female.svg")
});
//***********
allFemale[2].addEventListener("mouseover", function() {
    allFemale[2].setAttribute("src","icons/female-jump.svg")
});
allFemale[2].addEventListener("mouseout", function() {
    allFemale[2].setAttribute("src","icons/female.svg")
});
//***********
allFemale[3].addEventListener("mouseover", function() {
    allFemale[3].setAttribute("src","icons/female-jump.svg")
});
allFemale[3].addEventListener("mouseout", function() {
    allFemale[3].setAttribute("src","icons/female.svg")
});
//***********
allFemale[4].addEventListener("mouseover", function() {
    allFemale[4].setAttribute("src","icons/female-jump.svg")
});
allFemale[4].addEventListener("mouseout", function() {
    allFemale[4].setAttribute("src","icons/female.svg")
});
//***********
allFemale[5].addEventListener("mouseover", function() {
    allFemale[5].setAttribute("src","icons/female-jump.svg")
});
allFemale[5].addEventListener("mouseout", function() {
    allFemale[5].setAttribute("src","icons/female.svg")
});
//***********
allFemale[6].addEventListener("mouseover", function() {
    allFemale[6].setAttribute("src","icons/female-jump.svg")
});
allFemale[6].addEventListener("mouseout", function() {
    allFemale[6].setAttribute("src","icons/female.svg")
});
//***********
allFemale[7].addEventListener("mouseover", function() {
    allFemale[7].setAttribute("src","icons/female-jump.svg")
});
allFemale[7].addEventListener("mouseout", function() {
    allFemale[7].setAttribute("src","icons/female.svg")
});
//***********
allFemale[8].addEventListener("mouseover", function() {
    allFemale[8].setAttribute("src","icons/female-jump.svg")
});
allFemale[8].addEventListener("mouseout", function() {
    allFemale[8].setAttribute("src","icons/female.svg")
});
//***********
allFemale[9].addEventListener("mouseover", function() {
    allFemale[9].setAttribute("src","icons/female-jump.svg")
});
allFemale[9].addEventListener("mouseout", function() {
    allFemale[9].setAttribute("src","icons/female.svg")
});
//***********
allFemale[10].addEventListener("mouseover", function() {
    allFemale[10].setAttribute("src","icons/female-jump.svg")
});
allFemale[10].addEventListener("mouseout", function() {
    allFemale[10].setAttribute("src","icons/female.svg")
});
//***********
allFemale[11].addEventListener("mouseover", function() {
    allFemale[11].setAttribute("src","icons/female-jump.svg")
});
allFemale[11].addEventListener("mouseout", function() {
    allFemale[11].setAttribute("src","icons/female.svg")
});
//***********
allFemale[12].addEventListener("mouseover", function() {
    allFemale[12].setAttribute("src","icons/female-jump.svg")
});
allFemale[12].addEventListener("mouseout", function() {
    allFemale[12].setAttribute("src","icons/female.svg")
});
//***********





console.log(allFemale);

