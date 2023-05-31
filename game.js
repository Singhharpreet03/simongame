// global variables
var gameseq=[];
var bcolor= ["red","green","blue","yellow"];
var userClickedPattern=[];
let level=0;
let state=false

//game start
$(document).keypress(function () { 
    if (!state){
        gameseq=[];
        level=0;
        userClickedPattern=[];
        nextseq()
        state=true;
    }
});





// functions 
function playsound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();    
}
function animatepress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed");
    },100)
    
}


function nextseq(){
var randint=Math.floor(Math.random() * 4);
var selectedbutton=bcolor[randint]
gameseq.push(selectedbutton)
$("#"+selectedbutton).fadeOut().fadeIn();
playsound(selectedbutton);
level ++;
$("#level-title").text("level "+level);
}

function checkans(indx){
    if(userClickedPattern[indx]===gameseq[indx]){
        console.log("success");
        if(userClickedPattern.length===gameseq.length){
            userClickedPattern=[];
            setTimeout(nextseq(),2000);
            
        }
    }
    
    else{
    $("body").addClass("game-over");
    playsound("wrong");
    setTimeout(function(){
        $("body").removeClass("game-over"); 
    },200) 
    $("#level-title").text("Game - over restart by pressing any key");
    state=false;  
    }
}

// jq

$(".btn").click(function (){
    var userchoosencolor=$(this).attr("id");
    userClickedPattern.push(userchoosencolor);
    playsound(userchoosencolor);
    animatepress(userchoosencolor);
    checkans(userClickedPattern.length-1);
})