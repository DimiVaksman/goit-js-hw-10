
const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages,',
});
const URL = 'https://restcountries.com/v3.1/name/'


export const fetchCountries = (name) => {

    return fetch(`${URL}${name}?${searchParams}`)
     .then(response => {
        if(response.status === 404){
            throw new Error(response.status);
        }
         return response.json()
     })
 }