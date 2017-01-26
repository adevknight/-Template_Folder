// Creates a VarianceHeatChart.
// `options` is an Object containing:
//   data: the raw data set.
//   appendTo: a selector, to which the newly created chart is appended to.
function VarianceHeatChart(options) {
  var filteringValues = options.filterData;
  if(filteringValues){
    filteringValues.forEach(function(filterData, i){
      options.data.dataset.data.map(function(actualData, index){
        if (filterData === actualData.name) {
          options.data.dataset.data.splice(index, 1);
        }
      })
    })
  }
  // The main svg.
  d3.selectAll(".variance-heat-container").remove();

  var dataset = options.data.dataset;
  var xLabels = dataset.data.map(function(d) {
    return d.name;
  });
  var yLabels = dataset.data[0].value.map(function(d) {
    return d.name;
  });

  var margin = options.margin;
  var width = $(options.appendTo).width() - margin.left - margin.right;
  var height = options.height - margin.top - margin.bottom;

  var legendPos = [width + margin.left - 335, -margin.top + 26];
  var chartContainer = d3.select(options.appendTo)
    .append('div')
    .attr('class', 'chart-container variance-heat-container')
    .style('width', width + margin.left + margin.right+"px")
    .style('height', height + margin.top + margin.bottom+"px");

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

  renderRaw(dataset);

  // The core rendering function. Handles almost everything.
  function renderRaw(data) {
    // Clear old data. IE11 hack.
    if (chartSvg) {
      chartSvg.remove();
    }
    chartSvg = svg.append('g');

    var dataSeries = data.series;
    var xScale = d3.scale.ordinal()
      .domain(xLabels)
      .rangeRoundBands([0, width], 0.01);
    var yScale = d3.scale.ordinal()
      .domain(yLabels)
      .rangeRoundBands([0, height], 0.05);

    var columHeight = yScale.rangeBand();

    // Create X-axis labels.
    var xAxis = d3.svg.axis()
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(xScale)
      .ticks(xLabels.length)
      .tickFormat(function(d) {
        return d;
      })
      .orient('buttom');
    chartSvg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + (height+7) + ')')
      .call(xAxis)
      .selectAll('text')
      .attr('class', 'axis-text');

    // Create Y-axis labels.
    var yAxis = d3.svg.axis()
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(yScale)
      .ticks(yLabels.length)
      .tickFormat(function(d) {
        return d;
      })
      .orient('left');
    chartSvg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(-20,0)')
      .call(yAxis)
      .selectAll('text')
      .attr('class', 'axis-text');


    // Plot the actual data.
    chartSvg.selectAll('p')
      .data(data.data)
      .enter()
      .append('g')
      .each(function(item) {
        d3.select(this)
          .selectAll('p')
          .data(item.value)
          .enter()
          .append('rect')
          .attr('x', function() {
            return xScale(item.name);
          })
          .attr('width', xScale.rangeBand())
          .attr('y', function(d) {
            return yScale(d.name);
          })
          .attr('height', function() {
            return columHeight;
          })
          .style('fill', function(d) {
            var k, item2;
            for (k = 0; k < dataSeries.length; k++) {
              item2 = dataSeries[k];
              if (d.value >= item2.min && d.value <= item2.max) {
                return item2.color;
              }
            }
            throw new Error('The item value is not in range');
          });
      });

    // Add entries for each of the legend label.
    chartSvg.append('text')
      .text('Low Variance')
      .attr('x', legendPos[0])
      .attr('y', legendPos[1])
      .attr('class', 'legend-text');
    dataSeries.forEach(function(item, i) {
      chartSvg.append('rect')
        .attr('x', legendPos[0] + i * 20 + 90)
        .attr('width', 8)
        .attr('y', legendPos[1] - 8)
        .attr('height', 8)
        .style('fill', item.color);
    });
    chartSvg.append('text')
      .text('High Variance')
      .attr('x', legendPos[0] + 170)
      .attr('y', legendPos[1])
      .attr('class', 'legend-text');
  }


}
