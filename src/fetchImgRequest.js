const MAIN_URL = 'https://pixabay.com/api/';
const API_KEY = '30989027-ff1c7f924c0d6be10aa8f4236';
let per_page = 40;

export async function fetchImgArray(request, currentPage){
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
        const response = await fetch(`${MAIN_URL}?${pageParams}`);
        const imgDataObjParse = await response.json();
        return imgDataObjParse;
    }
    catch(error){
        return console.log(Error.message)
    }
}