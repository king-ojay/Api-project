const quotesUrl = 'https://currency-exchange.p.rapidapi.com/listquotes';
const rateUrl = 'https://currency-exchange.p.rapidapi.com/exchange';
const headers = {
  'x-rapidapi-key': '82fa12159bmsh479216afb44a346p123cf7jsn3b54e8dba6f0',
  'x-rapidapi-host': 'currency-exchange.p.rapidapi.com'
};

// Fetch available currencies and populate dropdowns
async function fetchCurrencies() {
  try {
    const response = await fetch(quotesUrl, { method: 'GET', headers });
    const currencies = await response.json();
    
    const currency1 = document.getElementById('currency1');
    const currency2 = document.getElementById('currency2');
    
    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      
      option1.value = currency;
      option1.text = currency;
      option2.value = currency;
      option2.text = currency;
      
      currency1.add(option1);
      currency2.add(option2);
    });
  } catch (error) {
    console.error('Error fetching currencies:', error);
  }
}

// Fetch exchange rate between selected currencies
async function fetchRate() {
  const currency1 = document.getElementById('currency1').value;
  const currency2 = document.getElementById('currency2').value;

  if (!currency1 || !currency2) {
    document.getElementById('result').innerText = 'Please select both currencies.';
    return;
  }

  const url = `${rateUrl}?from=${currency1}&to=${currency2}&q=1`;

  try {
    const response = await fetch(url, { method: 'GET', headers });
    const rate = await response.text();

    document.getElementById('result').innerText = `1 ${currency1} = ${rate} ${currency2}`;
  } catch (error) {
    console.error('Error fetching rate:', error);
    document.getElementById('result').innerText = 'Error fetching rate. Please try again.';
  }
}

// Populate currencies on page load
window.onload = fetchCurrencies;
