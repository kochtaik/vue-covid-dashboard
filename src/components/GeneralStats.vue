<template>
  <section>
    <header>General statistics</header>
    <div class="locality">
      <div class="locality__name">{{ countryName.name }}</div>
      <div class="locality__total-cases cell">
        <span class="cell__title">All cases</span>
        <span class="cell__number-value">{{ handledData?.confirmed || 'N/A' }}</span>
        <span class="cell__increase">{{ handledData?.new_confirmed || 'N/A' }}</span>
      </div>
      <div class="locality__total-recovered cell">
        <span class="cell__title">Recovered</span>
        <span class="cell__number-value">{{ handledData?.recovered || 'N/A' }}</span>
        <span class="cell__increase">{{handledData?.new_recovered || 'N/A' }}</span>
      </div>
      <div class="locality__total-deaths cell">
        <span class="cell__title">Deaths</span>
        <span class="cell__number-value">{{ handledData?.deaths || 'N/A' }}</span>
        <span class="cell__increase">{{ handledData?.new_deaths || 'N/A' }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GeneralStats',
  props: {
    countryName: {
      type: Object,
      default: null,
    },
    todayData: {
      type: Object,
      default: null,
    }
  },
  computed: {
    handledData() {
      if (!this.todayData) return;
      return Object.entries(this.todayData).reduce((acc, [key, value]) => {
        // if key holds a date which is a string
        if (typeof value === 'string') return acc;
  
        acc[key] = value.toLocaleString();
        if (key.startsWith('new')) {
          acc[key] = `+${acc[key]}`;
        }
        return acc;
      }, {});
    }
  },
}
</script>

<style scoped>
  section {
    width: auto;
    height: 50%;
    border: 1px solid #cecece;
    border-radius: 7px;
  }

  header {
    padding: 1em;
    font-weight: 500;
    border-bottom: 1px solid #cecece;
  }

  .locality {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0.5em;
  }

  .locality__name {
    grid-area: 1 / 1 / 2 / 4;
    padding: 0.3em;
  }

  .cell {
    padding: 0.3em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .cell__title {
    font-weight: 400;
  }

  .cell__increase {
    color: #70757a;
    font-size: 0.8em;
  }

  .cell > span {
    padding: 0.1em;
  }

  .locality__total-recovered {
    border-left: 1px solid #cecece;
    border-right: 1px solid #cecece;
  }
</style>