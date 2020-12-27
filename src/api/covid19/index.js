import api from '../base';

const fetchGlobalStatistics = () => api.get('https://corona.lmao.ninja/v3/covid-19/all');

const fetchCountryDailyStatistics = () => api.get('https://pomber.github.io/covid19/timeseries.json');

export {
  fetchGlobalStatistics,
  fetchCountryDailyStatistics,
};
