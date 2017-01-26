// Creates a WhatMySpendBreakdownChart.
// `options` is an Object containing:
//   data: the raw data set.
//   appendTo: a selector, to which the newly created chart is appended to.
function WhatMySpendBreakdownChart(options) {
  var filteringValues = options.filterData;
  if(filteringValues){
    filteringValues.forEach(function(filterData, i){
      options.data.dataset.map(function(actualData, index){
        if (filterData === actualData.name) {
          options.data.dataset.splice(index, 1);
        }
      })
    })
  }
  d3.selectAll(".what-my-spend-breakdown-container").remove();
  var margin = options.margin;
  var width = $(options.appendTo).width() - margin.left - margin.right;
  var height = options.height - margin.top - margin.bottom;

  var chartContainer = d3.select(options.appendTo)
    .append('div')
    .attr('class', 'chart-container what-my-spend-breakdown-container');

  // The main svg.
  var svg = chartContainer.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  // An element that holds the stuff in the SVG that can change.
  // We need this because we cannot clear the SVG on IE11 using .html('')
  // because IE11 doesn't support innerHTML on SVGs.
  var chartSvg = null;

  renderRaw({
    colors: options.data.colors,
    y: {
      'min': 0,
      'max': options.data.total
    },
    data: options.data.dataset
  });


  // The core rendering function. Handles almost everything.
  function renderRaw(data) {
    // Clear old data. IE11 hack.
    if (chartSvg) {
      chartSvg.remove();
    }
    chartSvg = svg.append('g');

    var maxValue = data.y.max;
    var leftValue = maxValue;
    data.data.forEach(function(item) {
      item.leftValue = leftValue;
      leftValue -= item.value;
    });
    var newDataSet = [
      {'name': 'TOTAL', 'value': maxValue, 'leftValue': maxValue}
    ].concat(data.data);
    newDataSet.push(
      {'name': 'OTHER', 'value': leftValue, 'leftValue': leftValue}
    );

    // var dataSeries = data.series;
    var xScale = d3.scale.ordinal()
      .domain(newDataSet.map(function(item) {
        return item.name;
      }))
      .rangeRoundBands([0, width], 0.2);
    var yScale = d3.scale.linear()
      .domain([data.y.min, maxValue])
      .rangeRound([height, 0]);

    // Create X-axis labels.
    var xAxis = d3.svg.axis()
      .orient('buttom')
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(xScale);
    chartSvg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + (height + 10) + ')')
      .call(xAxis)
      .selectAll('text')
      .attr('class', 'axis-text');

    // Create Y-axis labels.
    var yAxis = d3.svg.axis()
      .outerTickSize(0)
      .innerTickSize(-width - margin.left + 10)
      .scale(yScale)
      .ticks(5)
      .tickFormat(function(d) {
        if (d === 0) {
          return '';
        } else if (d >= 1000) {
          return '$' + Math.round(d / 1000) + 'K';
        }
        return '';
      })
      .orient('left');
    chartSvg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (-margin.left + 10) + ', 0)')
      .call(yAxis)
      .selectAll('text')
      .attr('class', 'axis-text')
      .attr('x', 0)
      .attr('y', -8)
      .style('text-anchor', 'start');


    // Plot the actual data.
    chartSvg.selectAll('p')
      .data(newDataSet)
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return xScale(d.name);
      })
      .attr('width', xScale.rangeBand())
      .attr('y', function(d) {
        return yScale(d.leftValue);
      })
      .attr('height', function(d) {
        return yScale(maxValue - d.value);
      })
      .style('fill', function(d) {
        if (d.name === 'TOTAL') {
          return data.colors.TOTAL;
        }

        return data.colors.OTHERS;
      });
  }
}
