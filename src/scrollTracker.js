import {loadMoreImages} from "./index"

const observerElement = document.querySelector("#scroll-guard");

const options = {
    rootMargin: '0px',
    threshold: 1.0
}

const observer  = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){                
        loadMoreImages();
            }
        });
    }, options);

export{observer, observerElement}
