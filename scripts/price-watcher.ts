import fetch from 'node-fetch';

const INTERVAL_TIME = 5 * 60 * 1000; // 5 minutes

const fetchCryptoPrices = async () => {
  try {
    const response = await fetch(
      'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD'
    );
    const data = await response.json();
    console.log('Crypto Prices:', data);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
  }
};

setInterval(() => {
  fetchCryptoPrices();
}, INTERVAL_TIME);

fetchCryptoPrices(); // Initial fetch
