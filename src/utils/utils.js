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
        return filtered.filter((element) => element.duration <= 40);
    }
    return filtered;
}