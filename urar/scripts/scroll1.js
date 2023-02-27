const content = document.querySelector(".content");
const reveals = document.querySelectorAll(".content section");
const watchContainer = document.querySelector(".watchBackground");
const satBrojcanik = document.querySelector(".sat");


// detects what page/layer are you looking at
function reveal() {
    for (var i = 0; i < reveals.length; i++) {
        const messageDiv = reveals[i].querySelector(".message");

        if (reveals[i].getBoundingClientRect().y == 0) {
            // console.log("fokus je na:", reveals[i].className);
            messageDiv.classList.add("active");

            // ako je u fokusu prva stranica (layer10), upali brojcanik
            if (reveals[i].className == "layer10") {
                // console.log("upali brojcanik");
                satBrojcanik.style.opacity = 1;
            } else {
                // console.log("ugasibrojcanik");
                satBrojcanik.style.opacity = 0;
                // console.log("postavi layer na aktivnu stranicu:", reveals[i].className);
                const layerBr = reveals[i].className.slice(5);
                layerFocus.value = Number(layerBr);
                layerFocus.dispatchEvent(new Event("input"));
            }
        } else {
            //ugasi animaciju na ostalima
            messageDiv.classList.remove("active");
        }
    }
}

var delayedExec = function (after, fn) {
    var timer;
    return function () {
        timer && clearTimeout(timer);
        timer = setTimeout(fn, after);
    };
};

var scrollStopper = delayedExec(100, function () {
    // console.log('stopped it');
    reveal()
});

content.addEventListener("scroll", scrollStopper);