import currency from "currency.js";
import dayjs from "dayjs";

//currency js
const RUPIAH = (value) => {
  return currency(value, {
    symbol: "Rp ",
    decimal: ",",
    separator: ".",
    precision: 0,
    formatWithSymbol: true,
  }).format();
};

//day js
const FORMAT_DATE = (date) => {
  return dayjs(date).format("DD MMMM YYYY");
};

export { RUPIAH, FORMAT_DATE };

