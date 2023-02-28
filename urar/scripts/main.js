const scroller = document.querySelector(".scroller");
const info = document.querySelector(".info");
const startPage = document.querySelector(".startPage");

const slides = document.querySelectorAll(".container section");

window.addEventListener("scroll", () => {
    // console.log(".pageYOffset:", window.pageYOffset, ".innerHeight:", window.innerHeight)

    let scrollAmount = Math.round((window.pageYOffset / window.innerHeight) * 100) / 100;
    let scrollIndex = Math.floor(scrollAmount);
    // između 0.7 i 1.0 -> opacity transition 
    let scrollDifference = Math.round(((scrollAmount - scrollIndex)) * 100) / 100;


    if (scrollDifference > 0.5) {
        // scrollIndex+1 -> fade in,  0 -> 1
        fadeElement(slides[scrollIndex + 1], true, scrollDifference);
        // scrollIndex   -> fade out, 1 -> 0
        fadeElement(slides[scrollIndex], false, scrollDifference);

        if (scrollIndex >= 1) {
            // ima elemenata ispred trenutnog, uzmi ih u obzir
            for (let i = scrollIndex - 1; i >= 0; i--) {
                //  console.log(slides[i].className);
                slides[i].style.opacity = slides[i + 1].style.opacity / 2;
            }
        }
        // elementi iza trenutnog
        for (let j = scrollIndex + 2; j < slides.length; j++) {
            slides[j].style.opacity = slides[j - 1].style.opacity / 2;
        }

        info.innerHTML = `
        fadein: ${slides[scrollIndex + 1].className}, op:${slides[scrollIndex + 1].style.opacity}   <br>
        fadeout: ${slides[scrollIndex].className}, op:${slides[scrollIndex].style.opacity}   <br>
            `;

    }

    fadeoutStartPage(scrollAmount);
    turnRendgenLayers(scrollAmount)

    info.innerHTML = `top: ${scrollAmount} <br>
    scrollIndex: ${scrollIndex} <br>
    current page: ${slides[scrollIndex].className}<br>
    scrollDifference: ${scrollDifference} <br>
        `;



});

function turnRendgenLayers(scrollAmount) {
    if (scrollAmount > 1) {
        // console.log("turn off startPage");
        startPage.style.display = "none";
    } else {
        // console.log("turn on startPage");
        startPage.style.display = "block";
    }

    if (scrollAmount < 0.5) {
        // console.log("turn off rendgen layers");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
    } else {
        // console.log("turn on rendgen layers");
        for (let j = 0; j < slides.length; j++) {
            slides[j].style.display = "block";
        }
    }
}

function fadeElement(element, fadeIn, scrollDifference) {
    if (fadeIn == true) {
        element.style.opacity = scrollDifference;
    } else {
        element.style.opacity = 1 - (scrollDifference - 0.5);
    }
}


function fadeoutStartPage(scrollAmount) {
    // start fadeout(opacity=1), scroll=0.5 ili više
    // fadeout end(opacity=0), scroll=0.99 ili više

    const fadeInPoint = 0.5;
    const fadeOutPoint = 1;

    if (scrollAmount > fadeInPoint && scrollAmount < fadeOutPoint) {
        let opacityAmount = 1 - Math.round(((scrollAmount - fadeInPoint) / (1 - fadeInPoint)) * 100) / 100;
        // console.log("start page opacity ...")
        startPage.style.opacity = opacityAmount;
    }
}



function blurElement(element, blurAmount) {
    console.log("applyBlur...");
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        // // console.log("mobile device");
    } else {
        // false for not mobile device
        // console.log("not mobile device");
        el.style.filter = `blur(${blurAmount}px)`;
    }
}

// fix 100vh on mobile
const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
   }
   window.addEventListener("resize", documentHeight)
   documentHeight()