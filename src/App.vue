<template>
  <config-bar
    @search-input="makeSuggestions"
    @country-select="setCountry"
    :suggestions="suggestions"
    ></config-bar>
  <covid-chart
    :countryDataLoaded="countryDataLoaded"
    :choosenCountry="choosenCountry"
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
      countryDataLoaded: false,
    };
  },
  methods: {
    async formCountriesList() {
      const countries = await fetchData();
      this.countriesList = this.extractCountriesNames(countries.data);
      const firstCountry = this.countriesList[0];
      this.setCountry(firstCountry);
      console.log('choosen country:', this.choosenCountry);
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
    }
  },
  mounted() {
    // попытаться вынести работу с апи в отдельный модуль
    // [x] сделать ОДНУ ФУНКЦИЮ на любые опции
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
