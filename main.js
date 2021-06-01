song1="";
song2="";
scoreright=0;
scoreleft=0;
song1_status="";
song2_status="";

leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;

function preload(){
song2=loadSound("Sunflower.mp3");
song1=loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(560, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
console.log("Posenet is on");
}
function gotPoses(results){
if (results.length >0){
  console.log(results);
  scoreleft=results[0].pose.keypoints[9].score;
  scoreright=results[0].pose.keypoints[10].score;
  console.log("Scoreleft=" +scoreleft+"Scoreright=" +scoreright);
  leftwristx=results[0].pose.leftWrist.x;
  leftwristy=results[0].pose.leftWrist.y;
  console.log("leftwristx = "+leftwristx+"leftwristy = "+leftwristy);
  rightwristx=results[0].pose.rightWrist.x;
  rightwristy=results[0].pose.rightWrist.y;
  console.log("rightwristx = "+rightwristx+"rightwristy = "+rightwristy);
}
}
function draw(){
image(video,0, 0, 560, 450);
song1_status=song1.isPlaying();
song2_status=song2.isPlaying();
fill("#00FF00");
stroke("#008000");
if (scoreleft > 0.2){
    circle(leftwristx, leftwristy, 20);
    song1.stop();
    if(song2_status == false){
    song2.play();
    document.getElementById("song").innerHTML="Song playing: Sunflower";
    }
}
if (scoreright > 0.2){
    circle(rightwristx, rightwristy, 20);
    song2.stop();
    if(song1_status == false){
    song1.play();
    document.getElementById("song").innerHTML="Song playing: Harry potter theme";
    }
}
}
function play(){
    song.play();
    song.setVolume(1);
}