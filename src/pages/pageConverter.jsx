import { React, useEffect, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { fetchCurrencies, convertCurrency } from '../api/currencyAPI'
import CurrencySelector from '../components/currencySelector'

export default function Converter() {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [conversionRate, setConversionRate] = useState(null); // << tambahan
  const [currencies, setCurrencies] = useState([]);
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('IDR');
  const [loading, setLoading] = useState(true);

  // Fetch currencies once on mount
  useEffect(() => {
    async function loadCurrencies() {
      const result = await fetchCurrencies();
      setCurrencies(result);
      setLoading(false);
    }
    loadCurrencies();
  }, []);

  // Convert only when input value/state changes, after currency list is loaded
  useEffect(() => {
    if (currencyFrom && currencyTo && amount && currencies.length > 0) {
    convertCurrency(currencyFrom, currencyTo, amount).then(({ converted, rate }) => {
      console.log(converted);
        setConvertedAmount(converted);
        setConversionRate(rate); // << simpan rate
      });
    }
  }, [currencyFrom, currencyTo, amount, currencies.length]);
  
  if (loading) {
    return <div className="text-center mt-10 text-white">Loading currencies...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#3f2a02] to-[#7e3606] text-white">

      {/* Title */}
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold">Currency Converter</h1>
        <p className="mt-2 text-lg text-gray-200">Instantly convert one currency to another with the latest exchange rates.</p>
      </div>

      {/* Card */}
      <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6" data-theme="cupcake">
        <div className="flex flex-col space-y-4">
          {/* Amount */}
          <div className="flex items-center">
            <label htmlFor="amount" className="sr-only">Amount</label>
            <input
              type="text"
              id="amount"
              defaultValue={1}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full input input-bordered input-lg text-xl font-medium bg-grey"
            />
          </div>

          {/* Currency Selector */}
          <div className="flex items-center space-x-2">
            <CurrencySelector
              currencies={currencies}
              selected={currencyFrom}
              onChange={setCurrencyFrom}
              id="currency_from"
            />
            <button
              type="button"
              className="btn  btn-circle"
              onClick={() => {
                setCurrencyFrom(currencyTo);
                setCurrencyTo(currencyFrom);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 17" className="w-5 h-5">
                <path fill="currentColor" d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"/>
              </svg>
            </button>
            <CurrencySelector
              currencies={currencies}
              selected={currencyTo}
              onChange={setCurrencyTo}
              id="currency_to"
            />
          </div>

          {/* Result */}
          <div className="pt-4">
            <p className="text-gray-500 text-sm">{amount} {currencyFrom} =</p>
            <h2 className="text-3xl font-bold text-[#1d3557]">{convertedAmount?.toFixed(2) || '...'} {currencyTo}</h2>
            {conversionRate && (
              <p className="text-gray-500 text-sm mt-1">
                1 {currencyFrom} = {conversionRate.toFixed(2)} {currencyTo}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
