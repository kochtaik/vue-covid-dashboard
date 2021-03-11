<template>
  <div class="locality">
    <div class="locality__name">{{ localityStats.name }}</div>
    <div class="locality__total-cases cell">
      <span class="cell__title">All cases</span>
      <span class="cell__number-value">{{ localityStats.confirmed || 'N/A' }}</span>
      <span class="cell__increase">{{ localityStats.new_confirmed || 'N/A' }}</span>
    </div>
    <div class="locality__total-recovered cell">
      <span class="cell__title">Recovered</span>
      <span class="cell__number-value">{{ localityStats.recovered || 'N/A' }}</span>
      <span class="cell__increase">{{ localityStats.new_recovered || 'N/A' }}</span>
    </div>
    <div class="locality__total-deaths cell">
      <span class="cell__title">Deaths</span>
      <span class="cell__number-value">{{ localityStats.deaths || 'N/A' }}</span>
      <span class="cell__increase">{{ localityStats.new_deaths || 'N/A' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLocality',
  props: {
    localityStats: {
      type: Object,
      default: null,
    }
  }
}
</script>

<style scoped>
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