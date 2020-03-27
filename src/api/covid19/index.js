import api from '../base';

const fetchGlobalStatistics = () => api.get('https://pomber.github.io/covid19/timeseries.json');

export {
  fetchGlobalStatistics, // eslint-disable-line
};
