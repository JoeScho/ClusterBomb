module.exports = function (noOfEntries) {
  if (noOfEntries === 0) noOfEntries = 16;

  return {
    width: 270,
    height: 200,
    margin: {
      top: 20,
      left: 20,
      bottom: 50,
      right: 20
    },
    color: '#ffffff',
    gutter: 20,
    axisX: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      zeroAxis: false,
      orient: 'bottom',
      label: {
        fontFamily: 'Arial',
        fontSize: 9,
        fontWeight: true,
        fill: '#ffffff'
      }
    },
    axisY: {
      max: noOfEntries + (5 - noOfEntries % 5),
      showAxis: true,
      showLines: true,
      showLabels: true,
      orient: 'left',
      label: {
        fontFamily: 'Arial',
        fontSize: 9,
        fontWeight: true,
        fill: '#ffffff'
      }
    }
  }
};
