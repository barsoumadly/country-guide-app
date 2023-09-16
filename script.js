'use strict';

// selecting text input
const inputEl = document.getElementById('country-inp');

// selecting container
const resultEl = document.getElementById('result');

// selecting button
const btnSearch = document.getElementById('search-btn');

const checkInputValidation = function () {
  if (inputEl.value !== '') {
    return true;
  }
  return false;
};

const printInvalidMessage = function (message) {
  resultEl.innerHTML = `<div class="invalid-message">${message}</div>`;
};

const renderCountry = function (data) {
  resultEl.innerHTML = `
  <img src="${data.flag}" class="flag-img" />
  <h2>${data.name}</h2>
  <div class="wrapper">
   <div class="data-wrapper">
    <h4>Capital:</h4>
    <span>${data.capital}</span>
   </div>
  </div>
  <div class="wrapper">
   <div class="data-wrapper">
    <h4>Continent:</h4>
    <span>${data.region}</span>
   </div>
  </div>
  <div class="wrapper">
   <div class="data-wrapper">
    <h4>Population:</h4>
    <span>${(+data.population / 1000000).toFixed(1)}M</span>
   </div>
  </div>
  <div class="wrapper">
    <div class="data-wrapper">
     <h4>Currency:</h4>
     <span>${data.currencies[0].name} - 
     ${data.currencies[0].code}</span>
    </div>
  </div>
  <div class="wrapper">
   <div class="data-wrapper">
    <h4>Common Languages:</h4>
    <span>${data.languages[0].name}</span>
   </div>
  </div>`;
};

// fetch data from API (restcountries.com)
const fetchData = function (countryName) {
  return new Promise(function (resolve, reject) {
    fetch(`https://restcountries.com/v2/name/${countryName}`)
      .then(response => resolve(response))
      .catch(() => reject(new Error('Lost internet connection')));
  });
};

const getCountryData = async function (countryName) {
  try {
    const response = await fetchData(countryName);
    let data;

    // handle if country not found
    if (!response.ok) {
      throw new Error('Country not found!');
    }

    // handle inida country
    if (countryName.toLowerCase() === 'india') {
      [, data] = await response.json();
    } else {
      [data] = await response.json();
      // console.log(data);
    }
    renderCountry(data);
  } catch (error) {
    console.error(error.message);
    printInvalidMessage(error.message);
  }
};

const search = function () {
  if (checkInputValidation()) {
    getCountryData(inputEl.value);
  } else {
    printInvalidMessage('Please! enter country name');
  }
  inputEl.value = '';
};

// search for country
btnSearch.addEventListener('click', search);
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    search();
  }
});
