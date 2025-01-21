import React, { useState, useEffect } from 'react';

export function StockForm({ stock, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    quantity: 1,
    buyPrice: 0,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6 border border-purple-100">
      <div>
        <label htmlFor="symbol" className="block text-sm font-medium text-purple-700">Symbol</label>
        <input
          type="text"
          id="symbol"
          value={formData.symbol}
          onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
          required
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-purple-700">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
          required
        />
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-purple-700">Quantity</label>
        <input
          type="number"
          id="quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
          min="1"
          required
        />
      </div>

      <div>
        <label htmlFor="buyPrice" className="block text-sm font-medium text-purple-700">Buy Price</label>
        <input
          type="number"
          id="buyPrice"
          value={formData.buyPrice}
          onChange={(e) => setFormData({ ...formData, buyPrice: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          {stock ? 'Update' : 'Add'} Stock
        </button>
      </div>
    </form>
  );
}