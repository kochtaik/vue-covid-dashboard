export const fetchData = async (countryCode = '') => {
  const url = `https://corona-api.com/countries${countryCode}`;
  const rawData = await fetch(url);
  return await rawData.json();
};
