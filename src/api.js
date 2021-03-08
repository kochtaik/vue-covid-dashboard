export const fetchData = async (countryCode = '') => {
  console.log('fetching started!')
  const url = `https://corona-api.com/countries${countryCode}`;
  const rawData = await fetch(url);
  return await rawData.json();
};
