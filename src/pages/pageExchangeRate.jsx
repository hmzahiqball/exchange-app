import React from "react";
import DataTable from "react-data-table-component";
import { currencyMeta } from "../data/currencyMeta";
import data from "../json/response.json";

const CurrencyTable = () => {
  const rates = data.conversion_rates;

  const columns = [
    {
      name: "Code",
      selector: row => row.code,
      sortable: true,
    },
    {
      name: "Currency",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Country",
      selector: row => row.country,
      sortable: true,
    },
    {
      name: "Rate",
      selector: row => row.rate,
      sortable: true,
      right: true,
    },
  ];

  // Semua data kecuali USD
  const rows = Object.entries(rates)
    .filter(([code]) => code !== "USD")
    .map(([code, rate]) => {
      const meta = currencyMeta[code] || { name: "Unknown", country: "Unknown" };
      return {
        code,
        rate,
        name: meta.name,
        country: meta.country,
      };
    });

  // Baris USD (statis)
  const usdRow = {
    code: "USD",
    rate: rates["USD"],
    name: currencyMeta["USD"]?.name || "United States Dollar",
    country: currencyMeta["USD"]?.country || "United States",
  };

  return (
    <div className="p-4">
      {/* Title */}
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold">Currency Exchange Rate</h1>
        <p className="mt-2 text-lg text-gray-200">
          Instantly convert one currency to another with the latest exchange rates.
        </p>
      </div>

      {/* USD Static Row */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow p-4" data-theme="cupcake">
        <div className="overflow-x-auto">
          <table className="table-auto w-full mb-4">
            <thead>
              <tr>
                <th className="px-2 py-1">Code</th>
                <th className="px-2 py-1">Currency</th>
                <th className="px-2 py-1">Country</th>
                <th className="px-2 py-1">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-semibold">
                <th className="px-2 py-1">{usdRow.code}</th>
                <th className="px-2 py-1">{usdRow.name}</th>
                <th className="px-2 py-1">{usdRow.country}</th>
                <th className="px-2 py-1">{usdRow.rate}</th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DataTable (tanpa USD) */}
        <DataTable
          columns={columns}
          data={rows}
          pagination
          striped
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default CurrencyTable;
