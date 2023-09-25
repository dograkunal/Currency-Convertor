import React, { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyinfo";
function App() {
  const [amount, setAmount] = useState(0);
  const [fromValue, setFromValue] = useState("inr");
  const [toValue, setToValue] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(0);

  //Custom hook
  const currencyInfo = useCurrencyInfo(fromValue);
  //Getting keys of each option returned
  const options = Object.keys(currencyInfo);

  const swapValue = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[toValue]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/1055081/pexels-photo-1055081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(curr) => setAmount(amount)}
                selectCurrency={fromValue}
                onAmountChange={(amt) => setAmount(amt)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swapValue}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(curr) => setToValue(curr)}
                selectCurrency={toValue}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {fromValue.toLocaleUpperCase()} TO{" "}
              {toValue.toLocaleUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
