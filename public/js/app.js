const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#errorMsg');
const address = document.querySelector('#address')
const forecast = document.querySelector('#forecast')
const temperature = document.querySelector('#temperature')
const feelslike = document.querySelector('#feelslike')
const precip = document.querySelector('#precip')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error;
            } else {
                address.textContent = data.location;
                forecast.textContent = data.forecast; 
                temperature.textContent = data.temperature;
                feelslike.textContent = data.feelslike;
                precip.textContent = data.precip;
            }
        });
    })
});