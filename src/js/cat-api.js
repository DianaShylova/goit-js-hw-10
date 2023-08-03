import Notiflix from "notiflix";

const BASE_URL = "https://api.thecatapi.com/v1"
const SEARCH_URL = "https://api.thecatapi.com/v1/images/search"
const   API_KEY = "live_mHh23BLeHps2FezeIDK3DUuZLXgIpvs8pW8rIMJs2rM6o1WlVOTdgNPssh2vduVG"
const END_POINT = "/breeds";   
const options = {
        headers: {
            'x-api-key': API_KEY,
        },
    }
export function fetchBreeds() {
    const url = `${BASE_URL}${END_POINT} ` ;
    return fetch(url, options).then(res => {
        if (!res.ok) {
            throw new Error('Oops! Something went wrong! Try reloading the page!')
        }
        return res.json();
    });   
        
}

export function fetchCatByBreed(breedId) {
    return fetch(`${SEARCH_URL}?breed_ids=${breedId}&api_key=${API_KEY}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Oops! Something went wrong! Try reloading the page!')
            }
            return res.json();
        });
}

