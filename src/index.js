import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './js/fetchCountries'
import Notiflix from 'notiflix';



const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
    body: document.querySelector('body'),

}


refs.countryList.style.visibility = 'hidden'
refs.countryInfo.style.visibility = 'hidden'



refs.inputEl.addEventListener('input' , debounce(onGetCountries,DEBOUNCE_DELAY));

     function onGetCountries (e) {

       e.preventDefault()
       const searchCountries = e.target.value.trim();

       if(!searchCountries){
        refs.countryList.style.visibility = 'hidden'
        refs.countryInfo.style.visibility = 'hidden'
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
       }

       fetchCountries(searchCountries)
       .then(res => {
        if(res.length > 10){
            Notiflix.info.failure('Too many matches found. Please, enter a more specific name.')
            return;
        }

        render(res);
       })
       .catch(error =>{
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
        return
       })
     }

function render(res){
const letters = res.length
if(letters ===1){
    refs.countryList.innerHTML = '';
    refs.countryList.style.visibility = 'hidden'
    refs.countryInfo.style.visibility = 'visible'
    countryInfoMarkup(res)
}
if(letters > 1 && letters <= 10){
    refs.countryInfo.innerHTML = '';
    refs.countryList.style.visibility = 'visible'
    refs.countryInfo.style.visibility = 'hidden'
    countryListMarkup(res)
}
}

     function countryListMarkup(res) {
        const listCountry = res.map((({name, flags}) => {
            return `<li>
            <img src="${flags.svg}" alt="${name}" width="60" height="auto">
            <span class='country'>${name.official}</span>
          </li>`
        })).join('');
        refs.countryList.innerHTML = listCountry;
        return listCountry
     }

     function countryInfoMarkup(res) {
        const info = res.map((({name,capital,population,flags,languages}) => {
            languages = Object.values(languages).join(", ");
            return `
            <img class="flag" src="${flags.svg}" alt="${name}"
            <p><span class="name">${name.official}</span></p>
            <p class="label">capital: <span class="info">${capital}</span></p>
            <p class="label">population: <span class="info">${population}</span></p>
            <p class="label">languages: <span class="info">${languages}</span></p>  
            `
        })).join('');
        refs.countryInfo.innerHTML = info;
        return info
     }


