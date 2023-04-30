import currency from "currency.js";

export const RUPIAH = (value) => {
  return currency(value, {
    symbol: "Rp ",
    decimal: ",",
    separator: ".",
    precision: 0,
    formatWithSymbol: true,
  }).format();
};
