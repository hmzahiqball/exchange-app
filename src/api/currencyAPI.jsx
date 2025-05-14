import { currencyMeta } from '../data/currencyMeta';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = 'd863388f6ff4c9dcf42e4941';

export async function fetchCurrencies() {
  try {
    const res = await fetch(`${BASE_URL}/${API_KEY}/latest/USD`);
    if (!res.ok) {
      throw new Error('Gagal mengambil data');
    }
    const data = await res.json();
    if (data.result !== 'success') {
      throw new Error('Respon API gagal');
    }

    // Ambil semua kode mata uang
    return Object.keys(data.conversion_rates).map(code => {
      const meta = currencyMeta[code];
      return {
        code,
        label: meta ? `${code} - ${meta.name}, ${meta.country}` : code
      };
    });
  } catch (error) {
    console.error('Error fetching currencies:', error.message);
    return [];
  }
};

export async function convertCurrency(from, to, amount) {
  const res = await fetch(`${BASE_URL}/${API_KEY}/latest/${from}`);
  const data = await res.json();
  const rate = data.conversion_rates[to];
  const converted = amount * rate;

  return {
    converted, // total hasil konversi
    rate       // kurs per 1 unit
  };
}
