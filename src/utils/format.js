// Need a locale to properly format number according to the selected currency.
export const CURRENCIES = [
  { symbol: '€', locale: 'de-DE', name: 'EUR' },
  { symbol: '$', locale: 'en-EN', name: 'USD' },
  { symbol: '£', locale: 'en-GB', name: 'GBP' },
];

export function parseNumber(number) {
  return typeof number === 'string'
    ? parseInt(number.replace(/[^\d]+/gi, ''), 10)
    : number;
}

export function formatNumber(number, currency) {
  const parsed = parseNumber(number);
  const locale = CURRENCIES.find((cur) => cur.name === currency).locale;

  // NaN is possible here because we want to show empty salary field instead of '0'.
  return isNaN(parsed) ? '' : new Intl.NumberFormat(locale).format(parsed);
}

export function formatCurrency(number, currency) {
  const currencyObj = CURRENCIES.find((cur) => cur.name === currency);

  return `${currencyObj.symbol} ${currency} ${new Intl.NumberFormat(
    currencyObj.locale
  ).format(number)}`;
}

function capitalize(s) {
  if (typeof s !== 'string') return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatJobTitle(title, type) {
  return `${title} (${capitalize(type)})`;
}

export function formatPlural(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}
