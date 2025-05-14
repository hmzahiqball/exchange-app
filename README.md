# 💱 Currency Exchange Rate Viewer

Aplikasi berbasis React yang menampilkan data nilai tukar mata uang asing dalam format tabel interaktif menggunakan `react-data-table-component`. Aplikasi ini mendukung tampilan data statis dari file lokal maupun data live dari API [exchangerate-api.com](https://www.exchangerate-api.com).

---

## 📌 Fitur

- 🌍 Menampilkan nilai tukar untuk 150+ mata uang dunia
- 📊 Tabel interaktif: dapat diurutkan, dipaginasi, dan responsif
- 💵 Baris statis untuk mata uang **USD** selalu tampil di atas
- 🔄 Mendukung data live menggunakan API pribadi dari exchangerate-api.com
- 📁 Secara default menggunakan file JSON lokal (`src/json/response.json`)
- 🎨 Antarmuka bersih dan responsif menggunakan Tailwind CSS

---

## 🚀 Instalasi & Menjalankan Aplikasi

### 1. Clone repositori

```bash
git clone https://github.com/hmzahiqball/currency-exchange-viewer.git
cd currency-exchange-viewer
```

### 2. Instalasi dependensi
```bash
npm install
```

### 3. Jalankan aplikasi
```bash
npm run dev
```


## 🔧 Menggunakan API Live (Opsional)
Untuk menampilkan data nilai tukar real-time, Anda bisa menggunakan API key pribadi dari:

🔗 https://www.exchangerate-api.com

### Langkah-langkah:
- Daftar dan dapatkan API key pribadi Anda.
- Masuk ke src/api/currencyAPI.jsx dan modifikasi token API


## 🗂 Struktur Proyek
```bash
├── public/
├── src/
│   ├── data/
│   │   └── currencyMeta.js        # Metadata nama dan negara mata uang
│   ├── json/
│   │   └── response.json          # Data nilai tukar lokal (default)
│   └── components/
│       └── CurrencyTable.jsx      # Komponen utama tabel
├── .env                           # File konfigurasi API key (opsional)
├── package.json
└── README.md
```