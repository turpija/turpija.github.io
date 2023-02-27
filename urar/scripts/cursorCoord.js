const theSvg = document.querySelector("svg");

let circle = createCircle();
var circleDiameter = parseInt(circle.style.width);

function createCircle() {
    const circle = document.createElement("div");
    circle.style.position = "absolute";
    circle.style.width = "100px";
    circle.style.height = "100px";
    circle.style.border = "0.5px solid red";
    circle.style.borderRadius = "50%";
    return circle;
}

function keyPressed(e){
    if (e.key == "+"){
        // console.log("povecaj krug")
        circleDiameter++;
        circle.style.width =`${circleDiameter}px`;
        circle.style.height =`${circleDiameter}px`;
    } else if (e.key == "-"){
        // console.log("smanji krug")
        circleDiameter--;
        circle.style.width =`${circleDiameter}px`;
        circle.style.height =`${circleDiameter}px`;
    }
}

function moveCircle(ev) {
    // console.log(circleDiameter);
    circle.style.left = `${ev.pageX}px`;
    circle.style.top = `${ev.pageY}px`;
}

document.body.appendChild(circle);

theSvg.addEventListener("mousemove", (e) => {
    console.log("x", e.offsetX+circleDiameter/2, "y", e.offsetY+circleDiameter/2);
    // console.log("x", e.offsetX, "y", e.offsetY);
    moveCircle(e);
});

window.addEventListener("keydown", keyPressed)





/////////////////////////************** */
