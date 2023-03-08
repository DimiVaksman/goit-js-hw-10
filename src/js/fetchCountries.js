
// const URL = 'https://restcountries.com/v2/name/'

const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages,',
});

// export const fetchCountries = (name) => {

//     return fetch(`${URL}${name}${searchParams}`)
//      .then(response => {
//          return response.json()
//      }).then(country => {
//          console.log(country)
//      }).catch(error => {
//          console.log(error)
//      })
//  }