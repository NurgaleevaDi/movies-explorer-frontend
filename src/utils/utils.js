import { DURATION } from "./constants";
import {
    MAXIMUM_MOVIES_1280,
    MAXIMUM_MOVIES_768,
    MAXIMUM_MOVIES_320,
    AMOUNT_1280,
    AMOUNT_768,
    AMOUNT_320
} from "./constants";


export function searchFilter(movies, keyWord, isShorts) {
    if (!movies) {
        return [];  
    }
    let filtered = [...movies];
    if (keyWord) {
        filtered = filtered.filter((element) => element.nameRU
        .toLowerCase()
        .includes(keyWord.toLowerCase()))
    }
    if(isShorts) {
        return filtered.filter((element) => element.duration <= DURATION);
    }
    return filtered;
}

export function setTemplate() {
   
    const width = window.innerWidth;
    
    if (width >= 1280) {
        return [MAXIMUM_MOVIES_1280, AMOUNT_1280];
    } else if (width >= 768) {
        return [MAXIMUM_MOVIES_768, AMOUNT_768];
    } else if (width >= 320) {
        return [MAXIMUM_MOVIES_320, AMOUNT_320];
    } else {
        return [MAXIMUM_MOVIES_320, AMOUNT_320];
    }
}