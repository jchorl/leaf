export function amountToString(amount) {
  return '$' + (amount / 100.0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
