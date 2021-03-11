export const fetchData = async (countryCode = '', path = '/countries') => {
  const url = `https://corona-api.com${path}${countryCode}`;
  const rawData = await fetch(url);
  return await rawData.json();
};
