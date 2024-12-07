import React, { useEffect, useMemo, useState } from "react";
import as from "./Landing2.module.css";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

const SimpleComp = (p) => {
  return <img style={{ width: "1rem" }} src={p.value} alt="coin-logo" />;
};

const PriceChangeRenderer = (params) => {
  const value = params.value;
  const color = value >= 0 ? "green" : "red";
  const icon = value >= 0 ? "▲" : "▼"; // Up arrow for positive, down arrow for negative

  return (
    <span style={{ color, display: "flex", alignItems: "center", gap: "0.3rem" }}>
      {icon} {Math.abs(value).toFixed(2)}%
    </span>
  );
};

const formatVolume = (volume) => {
  if (volume >= 1e9) return `${(volume / 1e9).toFixed(2)}B`;
  if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`;
  if (volume >= 1e3) return `${(volume / 1e3).toFixed(2)}K`;
  return volume.toFixed(2);
};

const Highest1hrRenderer = (params) => {
  const value = params.value;
  const color = value >= 0 ? "green" : "red";
  const icon = value >= 0 ? "▲" : "▼"; // Up arrow for positive, down arrow for negative

  return (
    <span style={{ color, display: "flex", alignItems: "center", gap: "0.3rem" }}>
      {icon} {Math.abs(value).toFixed(2)}%
    </span>
  );
};

const Landing2 = () => {
  const [rowData, setRowData] = useState([]);
  const [colDefs] = useState([
    { field: "#", width: 60 },
    { field: " ", cellRenderer: SimpleComp, width: 70 },
    { field: "Coin", width: 180 },
    { field: "Price", width: 250 },
    { field: "24h", cellRenderer: PriceChangeRenderer },
    { field: "Market Cap" },
    { field: "24h Volume", width: 200 },
  ]);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
  }));

  const gridOptions = {
    pagination: true,
    paginationPageSize: 10,
  };

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false`
      );
      const data = await response.json();

      if (response.ok) {
        const formattedData = data.map((item) => {
          const {
            market_cap_rank = 0,
            name = "",
            current_price = 0,
            price_change_percentage_24h = 0,
            price_change_percentage_1h = 0, // Fetch 1-hour change percentage
            market_cap = 0,
            total_volume = 0,
            image = "",
          } = item;
          return {
            "#": market_cap_rank,
            " ": image,
            Coin: name,
            Price: current_price.toFixed(2),
            "24h": parseFloat(price_change_percentage_24h),
            "Market Cap": market_cap.toLocaleString(),
            "24h Volume": formatVolume(total_volume),
            "1hr Change": parseFloat(price_change_percentage_1h), // 1 hour change data
          };
        });
        setRowData(formattedData);
      } else {
        console.error("Error fetching data:", data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return (
    <div className={`${as.divLand2Cont}`}>
      <h1 className={`${as.ourSwap} text-uppercase`}>Crypto Currencies</h1>
      <div className={`${as.Landing2Cont}`}>
        <div className={`${as.tablecont} ag-theme-quartz-dark`}>
          <AgGridReact
            columnDefs={colDefs}
            rowData={rowData}
            gridOptions={gridOptions}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing2;
