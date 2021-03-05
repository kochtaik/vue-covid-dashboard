<template>
  <nav>
    <div>
      <select name="" id="">
        <option value="">Новые случаи</option>
        <option value="">Летальные исходы</option>
      </select>
      <div class="search-area">
        <input
          v-model="searchStringValue"
          type="text"
          placeholder="Enter a country name"
          />
        <ul
          class="suggestions"
          v-if="suggestions.length"
          >
          <li
            v-for="(countryInfo, idx) in suggestions"
            :key="idx"
            tabindex="0"
          >{{ countryInfo.Country }}</li>
        </ul>
      </div>
      <select name="" id="">
        <option value="">Всё время</option>
        <option value="">1 неделя</option>
        <option value="">2 недели</option>
        <option value="">30 дней</option>
      </select>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'configBar',
  data() {
    return {
      countriesList: [],
      suggestions: [],
      searchStringValue: '',
    };
  },
  watch: {
    searchStringValue(stringValue) {
      if (stringValue.length > 0) {
      const toMatch = new RegExp(stringValue, 'gi');
      this.suggestions = this.countriesList
        .filter(countryInfo => toMatch.test(countryInfo.Country))
        .slice(0, 4);
      } else this.suggestions = [];
    }
  },
  created() {
    (async () => {
      const url = 'https://api.covid19api.com/countries';
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const rawData = await fetch(url, requestOptions);
      const handledData = await rawData.json();
      this.countriesList = handledData;
    })();
  },
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
