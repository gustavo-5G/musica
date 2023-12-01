som = ""
scoreLeftWristX = 0
scoreLeftWristY = 0
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

}
function draw() {
    image(video, 0, 0, 600, 500)
    fill("#FF0000")
    stroke("FF0000")
    circle(leftWristX, leftWristY, 20)
    isNumber = Number(leftWristX)
    remove = floor(isNumber)
    volume = remove / 500
    document.getElementById("volume").innerHTML = "volume e igual " + volume
    som.setVolume(volume)

    if (scoreLeftWristX > 0.2) {
        circle(leftWristX, leftWristY, 20)
        isNumber = Number(leftWristX)
        remove = floor(isNumber)
        volume = remove / 500
        document.getElementById("volume").innerHTML = "volume e igual " + volume
        som.setVolume(volume)
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
        scoreLeftWristX = results[0].pose.keypoints[9].score
        console.log(scoreLeftWristX)

        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("pulso esquerdo X e igual " + leftWristX + "pulso esquerdo Y e igual " + leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("pulso direito X e igual " + rightWristX + "pulso direito Y e igual " + rightWristY)
    }
}
