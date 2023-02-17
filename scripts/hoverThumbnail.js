const links = document.querySelectorAll("[data-thumb]");
let thumb;
// console.log(thumbnail);

function mouseOverLink(ev) {
    const currentLink = ev.srcElement;
    // console.dir(currentLink);

    thumb = createThumbnail(getImgUrl());
    thumb.style.left = `${ev.pageX+15}px`;
    thumb.style.top = `${ev.pageY+25}px`;
    document.body.appendChild(thumb);
    currentLink.addEventListener("mouseout", () => {
        thumb.remove();
    })
    
    function getImgUrl(){
        if (ev.srcElement.tagName == "I"){
            // take parent url data
            return ev.srcElement.parentElement.dataset.thumb;
            
        } else if(ev.srcElement.tagName == "A") {
            // return url data
            return ev.srcElement.dataset.thumb;
        }
        
    }
}


function hoverLink(ev) {
    // console.log(ev.pageX);
    thumb.style.left = `${ev.pageX+15}px`;
    thumb.style.top = `${ev.pageY+25}px`;
}


function createThumbnail(imgUrl) {
    const thumb = document.createElement("div");
    thumb.style.width = "150px";
    thumb.style.height = "100px";
    thumb.style.transition = "opacity 1s ease";
    thumb.style.backgroundImage = `url("${imgUrl}")`;
    thumb.style.backgroundSize = "cover";
    thumb.style.position = "absolute";
    thumb.style.left = `100px`;
    thumb.style.top = `100px`;
    thumb.classList.add("shadow");
    return thumb;
}

links.forEach((link) => {
    link.addEventListener("mouseover", mouseOverLink);
    link.addEventListener("mousemove", hoverLink);
});