<template>
  <canvas id="covidChart" width="1600" height="900"></canvas>
  {{ choosenCountry }}
</template>
<script>
// main chart component
import Chart from 'chart.js';
import { fetchData } from '../api';

export default {
  name: 'CovidChart',
  data() {
    return {
      countryTimeline: [],
    };
  },
  props: {
    countryDataLoaded: {
      type: Boolean,
      default: false,
    },
    choosenCountry: {
      type: Object,
      default: null,
    }
  },
  methods: {
    agregateData(param) {
      return this.countryTimeline.reduce((acc, val) => {
        acc.push(val[param]);
        return acc;
      }, []);
    },
    async drawChart(countryCode) {
      const countryData = await fetchData(countryCode);
      this.countryTimeline = countryData.data.timeline

      const dates = this.agregateData('date');
      const newConfirmedCases = this.agregateData('new_confirmed');
      const ctx = document.getElementById('covidChart');
      console.log('dates', dates);
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              data: newConfirmedCases,
            }
          ]
        },
      });
    },
  },
  watch: {
    choosenCountry() {
      console.log('watcher fired!')
      const countryCode = `/${this.choosenCountry.code}`;
      this.drawChart(countryCode);
    }
  },
}
</script>

<style>

</style>