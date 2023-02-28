const tekst = document.querySelector(".tekstContainer");


window.addEventListener("scroll", () => {
    let scrollAmount = Math.round((window.pageYOffset / window.innerHeight) * 100) / 100;
    
    for (let i = 1; i < tekst.children.length; i++) {
        const page = tekst.children[i];
        
        if (scrollAmount > page.dataset.start && scrollAmount < page.dataset.end ) {
            page.classList.add("fadein");
        } else {
            page.classList.remove("fadein");
        }
    }
    
    const page1 = tekst.children[0];
    
    if (scrollAmount > page1.dataset.end ) {
        page1.classList.add("fadeout");
    }


});