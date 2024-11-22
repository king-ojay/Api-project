// Fetch and populate currency options
async function getCurrencyOptions() {
    const url = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '82fa12159bmsh479216afb44a346p123cf7jsn3b54e8dba6f0',
            'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse JSON
        const currencyList = Object.keys(result.rates); // Extract currencies
        populateCurrencyDropdowns(currencyList);
    } catch (error) {
        console.error('Error fetching currency options:', error);
    }
  }
  
  function populateCurrencyDropdowns(currencyList) {
    const inputCurrencyFrom = document.getElementById('inputCurrencyFrom');
    const inputCurrencyTo = document.getElementById('inputCurrencyTo');
  
    inputCurrencyFrom.innerHTML = '';
    inputCurrencyTo.innerHTML = '';
  
    for (const currency of currencyList) {
        const option = document.createElement('option');
        option.value = currency;
        option.text = currency;
        inputCurrencyFrom.appendChild(option);
        const optionClone = option.cloneNode(true);
        inputCurrencyTo.appendChild(optionClone);
    }
  }
  
  // Fetch exchange rates
  async function getCurrencyExchangeRates(from, to, resultElementId) {
    try {
        const response = await fetch(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=${from}&to=${to}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '82fa12159bmsh479216afb44a346p123cf7jsn3b54e8dba6f0',
                'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
            }
        });
  
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
  
        const responseData = await response.json();
        console.log('Currency Exchange API response:', responseData);
  
        const resultElement = document.getElementById(resultElementId);
  
        if (responseData.rates[to]) {
            resultElement.textContent = `Result: 1 ${from} = ${responseData.rates[to]} ${to}`;
        } else {
            resultElement.textContent = 'Invalid exchange rate response.';
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
  }
  
  // Add event listeners
  const calculateButton = document.getElementById('buttonCurrency');
  if (calculateButton) {
    calculateButton.addEventListener('click', function () {
        const inputCurrencyFromValue = document.getElementById('inputCurrencyFrom').value;
        const inputCurrencyToValue = document.getElementById('inputCurrencyTo').value;
        getCurrencyExchangeRates(inputCurrencyFromValue, inputCurrencyToValue, 'currencyResult');
    });
  }
  
  // Initial population of dropdowns
  getCurrencyOptions();
  