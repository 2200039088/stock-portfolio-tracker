import React, { useState, useEffect } from "react";

export function StockForm({ stock, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    quantity: 1,
    buyPrice: 0,
    currentPrice: 0,
  });

  useEffect(() => {
    if (stock) {
      setFormData({
        symbol: stock.symbol,
        name: stock.name,
        quantity: stock.quantity,
        buyPrice: stock.buyPrice,
      });
    }
  }, [stock]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKey = "P4FHM7BI41OQI8A0";
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${formData.symbol}&apikey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log(data);

      if (data["Note"] || data["Information"]) {
        throw new Error("API rate limit exceeded");
      }

      const quote = data["Global Quote"];

      if (!quote || !quote["05. price"]) {
        throw new Error("Invalid stock symbol");
      }

      const currentPrice = parseFloat(quote["05. price"]);
      onSubmit({
        ...formData,
        currentPrice: parseFloat(currentPrice.toFixed(2)),
      });
    } catch (error) {
      console.error("Error fetching stock price:", error);
      alert(`the following error occoured:{error.message}`);

      // Fallback to random price calculation
      // const variation = (Math.random() - 0.5) * 1;
      // const randomCurrentPrice = formData.buyPrice * (1 + variation);
      // console.log(randomCurrentPrice);
      // console.log(parseFloat(randomCurrentPrice.toFixed(2)));
      // onSubmit({
      //   ...formData,
      //   currentPrice: parseFloat(randomCurrentPrice.toFixed(2)),
      // });
      setFormData({
        symbol: "",
        name: "",
        quantity: 1,
        buyPrice: 0,
        currentPrice: 0,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white rounded-xl shadow-lg p-8 space-y-6 border border-purple-100'
    >
      <div>
        <label
          htmlFor='symbol'
          className='block text-sm font-medium text-purple-700'
        >
          Stock Symbol
        </label>
        <input
          type='text'
          id='symbol'
          value={formData.symbol}
          onChange={(e) =>
            setFormData({ ...formData, symbol: e.target.value.toUpperCase() })
          }
          className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200'
          placeholder='Enter stock symbol (e.g., AAPL, MSFT)'
          required
        />
      </div>

      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-purple-700'
        >
          Company Name
        </label>
        <input
          type='text'
          id='name'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200'
          placeholder='Enter company name'
          required
        />
      </div>

      <div>
        <label
          htmlFor='quantity'
          className='block text-sm font-medium text-purple-700'
        >
          Quantity
        </label>
        <input
          type='number'
          id='quantity'
          value={formData.quantity}
          onChange={(e) =>
            setFormData({
              ...formData,
              quantity: parseInt(e.target.value) || 1,
            })
          }
          className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200'
          min='1'
          required
        />
      </div>

      <div>
        <label
          htmlFor='buyPrice'
          className='block text-sm font-medium text-purple-700'
        >
          Buy Price (USD)
        </label>
        <input
          type='number'
          id='buyPrice'
          value={formData.buyPrice}
          onChange={(e) =>
            setFormData({
              ...formData,
              buyPrice: parseFloat(e.target.value) || 0,
            })
          }
          className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200'
          min='0'
          step='0.01'
          required
        />
      </div>

      <div className='flex justify-end space-x-4'>
        <button
          type='button'
          onClick={onCancel}
          className='px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md'
        >
          {stock ? "Update" : "Add"} Stock
        </button>
      </div>
    </form>
  );
}
