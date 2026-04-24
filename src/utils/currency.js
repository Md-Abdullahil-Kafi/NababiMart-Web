const bdtFormatter = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatBDT = (amount) => {
  const value = Number(amount) || 0;
  return bdtFormatter.format(value);
};
