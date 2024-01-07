const redBall = document.querySelector("#red-ball"),
    blueBall = document.querySelector("#blue-ball"),
    ground = document.querySelector("#ground"),
    wall = document.querySelector("#wall");

let redBallBottom = parseInt(window.getComputedStyle(redBall).getPropertyValue("bottom")),
    redBallRight = parseInt(window.getComputedStyle(redBall).getPropertyValue("right")),
    redBallLeft = parseInt(window.getComputedStyle(redBall).getPropertyValue("left")),
    redBallTop = parseInt(window.getComputedStyle(redBall).getPropertyValue("top"))
redBallWidth = parseInt(window.getComputedStyle(redBall).getPropertyValue("width")),
    groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue("bottom")),
    groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue("height")),
    groundWidth = parseInt(window.getComputedStyle(ground).getPropertyValue("width"));

let upTime = 0,
    downTime = 0,
    isJumping = false;
redBall.addEventListener("click", e => {
    redBall.style.backgroundColor = "blue"
});

// function StopBall() {
//     if (redBallRight >= groundWidth) redBall.style.right = groundWidth;
//     if (redBallLeft <= 30) redBall.style.left = 0;
//     if (redBallTop >= groundHeight * 4) redBall.style.top = groundWidth * 4;
//     if (redBallBottom <= groundHeight) redBall.style.bottom = groundHeight;

//     console.log("ball right: ", redBallRight, "ball left: ", redBallLeft, "ball top: ", redBallTop, "ball bottom: ", redBallBottom);
// }

function Jump() {
    // StopBall();
    if (isJumping) return;

    upTime = setInterval(() => {
        if (redBallBottom >= groundHeight + 300) {
            clearInterval(upTime);

            downTime = setInterval(() => {
                if (redBallBottom < groundHeight - 10) {
                    clearInterval(downTime);
                    isJumping = false;
                }
                redBallBottom -= 5;
                redBall.style.bottom = redBallBottom + "px";

            }, 20);
        }
        redBallBottom += 10;
        redBall.style.bottom = redBallBottom + "px";

        isJumping = true;
    }, 35);
}

function MovingRight() {
    // StopBall();
    upTime = setInterval(() => {
        if (redBallRight >= groundWidth - 40) { clearInterval(upTime); return; }
        // console.log("ball right: ", redBallRight, "ground width: ", groundWidth)
        redBallRight += 20;
        redBall.style.left = redBallRight + "px";
    }, 35);
}

function MovingLeft() {
    // StopBall();
    upTime = setInterval(() => {
        if (redBallLeft <= 40) { clearInterval(upTime); return; }
        // console.log("ball left: ", redBallLeft, "ground width: ", groundWidth)
        redBallLeft -= 20;
        redBall.style.left = redBallLeft + "px";
    }, 35);
}

function control(e) {
    switch (e.key) {
        case " ":
        case "ArrowUp": Jump(); break;
        case "D":
        case "ArrowRight": MovingRight(); break;
        case "A":
        case "ArrowLeft": MovingLeft(); break;
    }

}

document.addEventListener("keydown", control);