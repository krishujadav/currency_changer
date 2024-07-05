import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
        setRates(response.data.rates);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const handleFromCurrencyChange = (selectedOption) => {
    setFromCurrency(selectedOption.value);
  };

  const handleToCurrencyChange = (selectedOption) => {
    setToCurrency(selectedOption.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const convertCurrency = () => {
    if (fromCurrency && toCurrency && amount !== '') {
      const rate = rates[toCurrency] / rates[fromCurrency];
      const convertedValue = amount * rate;
      setConvertedAmount(convertedValue.toFixed(2));
    }
  };

  const swapCurrencies = () => {
    const tempFromCurrency = fromCurrency;
    const tempToCurrency = toCurrency;
    const tempAmount = amount;
    const tempConvertedAmount = convertedAmount;

    setFromCurrency(tempToCurrency);
    setToCurrency(tempFromCurrency);

    if (tempConvertedAmount !== null) {
      setAmount(tempConvertedAmount);
      setConvertedAmount(tempAmount);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-600 py-6 flex flex-col justify-center sm:py-12">
      <div className="max-w-screen-md mx-auto bg-white rounded-lg shadow-lg p-20">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Currency Converter</h1>
        
        {loading && <div className="text-center my-4">Loading...</div>}
        {error && <div className="text-red-500 text-center my-4">Error fetching rates: {error.message}</div>}
        
        {!loading && !error && (
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-700">Enter amount:</label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-700">From currency:</label>
              <Select
                options={Object.keys(rates).map((currency) => ({
                  value: currency,
                  label: currency,
                }))}
                onChange={handleFromCurrencyChange}
                value={{ value: fromCurrency, label: fromCurrency }}
                placeholder="Select currency"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-700">To currency:</label>
              <Select
                options={Object.keys(rates).map((currency) => ({
                  value: currency,
                  label: currency,
                }))}
                onChange={handleToCurrencyChange}
                value={{ value: toCurrency, label: toCurrency }}
                placeholder="Select currency"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={convertCurrency}
                className="mr-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Convert
              </button>
              <button
                onClick={swapCurrencies}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
              >
                Swap
              </button>
            </div>

            {convertedAmount !== null && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800">Converted amount:</h2>
                <p className="mt-1 text-lg text-gray-600">{convertedAmount} {toCurrency}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
