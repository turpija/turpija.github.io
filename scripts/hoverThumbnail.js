const links = document.querySelectorAll("[data-thumb]");

// console.log(thumbnail);

function mouseOverLink(ev) {
    const currentLink = ev.srcElement;
    const thumb = createThumbnail();
    thumb.style.left = `${ev.pageX+15}px`;
    thumb.style.top = `${ev.pageY+25}px`;
    document.body.appendChild(thumb);
    currentLink.addEventListener("mouseout", () => {
        thumb.remove();
    })
}


function hoverLink(ev) {
    // console.log(ev.pageX);
    // thumb.style.left = `${ev.pageX+15}px`;
    // thumb.style.top = `${ev.pageY+25}px`;
}


function createThumbnail() {
    const thumb = document.createElement("div");
    thumb.innerHTML = "thumb";
    thumb.style.width = "150px";
    thumb.style.height = "100px";
    thumb.style.backgroundColor = "grey";
    thumb.style.position = "absolute";
    thumb.style.left = `100px`;
    thumb.style.top = `100px`;
    return thumb;
}

function removeThumbnail(thumb, linkElement) {
    // console.log(linkElement);
    window.removeEventListener("mousemove", setPosition);
    linkElement.removeEventListener("mouseout", removeThumbnail);
    thumb.remove();
    console.log("remove thumbnail");
    // console.log(thumb);
}

links.forEach((link) => {
    link.addEventListener("mouseover", mouseOverLink);
    link.addEventListener("mousemove", hoverLink);
});