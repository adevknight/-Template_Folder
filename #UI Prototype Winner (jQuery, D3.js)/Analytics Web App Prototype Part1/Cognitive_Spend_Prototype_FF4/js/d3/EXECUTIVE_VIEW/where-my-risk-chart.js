// Creates a WhereMyRiskChart.
// `options` is an Object containing:
//   data: the raw data set.
//   appendTo: a selector, to which the newly created chart is appended to.
function WhereMyRiskChart(options) {
  var dataset = options.data.dataset;
  var types = ['LOW', 'MEDIUM', 'HIGH'];
  var filteringValues = options.filterData;
  if(filteringValues){
    filteringValues.forEach(function(filterData, i){
      types.map(function(actualData, index){
        if (filterData === actualData) {
          types.splice(index, 1);
        }
      })
    })
  }
  d3.selectAll(".where-my-risk-container").remove();
  var margin = options.margin;
  var width = $(options.appendTo).width() - margin.left - margin.right;
  var height = options.height - margin.top - margin.bottom;

  var chartContainer = d3.select(options.appendTo)
    .append('div')
    .attr('class', 'chart-container where-my-risk-container');

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

    var xScale = d3.scale.ordinal()
      .domain(types)
      .rangeRoundBands([0, width], 0.05);
    var yScale = d3.scale.ordinal()
      .domain(types)
      .rangeRoundBands([height, 0], 0.1);


    var xScale2 = d3.scale.linear()
      .domain(data.range)
      .range([0, xScale.rangeBand()]);
    var yScale2 = d3.scale.linear()
      .domain(data.range)
      .range([yScale.rangeBand(), 0]);

    // Add chart title
    chartSvg.append('text')
      .text('OVERALL RISK SCORE 35%')
      .attr('class', 'title')
      .attr('x', width / 2 - 75)
      .attr('y', -5);

    // Create X-axis labels.
    var xAxis = d3.svg.axis()
      .orient('buttom')
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(xScale);
    chartSvg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(xAxis)
      .selectAll('text')
      .attr('class', 'axis-text');
    // Add X-axis title
    chartSvg.append('text')
      .text('LIKELIHOOD')
      .attr('x', width / 2 - 40)
      .attr('y', height + 30)
      .attr('class', 'xaxis-title');


    // Create Y-axis labels.
    var yAxis = d3.svg.axis()
      .orient('left')
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(yScale);
    chartSvg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(0, 0)')
      .call(yAxis)
      .selectAll('text')
      .attr('class', 'axis-text');
    // Add Y-axis title
    chartSvg.append('text')
      .attr('transform', 'rotate(-90)')
      .text('RISK IMPACT')
      .attr('x', -height / 2 - 40)
      .attr('y', -55)
      .attr('class', 'yaxis-title');


    // Plot the actual data.
    // Draw backgroud
    chartSvg.selectAll('p')
      .data(types)
      .enter()
      .append('g')
      .each(function(item) {
        d3.select(this)
          .selectAll('p')
          .data(types)
          .enter()
          .append('rect')
          .attr('x', function(d) {
            return xScale(d);
          })
          .attr('width', xScale.rangeBand())
          .attr('y', function() {
            return yScale(item);
          })
          .attr('height', function() {
            return yScale.rangeBand();
          })
          .style('fill', data.colors[0]);
      });

    // Draw points
    types.forEach(function(item1) {
      types.forEach(function(item2) {
        chartSvg.append('g')
          .attr('transform', function() {
            return 'translate(' + xScale(item1) + ',' + yScale(item2) + ')';
          })
          .selectAll('p')
          .data(data[item1][item2])
          .enter()
          .append('circle')
          .attr('stroke', data.colors[1])
          .attr('fill', data.colors[1])
          .attr('cx', function(d) {
            return xScale2(d.x);
          })
          .attr('cy', function(d) {
            return yScale2(d.y);
          })
          .attr('r', 4);
      });
    });

  }

}
