som = ""
scoreLeftWrist = 0
scoreRightWrist = 0
leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0


function preload() {
    som = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose",gotResults)
}
function draw() {
    image(video, 0, 0, 600, 500)
    fill("#FF0000")
    stroke("FF0000")
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20)
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Velocidade é igual a 0.5 X"
            som.rate(0.5)
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Velocidade é igual a 1 X"
            som.rate(1)
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Velocidade é igual a 1.5 X"
            som.rate(1.5)
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Velocidade é igual a 2 X"
            som.rate(2)
        }
        else if(rightWristY > 400){
            document.getElementById("speed").innerHTML = "Velocidade é igual a 2.5 X"
            som.rate(2.5)
        }
        if (scoreLeftWrist > 0.2) {
            circle(rightWristX, rightWristY, 20)
            isNumber = Number(leftWristY)
            remove = floor(isNumber)
            volume = remove / 500
            document.getElementById("volume").innerHTML = "volume e igual " + volume
            som.setVolume(volume)
        }
    }
}
function play() {
    som.play()
    som.setVolume(1)
    som.rate(1)
}


function modelLoaded() {
    console.log("poseNet inicializado")
}
function gotResults(results) {
    if (results.lenght > 0) {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        scoreRightWrist = results[0].pose.keypoints[10].score
        console.log(scoreLeftWrist)

        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("pulso esquerdo X e igual " + leftWristX + "pulso esquerdo Y e igual " + leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("pulso direito X e igual " + rightWristX + "pulso direito Y e igual " + rightWristY)
    }
}
