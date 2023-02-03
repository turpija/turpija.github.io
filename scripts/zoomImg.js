

function createDuplicateImg(origImg){
    // console.dir(origImg);
    const img = new Image(); 
    img.src = origImg.src;
    img.style.position = "absolute";

    img.style.left = `${origImg.offsetLeft}px`;
    img.style.top = `${origImg.offsetTop}px`;

    origImg.parentElement.append(img);

    return img;
}

function resizeToFullScreen(newImg){
    console.dir(newImg)
    newImg
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