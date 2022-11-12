export function appendMarkup(place, data){
    place.insertAdjacentHTML("beforeend", data)
}

export function clearElementData(element){
    element.textContent = "";
}

export function getMarkup(dataArr){
    let stringMarkup = dataArr.map(element =>
        `<div class="photo-card">
            <div class="post-thumb">
            <a href=${element.webformatURL}><img src=${element.webformatURL} alt=${element.tags} loading="lazy" /></a>
            </div>
            <div class="info">
                <p class="info-item"><b>Likes</b> ${element.likes}</p>
                <p class="info-item"><b>Views</b> ${element.views}</p>
                <p class="info-item"><b>Comments</b> ${element.comments}</p>
                <p class="info-item"><b>Downloads</b> ${element.downloads}</p>
            </div>
        </div>`
    ).join("");
    return stringMarkup;
}