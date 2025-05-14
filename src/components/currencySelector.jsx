import React from 'react';

export default function CurrencySelector({ currencies, selected, onChange, id }) {
  return (
    <select
      id={id}
      className="select select-bordered select-lg w-full bg-grey-300"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>Pilih mata uang</option>
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
}
