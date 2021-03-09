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
      this.constantCountryTimeline = countryData.data.timeline;
      this.drawChart()
    },

    agregateData(param) {
      return this.currentCountryTimeline.reduceRight((acc, val) => {
        acc.push(val[param]);
        return acc;
      }, []);
    },

    drawChart() {
      const dates = this.agregateData('date');
      const newConfirmedCases = this.agregateData('new_confirmed');
      const ctx = document.getElementById('covidChart');

      if (this.chartInstance !== null) this.chartInstance.destroy();
      const config = {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'New Cases',
              backgroundColor: '#aecbfa',
              borderColor: '#aecbfa',
              data: newConfirmedCases,
              fill: false,
            }
          ]
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