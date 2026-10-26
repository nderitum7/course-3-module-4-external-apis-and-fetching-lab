
const stateInput = document.getElementById('state-input');
const fetchButton = document.getElementById('fetch-alerts');
const alertsDisplay = document.getElementById('alerts-display');
const errorMessage = document.getElementById('error-message');

function displayAlerts(data) {
  alertsDisplay.innerHTML = '';

  const summary = document.createElement('h2');
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.appendChild(summary);

  data.features.forEach(alert => {
    const headline = document.createElement('p');
    headline.textContent = alert.properties.headline;
    alertsDisplay.appendChild(headline);
  });
}

function fetchWeatherAlerts(state) {
  alertsDisplay.innerHTML = '';
  errorMessage.textContent = '';
  errorMessage.classList.add('hidden');

  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather alerts');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      displayAlerts(data);
      errorMessage.textContent = '';
      errorMessage.classList.add('hidden');
    })
    .catch(errorObject => {
      console.log(errorObject.message);
      errorMessage.textContent = errorObject.message;
      errorMessage.classList.remove('hidden');
    });
}

fetchButton.addEventListener('click', () => {
  const state = stateInput.value.trim().toUpperCase();

  stateInput.value = '';
  alertsDisplay.innerHTML = '';

  if (!/^[A-Z]{2}$/.test(state)) {
    errorMessage.textContent = 'Please enter a valid two-letter state abbreviation.';
    errorMessage.classList.remove('hidden');
    return;
  }

  fetchWeatherAlerts(state);
});
