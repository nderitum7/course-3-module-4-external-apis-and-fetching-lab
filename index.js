// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const stateInput = document.querySelector('#state-input');
const fetchButton = document.querySelector('#fetch-alerts');
const alertsDisplay = document.querySelector('#alerts-display');
const errorMessage = document.querySelector('#error-message');

async function fetchAlerts(stateAbbr) {
  alertsDisplay.innerHTML = '';
  errorMessage.textContent = '';
  errorMessage.classList.add('hidden');
  const data = await response.json();
console.log(data);

  try {
    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${stateAbbr}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather alerts');
    }

    const data = await response.json();

    alertsDisplay.innerHTML = `<h2>${data.title}: ${data.features.length}</h2>`;

    data.features.forEach(alert => {
      const headline = document.createElement('p');
      headline.textContent = alert.properties.headline;
      alertsDisplay.appendChild(headline);
    });
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
}

fetchButton.addEventListener('click', async () => {
  const stateAbbr = stateInput.value.trim().toUpperCase();

  // Clear the input after clicking.
  stateInput.value = '';

  // Validate the state abbreviation.
  if (!/^[A-Z]{2}$/.test(stateAbbr)) {
    alertsDisplay.innerHTML = '';
    errorMessage.textContent =
      'Please enter a valid two-letter state abbreviation.';
    errorMessage.classList.remove('hidden');
    return;
  }

  await fetchAlerts(stateAbbr);
});
