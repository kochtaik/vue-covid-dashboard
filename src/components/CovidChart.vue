<template>
  <section class="chart-container">
    <canvas
      id="covidChart"
      width="400"
      height="400"
      aria-label="Dynamic of covid-19" role="img"
    ></canvas>
  </section>
  <general-stats
    v-if="isChartDrawn"
    :countryName="choosenCountry"
    :todayData="todayData"
  ></general-stats>
</template>
<script>
import GeneralStats from './GeneralStats.vue';

import Chart from 'chart.js';
import { fetchData } from '../api';
export default {
  name: 'CovidChart',
  components: {
    GeneralStats,
  },
  data() {
    return {
      constantCountryTimeline: [],
      chartInstance: null,
      todayData: null,
      isChartDrawn: false,
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
      const { data } = countryData;
      console.log(data);
      // if (data.timeline.length === 0) {
      //   // this.isChartDrawn = false;
      //   // this.chartInstance.destroy();
      //   return;
      // }
      this.constantCountryTimeline = data.timeline;
      this.todayData = data.timeline[0];
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

      this.isChartDrawn = false;
      if (this.chartInstance !== null) this.chartInstance.destroy();
      const config = {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            type: 'line',
            label: 'New deaths',
            backgroundColor: '#d95d5a',
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
            fontSize: 20,
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              display: true,
              ticks: {
                callback: function(dataLabel, idx) {
                  if (idx === dates.length - 1) return dataLabel;
                  return idx % 10 === 0 ? dataLabel : '';
                }
              }
            }]
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
        }
      };
      this.chartInstance = new Chart(ctx, config);
      this.isChartDrawn = true;
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
  .chart-container {
    width: 48%;
    height: 45%;
    position: relative;
  }
</style>