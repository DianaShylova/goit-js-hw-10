import SlimSelect from "slim-select";
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from "notiflix";

import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const refs = {
  selectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.load'),
  errorEl: document.querySelector('.error'),
  load: document.querySelector('.loader')
};

console.log(fetchBreeds().then());

fetchBreeds()
  .then(res => {
    renderMarkup(res.data);
    new SlimSelect({
      select: '.breed-select',
    });
    refs.selectEl.classList.remove('is-hidden');
  })
    .catch(error => {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    refs.errorEl.classList.remove('is-hidden');
  })
    .finally(() => refs.load.classList.add('is-hidden'));
  
   function createMarkup(array){
  const markup = array.map(({id, name})=>{
  return `<option value="${id}">${name}</option>`;
  }).join("")
  return markup;
   }

refs.selectEl.addEventListener('change', onSelectChange)
 
function onSelectChange(e){
    const userValue = e.currentTarget.value;
    
 refs.load.classList.remove('is-hidden');
  refs.loaderEl.classList.remove('is-hidden');
  refs.errorEl.classList.add('is-hidden');
    refs.catInfoEl.innerHTML = ""; 
 
    fetchCatByBreed(userValue)
.then(res => {
    renderCatMarkup(res.data[0]);
  })
.catch(() => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    refs.errorEl.classList.remove('is-hidden');
    console.log(error)})
.finally(() => {
    refs.loaderEl.classList.add('is-hidden');
    refs.load.classList.add('is-hidden');
  });
}

function createCatMarkup(data) {
  const catInfo = data.breeds[0]
  const { name, description, temperament } = catInfo;
  console.log(catInfo);
  return `<img src="${data.url}" alt="${name}" class = "cat__img"><h2 class = "cat__name">${name}</h2><p class = "cat__description">${description}</p><p class = cat__temperament>${temperament}</p>`;
}

function renderCatMarkup(data){
 const markup = createCatMarkup(data)
 refs.catInfoEl.innerHTML = markup;
}




