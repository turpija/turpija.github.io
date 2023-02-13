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

function resizeToFullScreen(newImg) {
    const prop = newImg.style.width;
    newImg.style.left = "0px";
    newImg.style.top = `${window.pageYOffset}px`;
    newImg.style.width = `${document.body.clientWidth}px`;

    function afterImageScale(e) {
        newImg.removeEventListener("transitionend", afterImageScale);
        console.log("after img resize ... do some tricks")
    };

    newImg.addEventListener("transitionend", afterImageScale);

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

    console.log(origImgWidth());
    newImg = createDuplicateImg(e.target);
    // resizeToFullScreen(newImg, origImgWidth());
    newImg.style.width = `${origImgWidth()}px`;
    console.log(newImg.style.width);
    newImg.style.transition = "all .3s ease-in-out .5s";
    window.setTimeout(() => {
        resizeToFullScreen(newImg)
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