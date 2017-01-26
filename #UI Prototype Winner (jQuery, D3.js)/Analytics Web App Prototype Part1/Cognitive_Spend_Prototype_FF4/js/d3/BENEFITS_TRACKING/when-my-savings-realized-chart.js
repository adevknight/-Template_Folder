// Creates a WhenMySavingsRealizedChart.
// `options` is an Object containing:
//   data: the raw data set.
//   appendTo: a selector, to which the newly created chart is appended to.
function WhenMySavingsRealizedChart(options) {
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
  d3.selectAll(".when-my-savings-realized-container").remove();

  var dataset = options.data.dataset;

  var margin = options.margin;
  var width = $(options.appendTo).width() - margin.left - margin.right;
  var height = options.height - margin.top - margin.bottom;

  var legendPos = [width - 90, -margin.top + 10];
  var chartContainer = d3.select(options.appendTo)
    .append('div')
    .attr('class', 'chart-container when-my-savings-realized-container');

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
    y: {
      'min': 0,
      'max': getMaxYAxis(dataset)
    },
    data: dataset
  });


  // The core rendering function. Handles almost everything.
  function renderRaw(data) {
    // Clear old data. IE11 hack.
    if (chartSvg) {
      chartSvg.remove();
    }
    chartSvg = svg.append('g');

    // var valueLength = data.data[0].values.length;
    var valueLength = (data.data.length>0)?data.data[0].values.length : 0;
    // Adjust the space between bars
    var nicePadSpace = 0.4;
    if (data.data.length > 3) {
      nicePadSpace = 0.7 - 0.1 * data.data.length;
    }

    var xScale = d3.scale.ordinal()
      .domain(d3.range(valueLength))
      .rangeRoundBands([0, width], nicePadSpace);
    var yScale = d3.scale.linear()
      .domain([data.y.min, data.y.max])
      .range([height, 0]);

    var barWidth = xScale.rangeBand() / data.data.length;

    // Create X-axis labels.
    var xAxis = d3.svg.axis()
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(xScale)
      .tickFormat(function(d) {
        return 'Q' + data.data[0].values[d].quarter + ',' + data.data[0].values[d].year;
      })
      .orient('buttom');
    chartSvg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + (height + 5) + ')')
      .call(xAxis)
      .selectAll('text')
      .attr('class', 'axis-text');


    // Create Y-axis labels.
    var yAxis = d3.svg.axis()
      .orient('left')
      .outerTickSize(0)
      .innerTickSize(-width - margin.left + 20)
      .scale(yScale)
      .ticks(4)
      .tickFormat(function(d) {
        if (d === 0) {
          return '';
        } else if (d < 1000) {
          return '$' + d;
        } else if (d >= 1000) {
          if (d % 1000 === 0) {
            return '$' + (d / 1000).toFixed(0) + 'K';
          }
          return '$' + (d / 1000).toFixed(1) + 'K';
        }
        return '';
      });
    chartSvg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(-30, 0)')
      .call(yAxis)
      .selectAll('text')
      .attr('x', 0)
      .attr('y', -8)
      .attr('class', 'axis-text')
      .style('text-anchor', 'start');

    // Add Y-axis title
    chartSvg.append('text')
      .attr('transform', 'rotate(-90)')
      .text('AMOUNT')
      .attr('x', -(height / 2))
      .attr('y', -(margin.left - 10))
      .attr('class', 'yaxis-title');


    // Plot the actual data.
    chartSvg.selectAll('p')
      .data(data.data)
      .enter()
      .append('g')
      .each(function(item, i) {
        d3.select(this)
          .attr('transform', function() {
            return 'translate(' + ((barWidth - 0.5) * i) + ',0)';
          })
          .selectAll('p')
          .data(item.values)
          .enter()
          .append('rect')
          .attr('x', function(d, j) {
            return xScale(j);
          })
          .attr('width', barWidth)
          .attr('y', function(d) {
            return yScale(d.value);
          })
          .attr('height', function(d) {
            return height - yScale(d.value);
          })
          .style('fill', item.color);
      });


    // Add entries for each of the legend label.
    data.data.forEach(function(item, i) {
      chartSvg.append('rect')
        .attr('x', legendPos[0])
        .attr('width', 8)
        .attr('y', legendPos[1] + i * 20 - 8)
        .attr('height', 8)
        .style('fill', item.color);

      chartSvg.append('text')
        .text(item.name)
        .attr('x', legendPos[0] + 12)
        .attr('y', legendPos[1] + i * 20)
        .attr('class', 'legend-text');
    });

  }

  // Get the max value from array, and generate the Y Axis
  function getMaxYAxis(data) {
    var max = 0;
    data.forEach(function(item) {
      max = Math.max(max, d3.max(item.values, function(d) {
        return d.value;
      }));

    });

    return Math.ceil(max / 500) * 500;
  }
}
