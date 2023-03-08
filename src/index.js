import './css/styles.css';
// import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages,',
});

const URL = 'https://restcountries.com/v3.1/name/'

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
    body: document.querySelector('body'),

}

refs.countryList.style.visibility = 'hidden'
refs.countryInfo.style.visibility = 'hidden'



const fetchCountries = (name) => {

        return fetch(`${URL}${name}?${searchParams}`)
         .then(response => {
            if(response.status === 404){
                throw new Error(response.status);
            }
             return response.json()
             .then(data => {console.log(data)})
             .catch(error => {console.log(error)})
         })
     }


     refs.inputEl.addEventListener('input' , debounce(onGetCountries,DEBOUNCE_DELAY));



     function onGetCountries (e) {

       e.preventDefault()
       const searchCountries = e.target.value.trim();

       if(!searchCountries){
        refs.countryList.style.visibility = 'hidden'
        refs.countryInfo.style.visibility = 'hidden'
        refs.countryList.innerHTML = '';
        crefs.countryInfo.innerHTML = '';
        return;
       }

       fetchCountries(searchCountries)
     }