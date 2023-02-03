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
    newImg.style.transform = "scale(1)";
    newImg.style.transition = "all 0.2s ease-in-out";
    window.setTimeout(() => {
        newImg.style.transform = "scale(2)";
    }, 100);
    console.log(newImg.style);

}

function clickedImage(e) {
    e.preventDefault();
    image = e.target;
    // console.log(image);
    newImg = createDuplicateImg(e.target);
    resizeToFullScreen(newImg);
}

function addClickEvents() {
    const images = document.querySelectorAll(".zoomImg");
    // console.log(images);

    images.forEach((image) => {
        image.addEventListener("click", clickedImage)
    })
}

addClickEvents();