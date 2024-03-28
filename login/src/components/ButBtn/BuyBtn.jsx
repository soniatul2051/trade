import React, { useState, useEffect } from "react";
import axios from "axios";

const stockNames = [
  "USD",
  "GOOGL",
  "AMZN",
  "MSFT",
  "META",
  "NVDA",
  "FB",
  "NFLX",
  "BABA",
  "PYPL",
  "DIS",
  "BAC",
  "JPM",
  "GS",
  "MS",
  "C",
  "T",
  "V",
  "WMT",
  "UNH",
  "PFE",
  "VZ",
  "HD",
  "NKE",
  "MCD",
  "INTC",
  "MRNA",
  "JNJ",
  "CRM",
  "ORCL",
  "ADBE",
  "CSCO",
  "TWTR",
  "SNAP",
  "SQ",
  "UBER",
  "LYFT",
  "DD",
  "XOM",
  "CVX",
  "KO",
  "PEP",
  "MMM",
  "CAT",
  "BA",
  "GE",
  "IBM",
  "MRK",
  "ABT",
  "ABBV",
  "WBA",
  "CVS",
  "ZM",
  "AMD",
  "GS",
  "F",
  "GM",
  "WFC",
  "INTU",
  // Your stock names array
];

const StockPrice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prices, setPrices] = useState({});
  const [error, setError] = useState(null);
  const [selectedStocks, setSelectedStocks] = useState(["AAPL"]);
  const [quantity, setQuantity] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  
  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const pricesData = {};
        await Promise.all(
          selectedStocks.map(async (stock) => {
            const response = await axios.get(
              `https://cloud.iexapis.com/stable/stock/${stock}/quote?token=sk_b25c14d7d168447299afe8ec7f036fb9`
            );

            if (response.status !== 200) {
              throw new Error("Failed to fetch data");
            }

            const data = response.data;
            const currentPrice = data.latestPrice;
            pricesData[stock] = currentPrice;
          })
        );
        setPrices(pricesData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPrices();

    const intervalId = setInterval(fetchPrices, 30000);

    return () => clearInterval(intervalId);
  }, [selectedStocks]);

  useEffect(() => {
    let totalPrice = 0;
    selectedStocks.forEach((stock) => {
      totalPrice += quantity * prices[stock];
    });
    setTotalPrice(totalPrice.toFixed(2));
  }, [selectedStocks, quantity, prices]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let totalPrice = 0;
    selectedStocks.forEach((stock) => {
      totalPrice += quantity * prices[stock];
    });
    setTotalPrice(totalPrice.toFixed(2));
    let share = selectedStocks[0];
    try {
      let price = prices[selectedStocks];

      const response = await axios.post(
        "http://localhost:3001/api/user/transactions",
        { share, email: userData.email, price, quantity }
      );
      console.log("Table data posted successfully:", response.data);

      // Update user balance
      await axios.post(
        "http://localhost:3001/api/user/updateBalance",
        { email: userData.email, totalPrice }
      );

      // Update local storage
      const updatedUserData = { ...userData, balance: userData.balance - totalPrice };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);

      closePopup();
    } catch (error) {
      console.error("Error posting table data:", error);
    }
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <button
            onClick={openPopup}
            className="bg-green-500 hover text-black font-bold py-2 px-4 rounded"
          >
            Buy{" "}
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
              <div className="bg-red-300 h-96 w-96 flex flex-col gap-2">
                <div className="user-info flex justify-between items-center mx-2">
                  <p>
                    User Id: {userData.email}
                  </p>
                  <p>
                    Balance: {userData.balance}
                  </p>
                </div>
                <div className="shareSelect flex justify-between items-center  ">
                  <label htmlFor="selectedStocks" className="p-2">
                    Stocks:
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    name="selectedStocks"
                    id="selectedStocks"
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
                    <option selected>Choose Stock</option>
                    {stockNames.map((stock) => (
                      <option key={stock} value={stock}>
                        {stock}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="quantity flex justify-center items-center ">
                  <label
                    className="float-center text-center p-1"
                    htmlFor="quantity"
                  >
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className="border-2 border-gyey w-full p-1 rounded-lg"
                  />
                </div>
                <div className="INfo mt-4 ">
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

{parseFloat(userData.balance) < parseFloat(totalPrice) ? (
    <p className="text-red-700 mt-2 text-xl">Insufficient balance to place order <br /> Your balance is ${userData.balance} <br /> Required balance is ${totalPrice}</p>
) : (
  <button
    type="submit"
    className="bg-green-500 text-white py-2 px-4 rounded mt-4"
  >
    Place Order
  </button>
)}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPrice;
