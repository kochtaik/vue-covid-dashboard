<template>
  <config-bar
    @search-input="makeSuggestions"
    @country-select="setCountry"
    :suggestions="suggestions"
    :timeline="countryTimeline"
    ></config-bar>
</template>

<script>
import configBar from './components/configBar.vue'

export default {
  name: 'Covid dashboard',
  components: {
    configBar,
  },
  data() {
    return {
      countriesList: [],
      suggestions: [],
      countryTimeline: [],
      choosenCountry: null,
    };
  },
  methods: {
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
  watch: {
    choosenCountry() {
      (async () => {
        console.log('fetching fired!');
        console.log(this.choosenCountry)
        const { code } = this.choosenCountry;
        const url = `http://corona-api.com/countries/${code}`;
        console.log(url);
        const response = await fetch(url);
        const countryStats = await response.json(); 
        this.countryTimeline = countryStats.data.timeline;
        console.log('fetching ended:', this.countryTimeline);
      })();
    },
  },
  created() {
    // попытаться вынести работу с апи в отдельный модуль
    (async () => {
      const url = 'https://corona-api.com/countries/';

      const rawData = await fetch(url, {mode: 'cors'});
      const handledData = await rawData.json();
      this.countriesList = this.extractCountriesNames(handledData.data);
      this.choosenCountry = this.countriesList[0];
    })();
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
