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
            let blurAmountIspred = 1;
            for (let i = scrollIndex - 1; i >= 0; i--) {
                //  console.log(slides[i].className);
                slides[i].style.opacity = slides[i + 1].style.opacity / 2;
                applyBlur(slides[i], blurAmountIspred *= 1.5);
            }
        }
        // elementi iza trenutnog
        let blurAmountIza = 1;
        for (let j = scrollIndex + 2; j < slides.length; j++) {
            slides[j].style.opacity = slides[j - 1].style.opacity / 2;
            applyBlur(slides[j], blurAmountIza *= 1.5);
        }

        // info.innerHTML = `
        // fadein: ${slides[scrollIndex + 1].className}, op:${slides[scrollIndex + 1].style.opacity}   <br>
        // fadeout: ${slides[scrollIndex].className}, op:${slides[scrollIndex].style.opacity}   <br>
        //     `;

    }

    fadeoutStartPage(scrollAmount);
    turnRendgenLayers(scrollAmount)
    applyBlur();

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
        applyBlur(element, 1 - (scrollDifference));
    } else {
        applyBlur(element, scrollDifference);
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



function applyBlur(element, blurAmount) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // // console.log("mobile device");
    } else {
        // console.log("not mobile device");
        
        // get index of slides with opacity > 0.75 this one is in focus
        // if opacity > 0.9, blur = 0
        // next to focus item, blur +30%, end every other item +30%
        
        // const opacityArray = [];
        
        // for (let i = 0; i < slides.length; i++) {
            //     opacityArray.push(Number(slides[i].style.opacity));
            // }
            
            // const highestOpacity = Math.max(...opacityArray);
            // const highestOpacityIndex = opacityArray.indexOf(highestOpacity);
            
            // console.log("highestOpacity", highestOpacity);
            // console.log("highestOpacityIndex", highestOpacityIndex);
            
            // // if layer in focus, blur = 0
            // if(highestOpacity > 0.9 ){
        //     slides[highestOpacityIndex].style.filter = `blur(0px)`;
        // } 
        
        if (element != undefined){
            // console.log("applyBlur...",element);
            element.style.filter = `blur(${blurAmount}px)`;
        }
    }
}

// fix 100vh on mobile
const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
window.addEventListener("resize", documentHeight)
documentHeight()