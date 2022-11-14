import "./styles/main.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {fetchImgArray} from "./fetchImgRequest"
import {showLoadBtn, hideLoadBtn} from "./btnVisible";
import {appendMarkup, clearElementData, getMarkup} from "./markupTools";
import {getQueryData} from "./queryTools"

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchFormData = document.querySelector('#search-form');
const loadBtn = document.querySelector('.load-more');

const inputData = document.querySelector("input[name=searchQuery]");
const galleryPlace = document.querySelector('.gallery');

let currentPage = 1;

searchFormData.addEventListener('submit', submitFormDataHandler);
loadBtn.addEventListener('click', loadBtnHandler);
let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: '250',
})

function submitFormDataHandler(event){
    event.preventDefault();

    const inputValue = getQueryData(inputData);
    if(inputValue === ""){
        return;
    }

    clearElementData(galleryPlace);
    hideLoadBtn(loadBtn);
    currentPage = 1;

    fetchImgArray(inputValue, currentPage).then(data => {

        if(data.total === 0){
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            hideLoadBtn(loadBtn);
            return;
        }
        Notify.success(`Hooray! We found ${data.total} images.`);
        const arrData = data.hits;
        const markup = getMarkup(arrData);
        appendMarkup(galleryPlace, markup);
        showLoadBtn(loadBtn);
        gallery. ();
    }).catch(error => console.log(error));
}

function loadBtnHandler(event){
    event.preventDefault();
    const inputValue = getQueryData(inputData);
    currentPage += 1;
    fetchImgArray(inputValue, currentPage).then(data => {
        const arrData = data.hits;
        const markup = getMarkup(arrData);
        appendMarkup(galleryPlace, markup);
        gallery.refresh();
    }).catch(error => console.log(error));
}