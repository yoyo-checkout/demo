import api from '../base';

const fetchGlobalStatisticsByDate = (param) => { // eslint-disable-line
  return api.get('https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats', {
    headers: {
      'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
      'x-rapidapi-key': '0bf23bff1fmsh9fa8773718dddb3p10efeejsn3c88a0d681e4',
    },
  });
};

export {
  fetchGlobalStatisticsByDate, // eslint-disable-line
};
