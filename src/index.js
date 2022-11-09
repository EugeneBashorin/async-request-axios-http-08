import "./styles/main.css";
import "./img/loupe.png";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchFormData = document.querySelector('#search-form');
const inputData = document.querySelector("input[name=searchQuery]");
const galleryPlace = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

const API_KEY = '30989027-ff1c7f924c0d6be10aa8f4236';

let page = 1;
let commonPage = 0;
let per_page = 40;
let firstRequest = true;

searchFormData.addEventListener('submit', submitFormDataHandler);
loadBtn.addEventListener('click', loadBtnHandler);

function submitFormDataHandler(event){
    event.preventDefault();

    const inputValue = inputData.value.trim(" ");
    if(inputValue === ""){
        return;
    }

    clearElementData(galleryPlace);
    hideLoadBtn();
    firstRequest = true;
    getImgArray(inputValue, firstRequest).then(data => {

        if(data.total === 0){
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            hideLoadBtn();
            return;
        }
        if(data.totalHits > 0){
            Notify.success(`Hooray! We found ${data.total} images.`);
        }
        
        commonPage = data.totalHits/per_page;
        const arrData = data.hits;
        const markup = getMarkup(arrData);
        appendMarkup(galleryPlace, markup);
        showLoadBtn();
    }).catch(error => console.log(error));
}

function getImgArray(request, requestState){
    if(requestState){
        page = 1;
    }else{
        page +=1;
    }

    const pageParams = new URLSearchParams({
            per_page: per_page,
            page: page,
        })
    
    return fetch(`https://pixabay.com/api/?${pageParams}&key=${API_KEY}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(result => {
        if(!result.ok){
            throw new Error(Response.status);
        }
        return result.json()})
    .then(data => data);
}

function loadBtnHandler(event){
    event.preventDefault();
    const inputValue = inputData.value.trim(" ");
    firstRequest = false;
    getImgArray(inputValue, firstRequest).then(data => {
        const arrData = data.hits;
        const markup = getMarkup(arrData);
        appendMarkup(galleryPlace, markup);
    }).catch(error => console.log(error));
}

function getMarkup(dataArr){
    let stringMarkup = dataArr.map(element =>
        `<div class="photo-card">
            <div class="post-thumb">
                <img src=${element.webformatURL} alt=${element.tags} loading="lazy" />
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

function appendMarkup(place, data){
    place.insertAdjacentHTML("beforeend", data)
}

function clearElementData(element){
    element.textContent = "";
}

function showLoadBtn(){
    loadBtn.classList.add("is-active");
}
function hideLoadBtn(){
    loadBtn.classList.remove("is-active");
}