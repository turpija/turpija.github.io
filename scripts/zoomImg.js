function createDuplicateImg(origImg) {
    // console.dir(origImg);
    const img = new Image();
    img.src = origImg.src;
    img.style.filter = origImg.style.filter;
    img.style.position = "absolute";
    img.style.zIndex = "50";

    const paddingLeft = parseInt(window.getComputedStyle(origImg).paddingLeft);
    const paddingTop = parseInt(window.getComputedStyle(origImg).paddingTop);
    const origImgLeft = origImg.getBoundingClientRect().left;
    const origImgTop = origImg.getBoundingClientRect().top;
    const scrollTopOffset = window.pageYOffset;

    img.style.left = `${origImgLeft+paddingLeft}px`;
    img.style.top = `${origImgTop+paddingTop+scrollTopOffset}px`;
    // console.log("boundingRect: ", origImg.getBoundingClientRect());
    // console.log("Yoffset: ", window.pageYOffset);

    const body = document.querySelector("body");
    body.append(img);
    return img;
}

function animation(img) {
    const prop = img.style.width;
    img.style.left = "0px";
    img.style.top = `${window.pageYOffset}px`;
    img.style.width = `${document.body.clientWidth}px`;

    function afterImageScale(e) {
        img.removeEventListener("transitionend", afterImageScale);
        console.log("after img resize ... do some tricks")
    };

    img.addEventListener("transitionend", afterImageScale);

}

/* remove this function .... */
function resizeToFullScreen(newImg, origImgwidth) {
    newImg.style.width = `${origImgwidth}px`;
    newImg.style.transition = "all .3s ease-in-out";
}

function clickedImage(e) {
    e.preventDefault();
    origImg = e.target;

    function origImgWidth() {
        const origImgWidthFull = parseInt(getComputedStyle(origImg).width);
        const origImgPaddingLeft = parseInt(getComputedStyle(origImg).paddingLeft)
        const origImgPaddingRight = parseInt(getComputedStyle(origImg).paddingRight);
        
        return origImgWidthFull - origImgPaddingLeft - origImgPaddingRight;
    }

    // console.log(origImgWidth());
    newImg = createDuplicateImg(e.target);
    resizeToFullScreen(newImg, origImgWidth());
    window.setTimeout(() => {
        animation(newImg)
    }, 20);
}

function addClickEvents() {
    const images = document.querySelectorAll(".zoomImg");
    // console.log(images);

    images.forEach((image) => {
        image.addEventListener("click", clickedImage)
    })
}

addClickEvents();

// const cardLeft = document.querySelector(".card .left");
// console.log("aktualy širina:",getComputedStyle(cardLeft).width);