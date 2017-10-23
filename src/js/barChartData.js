'use strict';

module.exports = getChartData;

function getChartData (headacheData) {
  const res = [];

  const counter = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0
  }

  const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  }

  headacheData.forEach((headache) => {
    counter[headache.Month]++;
  });

  for (let i = 0; i < 11; i++) {
    res.push([{
      count: counter[i],
      name: months[i]
    }]);
  }

  return res;
}
