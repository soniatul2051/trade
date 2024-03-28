import React, { useState, useEffect } from "react";
import axios from "axios";

const StockPrice = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

   
    closePopup();
  };


    

   

 
  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <button
            onClick={openPopup}
          >
            M
          </button>
        </div>
      )}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="absolute inset-0 bg-gray-900 opacity-75 "></div>
          <div className="relative z-50 bg-white rounded-lg p-8 bg-red-300">
            <button className="absolute top-0 right-0 p-2" onClick={closePopup}>
              <img src="cross.gif" alt="" className="h-6 w-6 text-gray-700" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Create Order</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="selectedStocks">Stocks:</label>
              <select
                name="selectedStocks"
                id="selectedStocks"
                multiple
                value={selectedStocks}
                onChange={(e) =>
                  setSelectedStocks(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
              >
                <option value="">Select an option</option>
                {stockNames.map((stock) => (
                  <option key={stock} value={stock}>
                    {stock}
                  </option>
                ))}
              </select>
              <label className="float-center text-center" htmlFor="quantity">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <div className="mt-4 ">
                {selectedStocks.map((stock) => (
                  <div key={stock}>
                    <label
                      className="float-left text-center"
                      htmlFor="quantity"
                    >
                      {stock}:{" "}
                      {prices[stock] ? `$${prices[stock]}` : "Loading..."}
                    </label>
                    <label
                      className="float-right text-center"
                      htmlFor="quantity"
                    >
                      Total: ${totalPrice}
                    </label>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded mt-4"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPrice;
