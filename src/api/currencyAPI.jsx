const BASE_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = import.meta.env.TOKEN_API_KEY;

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
    return Object.keys(data.conversion_rates);
  } catch (error) {
    console.error('Error fetching currencies:', error.message);
    return [];
  }
}
