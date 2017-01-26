// Creates a WhatISpendingOnChart.
// `options` is an Object containing:
//   data: the raw data set.
//   appendTo: a selector, to which the newly created chart is appended to.
//   type: data type name.
//   showLegend: whether show legend.
//   maxXAxis: the max number for X-axis.
function WhatISpendingOnChart(options) {
  var dataset = options.data.dataset;
  var datatype = options.type;
  var showLegend = options.showLegend;
  var valuesLength = dataset[datatype][0].values.length;

  var filteringValues = options.filterData;
  if(filteringValues){
    filteringValues.forEach(function(filterData, i){
      dataset[datatype].map(function(val){
        val.values.map(function(actualData, index){
          if (filterData === actualData.name) {
            val.values.splice(index, 1);
          }
        });
      });
    });
  }

  d3.selectAll(".am-"+datatype).remove();
  var margin = options.margin;
  var barWidth = 10;
  var columnWidth = 20;
  var width = $(options.appendTo).width() - margin.left - margin.right;
  // var width = 400 - margin.left - margin.right;
  var height = valuesLength * columnWidth;
  var legendPos = [70, 30];

  var container = d3.select(options.appendTo)
    .append('div');

  // if need show legend the chart height is different
  if (showLegend) {
    container.attr('class', 'chart-container what-i-spending-on-container show-legend am-'+datatype);
  } else {
    container.attr('class', 'chart-container what-i-spending-on-container am-'+datatype);
  }

  // The X-Axis svg to show X-Axis lable at top.
  var xAxisSVG = container
    .append('div')
    .attr('class', 'xaxis-container')
    .append('svg')
    .attr('width', width + margin.left)
    .attr('height', 20)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  var chartContainer = container
    .append('div')
    .attr('class', 'chart-container1')
    .style("width", width + margin.left + margin.right+"px");

  // The main svg.
  var svg = chartContainer.append('svg')
    .attr('width', width + margin.left)
    .attr('height', height)
    .attr('style', 'overflow:auto;')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', 0)');

  // An element that holds the stuff in the SVG that can change.
  // We need this because we cannot clear the SVG on IE11 using .html('')
  // because IE11 doesn't support innerHTML on SVGs.
  var chartSvg = null;

  renderRaw({
    x: {
      'min': 0,
      'max': options.maxXAxis
    },
    data: dataset[datatype]
  });


  // The core rendering function. Handles almost everything.
  function renderRaw(data) {
    // Clear old data. IE11 hack.
    if (chartSvg) {
      chartSvg.remove();
    }
    chartSvg = svg.append('g');

    var y = d3.scale.ordinal()
      .domain(data.data[0].values.map(function(d) {
        return d.name;
      }))
      .rangeRoundBands([0, height], 0.2);
    var x = d3.scale.linear()
      .domain([data.x.min, data.x.max])
      .range([0, width]);

    // Create X-axis labels.
    var xAxisTitle = d3.svg.axis()
      .orient('top')
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(x)
      .ticks(5)
      .tickFormat(function(d) {
        if (d === 0) {
          return '';
        }
        return '$' + d;
      });
    xAxisSVG.append('g')
      .attr('class', 'x axis')
      .call(xAxisTitle)
      .selectAll('text')
      .attr('class', 'axis-text');

    // Draw X-axis grid
    var xAxis = d3.svg.axis()
      .orient('top')
      .outerTickSize(0)
      .innerTickSize(height - 10)
      .scale(x)
      .ticks(5)
      .tickFormat(function() {
        return '';
      });
    chartSvg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + (height - 10) + ')')
      .call(xAxis);

    // Create Y-axis labels.
    var yAxis = d3.svg.axis()
      .orient('left')
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(y);
    chartSvg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(-4, -3)')
      .call(yAxis)
      .selectAll('text')
      .attr('class', 'axis-text');

    // Plot the actual data, use stack layout of d3.js.
    var stack = d3.layout.stack()
      .values(function(d) {
        return d.values;
      })
      .x(function(d) {
        return d.name;
      })
      .y(function(d) {
        return d.value;
      });

    var stackData = stack(data.data);

    // Group the elements
    var groups = chartSvg.selectAll('p')
      .data(stackData)
      .enter()
      .append('g')
      .attr('transform', function() {
        return 'translate(0,0)';
      })
      .style('fill', function(d) {
        return d.color;
      });

    // Draw rects
    groups.selectAll('rect')
      .data(function(d) {
        return d.values;
      })
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return x(d.y0);
      })
      .attr('y', function(d) {
        return y(d.name);
      })
      .attr('width', function(d) {
        return x(d.y);
      })
      .attr('height', function() {
        return barWidth;
      });

    if (showLegend) {
      var legendSVG = container.append('div')
        .attr('class', 'legend-container')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', 40)
        .append('g');

      // Add entries for each of the legend label.
      stackData.forEach(function(item, i) {
        legendSVG.append('rect')
          .attr('x', i * 140 + margin.left)
          .attr('width', 8)
          .attr('y', legendPos[1])
          .attr('height', 8)
          .style('fill', item.color);

        legendSVG.append('text')
          .text(item.name)
          .attr('x', i * 140 + 12 + margin.left)
          .attr('y', legendPos[1] + 8)
          .attr('class', 'legend-text');
      });
    }

  }
}
