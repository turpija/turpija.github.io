const watchSvg = document.querySelector("svg");

const anim = watchSvg.children["mehanizam"].children[`Layer3`].children["anim"].children[0];

for (let i = 1; i <= 10; i++) {
    // select groups with id=anim
    const animGroup = watchSvg.children["mehanizam"].children[`Layer${i}`].children["anim"];
    // console.log(`Layer${i}:`, animGroup)

    // change attributes of elements
    if (animGroup) {
        for (const el of animGroup.children) {
            // el.style.transition = "all 1s ease";
            el.style.fill = "#b9c9eb";
            // el.style.stroke = "black";
            // el.style.fillOpacity = 0.3;
            // el.style.filter = "blur(4px)";
        }
    }
}


//get range input
const layerFocus = document.querySelector("#layerFocus");
const layerFocusLabel = document.querySelector("#layerFocusLabel");

function blurAllChildren(Element, blurAmount, opacityAmount) {
    for (const el of Element.children) {
        el.style.filter = `blur(${blurAmount}px)`;
        el.style.opacity = opacityAmount;
    }
}

function focusLayers() {
    const ispred = layerFocus.value - layerFocus.min;
    const iza = layerFocus.max - layerFocus.value;
    const active = Number(layerFocus.value);
    
    if (ispred > 0) {
        let blurAmount = 1;
        let opacityAmount = 0.2;
        for (let i = active - 1; i > 0; i--) {
            blurAmount *= 1.5;
            opacityAmount /= 1.2;
            console.log("zabluraj layer:", i, "blurAmount=", blurAmount, "opacity:", opacityAmount);
            const layer = watchSvg.children["mehanizam"].children[`Layer${i}`];
            blurAllChildren(layer, blurAmount, opacityAmount);
        }
    }
    // console.log("fokusiraj layer:", active);
    const activeLayer = watchSvg.children["mehanizam"].children[`Layer${active}`];
    blurAllChildren(activeLayer, 0, 0.5);

    if (iza > 0) {
        let blurAmount = 1;
        let opacityAmount = 0.2;
        for (let j = active + 1; j <= 10; j++) {
            blurAmount *= 1.5;
            opacityAmount /= 1.2;
            console.log("zabluraj layer:", j, "blurAmount=", blurAmount, "opacity:", opacityAmount)
            const layer = watchSvg.children["mehanizam"].children[`Layer${j}`];
            blurAllChildren(layer, blurAmount, opacityAmount);
        }
    }
}

layerFocus.addEventListener("input", (() => {
    layerFocusLabel.innerHTML = String(layerFocus.value);
    focusLayers();
}));

focusLayers();