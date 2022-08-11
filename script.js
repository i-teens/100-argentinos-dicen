control = window.open("control.html", "_blank", "width=540,height=600,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no");


// create function that looks up id and adds class selected
function select(id) {
    points = parseInt(document.getElementById(id+"_number").innerHTML);
    var audio = new Audio('correct.mp3');
    audio.play();
    //if element has class
    if (document.getElementById(id).classList.contains("selected")) {
        //remove class
        document.getElementById(id).classList.remove("selected");
        score('c', score('c') - points, true);
        return false;
    } else {
        //add class
        document.getElementById(id).classList.add("selected");
        score('c', score('c') + points, true);
        return true;
    }
    
}


//show a certain amount of crosses with class crs
function show_crosses_crs(amount) {
    //play audio file
    var audio = new Audio('error.mp3');
    audio.play();
    //get all elements with class crs
    let crs = document.getElementsByClassName("crs");
    //loop through all elements
    for (let i = 0; i < crs.length; i++) {
        //if i is less than amount
        if (i < amount) {
            //show element
            crs[i].classList.remove("hidden");
            //set interval to hide element
            setTimeout(() => {
                crs[i].classList.add("hidden");
            }, 1184);
        }
    }
}

function score (team, pts, rw){
    //rw = true is write
    //rw = false or not set is read
    if (rw == true){
        document.getElementById(team +'_score').innerHTML = pts;
        control.document.getElementById(team +'_score').innerHTML = pts+" pts.";
    } else {
        return parseInt(document.getElementById(team +'_score').innerHTML);
    }
}

window.onbeforeunload = () => {
    control.close();
};


var actual_level = 0;
var title ="";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const file = urlParams.get('f')
/*save levels to local*/ 
var xhttp = new XMLHttpRequest();
xhttp.open("GET", file, 0);
xhttp.send();
var levels = JSON.parse(xhttp.responseText);
//when usin jsonbin.io
levels = levels.record;
//format available in levels.json


function loadLevel(id) {
    score('c', 0, true);
    let selected = document.getElementsByClassName("selected");
    while (selected.length > 0) {
        selected[0].classList.remove("selected");
    }
    setTimeout(() => {
    title="";
    var level = levels[id].answers;
    title = levels[id].info.title;
    for( var i in level){
        if(level[i].clue == null){
            //add class empty
            document.getElementById(i).classList.add("empty");
            document.getElementById("bg-"+i).classList.add("empty");
        }else{
            //remove class empty
            document.getElementById(i).classList.remove("empty");
            document.getElementById("bg-"+i).classList.remove("empty");
        }
        document.getElementById(i+'_answer').innerHTML = level[i].clue;
        document.getElementById(i+'_number').innerHTML = level[i].pts;
    }
    actual_level = id;
    control.get_data();
    }, 600);
}
/*document reeady function*/
document.addEventListener('DOMContentLoaded', function() {
 loadLevel(1);
});
