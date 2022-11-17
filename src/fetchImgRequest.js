import axios from "axios";
import{currentPage, per_page} from "./index.js"
const MAIN_URL = 'https://pixabay.com/api/';
const API_KEY = '30989027-ff1c7f924c0d6be10aa8f4236';

export async function fetchImgArray(request){
    const pageParams = new URLSearchParams({
        per_page: per_page,
        page: currentPage,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: request,
    })
    try{
        const imgDataObjParse = await axios.get(`${MAIN_URL}?${pageParams}`)
        return imgDataObjParse.data;
    }catch(error){
        console.error(error);
    }
}