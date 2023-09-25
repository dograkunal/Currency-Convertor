import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
      )
        .then((res) => res.json())
        .then((res) => setData(res[currency]));
    } catch (err) {
      console.log(err);
    }
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
