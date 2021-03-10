<template>
  <nav>
    <div>
      <div class="search-area">
        <input
          v-model="searchStringValue"
          @keypress.enter="selectCountry"
          type="text"
          placeholder="Enter a country name"
          />
        <ul
          class="suggestions"
          v-if="suggestions.length"
          >
          <li
            v-for="(countryInfo, idx) in suggestions"
            @click="selectCountry($event)"
            :key="idx"
            tabindex="0"
          >{{ countryInfo.name }}</li>
        </ul>
      </div>
      <select v-model="interval" id="timing">
        <option value="Infinity">All time</option>
        <option value="7">1 week</option>
        <option value="14">2 weeks</option>
        <option value="30">30 days</option>
      </select>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'configBar',
  emits: [
    'search-input',
    'country-select',
    'change-interval',
  ],
  props: ['suggestions'],
  data() {
    return {
      interval: 'Infinity',
      searchStringValue: '',
    };
  },
  methods: {
    selectCountry(option) {
      const selectedCountry = this.suggestions.find(country => country.name === option.target.textContent)
        || this.suggestions[0];
      this.$emit('country-select', selectedCountry);
      this.searchStringValue = '';
    }
  },
  watch: {
    searchStringValue() {
      this.$emit('search-input', this.searchStringValue);
    },
    interval() {
      this.$emit('change-interval', this.interval);
    },
  }
}
</script>

<style scoped>
  nav div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  select, input {
    margin: 0 0.5em;
  }

  .search-area {
    position: relative;
  }

  ul {
    width: 92%;
    padding: 0;
    margin: 0 0.5em;
    list-style: none;
    position: absolute;
    top: 100%;
    z-index: 1000;
    background: rgb(255, 255, 255);
    box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12)
  ;
  }

  li {
    margin: 0.5em 0;
    padding: 0 0.5em;
    cursor: pointer;
  }

  li:hover {
    background: #efefef;
  }
</style>
