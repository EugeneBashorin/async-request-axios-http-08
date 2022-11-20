import "./styles/main.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
 
import {fetchImgArray} from "./fetchImgRequest"
import {appendMarkup, clearElementData, getMarkup} from "./markupTools";
import {getQueryData} from "./queryTools"
import {observer, observerElement} from "./scrollTracker";

import {gallery} from "./simpleLightboxSettings"

export let currentPage = null;
export let per_page = 12;

const searchFormData = document.querySelector('#search-form');
export const inputData = document.querySelector("input[name=searchQuery]");
const galleryPlace = document.querySelector('.gallery');

searchFormData.addEventListener('submit', submitFormDataHandler);

async function submitFormDataHandler(event){
    event.preventDefault();
    const inputValue = getQueryData(inputData);
    if(inputValue === ""){
        return;
    }
    clearElementData(galleryPlace);
    currentPage = 1;
    try{
        const ObjImages = await fetchImgArray(inputValue);
        if(ObjImages.total === 0){
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        Notify.success(`Hooray! We found ${ObjImages.total} images.`);
        const markup = getMarkup(ObjImages.hits);
        appendMarkup(galleryPlace, markup);
        //Add scroll-observer to add more img
        observer.observe(observerElement);      
        gallery.refresh();
    }catch(error){
         console.log(error)
    }
}

export async function loadMoreImages(){
    try{
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