<template>
  <config-bar
    @search-input="makeSuggestions"
    @country-select="setCountry"
    @change-interval="setTimespan"
    :suggestions="suggestions"
    ></config-bar>
  <covid-chart
    :choosenCountry="choosenCountry"
    :timespan="timespan"
  ></covid-chart>
</template>

<script>
import configBar from './components/configBar.vue';
import CovidChart from './components/CovidChart.vue';
import { fetchData } from './api';

export default {
  name: 'Covid dashboard',
  components: {
    configBar,
    CovidChart,
  },
  data() {
    return {
      countriesList: [],
      suggestions: [],
      countryTimeline: [],
      choosenCountry: null,
      timespan: Infinity,
    };
  },
  methods: {
    async formCountriesList() {
      const countries = await fetchData();
      this.countriesList = this.extractCountriesNames(countries.data);
      const firstCountry = this.countriesList[0];
      this.setCountry(firstCountry);
    },
    makeSuggestions(inputValue) { 
      if (inputValue.length > 0) {
      const toMatch = new RegExp(`^${inputValue}`, 'gi');
      this.suggestions = this.countriesList
        .filter(countryInfo => toMatch.test(countryInfo.name))
        .sort()
        .slice(0, 4);
      } else this.suggestions = [];
    },
    extractCountriesNames(countriesInfo) {
      return countriesInfo.reduce((countriesNames, country) => {
        const countryNameInfo = {
          name: country.name,
          code: country.code
        };
        countriesNames.push(countryNameInfo);
        return countriesNames;
      }, []);
    },
    setCountry(countryName) {
      this.choosenCountry = countryName;
      this.suggestions = [];
    },
    setTimespan(interval) {
      this.timespan = Number(interval);
    }
  },
  mounted() {
    this.formCountriesList();
  },
}
</script>

<style>
html, select, input {
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}
</style>
