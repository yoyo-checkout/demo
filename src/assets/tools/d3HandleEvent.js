/* global vueInstance */
import * as d3 from 'd3';
import * as _ from 'lodash';
import { countryMap } from '@/assets/tools/countryNameMap';

export function handleMouseEnter() {
  d3.select(this).classed('hover', true);
}

export function handleMouseOut() {
  d3.select(this).classed('hover', false);
}

export function handleMouseClick(data) {
  let country = data.properties.name;
  const { statistics } = vueInstance.$store.state.Covid19;
  const { selectedDate } = vueInstance.$store.state.Covid19;

  const tooltip = d3.select('.covid19 .tooltip');
  tooltip
    .transition()
    .duration(200)
    .style('left', `${d3.event.pageX - 100}px`)
    .style('top', `${d3.event.pageY - 150}px`);

  // timeseries API 跟 geoJson API 有些國家名稱不同
  // 需要作轉換
  const countryNameInTimeSeries = _.findKey(countryMap, (item) => item === country);
  country = countryNameInTimeSeries || country;

  const filterByDate = statistics[country]
    ? statistics[country].filter((item) => item.date === selectedDate)[0]
    : {
      isVisible: false,
      country: '',
      confirmed: null,
      deaths: null,
      recovered: null,
    };
  vueInstance.$store.commit('Covid19/SET_TOOLTIP_DATA', { key: 'isVisible', value: true });
  vueInstance.$store.commit('Covid19/SET_TOOLTIP_DATA', { key: 'country', value: country });
  vueInstance.$store.commit('Covid19/SET_TOOLTIP_DATA', { key: 'confirmed', value: filterByDate.confirmed });
  vueInstance.$store.commit('Covid19/SET_TOOLTIP_DATA', { key: 'deaths', value: filterByDate.deaths });
  vueInstance.$store.commit('Covid19/SET_TOOLTIP_DATA', { key: 'recovered', value: filterByDate.recovered });
}

export function closeTooltip(e) {
  if (e.target.nodeName !== 'path') vueInstance.$store.commit('Covid19/RESET_TOOLTIP_DATA');
}
