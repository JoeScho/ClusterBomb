'use strict';

module.exports = getChartData;

const demoData = [
  [{
    "count": 12,
    "name": "Jan"
  }],
  [{
    "count": 16,
    "name": "Feb"
  }],
  [{
    "count": 14,
    "name": "Mar"
  }],
  [{
    "count": 2,
    "name": "Apr"
  }],
  [{
    "count": 4,
    "name": "May"
  }],
  [{
    "count": 0,
    "name": "Jun"
  }],
  [{
    "count": 0,
    "name": "Jul"
  }],
  [{
    "count": 0,
    "name": "Aug"
  }],
  [{
    "count": 3,
    "name": "Sep"
  }],
  [{
    "count": 6,
    "name": "Oct"
  }],
  [{
    "count": 12,
    "name": "Nov"
  }],
  [{
    "count": 14,
    "name": "Dec"
  }]
];

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
    if ((new Date()).getFullYear().toString() === headache.Date.split('-')[0]) {
      counter[headache.Month]++;
    }
  });

  let hasData = false;

  for (let i = 0; i <= 11; i++) {
    if (counter[i] > 0) hasData = true;

    res.push([{
      count: counter[i],
      name: months[i]
    }]);
  }

  return hasData ? res : demoData;
}
