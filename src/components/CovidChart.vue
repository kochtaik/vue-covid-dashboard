<template>
  <div class="container">
    <canvas
      id="covidChart"
      width="400"
      height="400"
      aria-label="Dynamic of covid-19" role="img"
    ></canvas>
  </div>
</template>
<script>
import Chart from 'chart.js';
import { fetchData } from '../api';

export default {
  name: 'CovidChart',
  data() {
    return {
      constantCountryTimeline: [],
      chartInstance: null,
    };
  },
  props: {
    choosenCountry: {
      type: Object,
      default: null,
    },
    timespan: {
      type: Number,
      default: Infinity,
    }
  },
  methods: {
    // Function that fetches data by country code
    // and places it into appropriate variables.
    // Fires only when country has been changed
    async prepareData(countryCode) {
      const countryData = await fetchData(countryCode);
      console.log(countryData);
      this.constantCountryTimeline = countryData.data.timeline;
      this.drawChart()
    },

    agregateData(param) {
      return this.currentCountryTimeline.reduceRight((dataset, item) => {
        let handledValue = item[param];
        if (param === 'date') {
          const options = { year: 'numeric', month: 'short', day: 'numeric'};
          handledValue = new Date(handledValue).toLocaleString('us-US', options);
        }
        dataset.push(handledValue);
        return dataset;
      }, []);
    },

    drawChart() {
      const dates = this.agregateData('date');
      const newConfirmedCases = this.agregateData('new_confirmed');
      const newDeaths = this.agregateData('new_deaths');
      const ctx = document.getElementById('covidChart');

      if (this.chartInstance !== null) this.chartInstance.destroy();
      const config = {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            type: 'line',
            label: 'New deaths',
            backgroundColor: '#c73431',
            borderColor: '#c5221f',
            borderWidth: 1,
            pointRadius: 1,
            data: newDeaths,
          },
          {
            label: 'New cases',
            backgroundColor: '#aecbfa',
            borderColor: '#aecbfa',
            data: newConfirmedCases,
            fill: false,
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: this.choosenCountry.name,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      };
      this.chartInstance = new Chart(ctx, config);
    },
  },
  computed: {
    currentCountryTimeline() {
      return this.constantCountryTimeline.slice(0, this.timespan);
    }
  },
  watch: {
    choosenCountry() {
      const countryCode = `/${this.choosenCountry.code}`;
      this.prepareData(countryCode);
    },

    timespan() {
      this.drawChart();
    },
  },
}
</script>

<style scoped>
  .container {
    width: 48%;
    height: 45%;
    position: relative;
  }
</style>