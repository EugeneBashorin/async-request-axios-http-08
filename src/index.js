import "./styles/main.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {fetchImgArray} from "./fetchImgRequest"
import {showLoadBtn, hideLoadBtn} from "./btnVisible";
import {appendMarkup, clearElementData, getMarkup} from "./markupTools";
import {getQueryData} from "./queryTools"

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export let currentPage = 1;
export let per_page = 40;

const searchFormData = document.querySelector('#search-form');
const loadBtn = document.querySelector('.load-more');
const inputData = document.querySelector("input[name=searchQuery]");
const galleryPlace = document.querySelector('.gallery');

searchFormData.addEventListener('submit', submitFormDataHandler);
loadBtn.addEventListener('click', loadBtnHandler);
let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: '250',
})

async function submitFormDataHandler(event){
    event.preventDefault();
    const inputValue = getQueryData(inputData);
    if(inputValue === ""){
        return;
    }
    clearElementData(galleryPlace);
    hideLoadBtn(loadBtn);
    currentPage = 1;
    try{
        const ObjImages = await fetchImgArray(inputValue);
        
        if(ObjImages.total === 0){
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            hideLoadBtn(loadBtn);
            return;
        }
        Notify.success(`Hooray! We found ${ObjImages.total} images.`);
        const markup = getMarkup(ObjImages.hits);
        appendMarkup(galleryPlace, markup);
        showLoadBtn(loadBtn);
        gallery.refresh();
    }catch(error){
         console.log(error)
    }
}

async function loadBtnHandler(event){
    try{
        event.preventDefault();
        const inputValue = getQueryData(inputData);
        currentPage += 1;
        const imagesArr = await fetchImgArray(inputValue);
        const markup = getMarkup(imagesArr.hits);
        appendMarkup(galleryPlace, markup);
        gallery.refresh();
    }catch(error){
        console.log(error);
    }
}