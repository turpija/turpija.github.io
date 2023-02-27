const tekst = document.querySelector(".tekstContainer");
const page2 = tekst.children[1]



window.addEventListener("scroll", () => {
    let scrollAmount = Math.round((window.pageYOffset / window.innerHeight) * 100) / 100;

    for (let i = 0; i < tekst.children.length; i++) {
        const page = tekst.children[i];
        
        if (scrollAmount > page.dataset.start && scrollAmount < page.dataset.end ) {
            page.classList.add("fadein");
        } else {
            page.classList.remove("fadein");
        }
    }



});