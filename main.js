timer_counter = 0;
array_1 = ['pen', 'book', 'paper', 'bottle']
random_no = Math.floor((Math.random()*array_1.length)+1);
sketch = array_1[random_no];
console.log(sketch)
document.getElementById("sketch").innerHTML = 'Sketch to be drawn: ' + sketch;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
function updateCanvas(){ 
    background("white");
    random_no = Math.floor((Math.random()*array_1.length)+1);
    sketch = array_1[random_no];
    console.log(sketch)
    document.getElementById("sketch").innerHTML = 'Sketch to be drawn: ' + sketch;
   
}
function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}
function draw(){
    check_sketch()
    if(my_sketch == sketch){
        answer_holder = "set";
        score = score + 1;
        document.getElementById('score').innerHTML = "Score: " + score;

    } 
    strokeWeight(10);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
function check_sketch(){
    timer_counter ++;
    document.getElementById('timer').innerHTML = "Timer: " + timer_counter;
    console.log(timer_counter)
    if(timer_counter>3000){
        timer_counter = 0;
        timer_check = "completed";
        if(timer_check == "completed"||answer_holder == "set"){
            timer_check == "";
            answer_holder = "";
            updateCanvas();
        }
    }
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        drawn_sketch = results[0].label
        document.getElementById('my_sketch').innerHTML = "Label: " + drawn_sketch;
        document.getElementById('confidence').innerHTML= "Confidence: " + Math.round(results[0].confidence * 100) + "%";
        utterThis = new SpeechSynthesisUtterance(drawn_sketch);
        synth.speak(utterThis);
    }
}