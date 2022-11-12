import "./styles/main.css";
import "./img/loupe.png";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {showLoadBtn, hideLoadBtn} from "./btnVisible";
import {appendMarkup, clearElementData, getMarkup} from "./markupTools";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

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

galleryPlace.addEventListener("click", event => {
    event.preventDefault();
    if(event.target.nodeName !== "IMG"){
        return;
        }
            let gallery = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: '250',
        });
            gallery.on('show.simplelightbox');
    })

function submitFormDataHandler(event){
    event.preventDefault();

    const inputValue = inputData.value.trim(" ");
    if(inputValue === ""){
        return;
    }

    clearElementData(galleryPlace);
    hideLoadBtn(loadBtn);
    firstRequest = true;
    getImgArray(inputValue, firstRequest).then(data => {

        if(data.total === 0){
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            hideLoadBtn(loadBtn);
            return;
        }
        if(data.totalHits > 0){
            Notify.success(`Hooray! We found ${data.total} images.`);
        }
        
        commonPage = data.totalHits/per_page;
        const arrData = data.hits;
        const markup = getMarkup(arrData);
        appendMarkup(galleryPlace, markup);
        showLoadBtn(loadBtn);
    }).catch(error => console.log(error));
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