// Creates a WhatMySavingsRealizedChart.
// `options` is an Object containing:
//   data: the raw data set.
//   appendTo: a selector, to which the newly created chart is appended to.
//   maxXAxis: the max X-axis label
function WhatMySavingsRealizedChart(options) {
  var dataset = options.data.dataset;
  var chartType = options.chartType;

  var filteringValues = options.filterData;
  // filter function for double chart
  if(filteringValues) {
    filteringValues.forEach(function(totalData,totali){
      totalData.forEach(function(normalData,normali){
        Object.keys(options.data.dataset).forEach(function(key,keyi){
          options.data.dataset[key].forEach(function(currentData,currenti){
            currentData.values.forEach(function(filterData,filteri){
              if(normalData===filterData.name){
                options.data.dataset[key][currenti].values.splice(filteri,1);
              }
            });
          });
        });
      });
    });
  }
  d3.selectAll(".what-my-savings-realized-container").remove();

  var chart1Labels = dataset.chart1[0].values.map(function(d) {
    return d.name;
  });
  var chart2Labels = dataset.chart2[0].values.map(function(d) {
    return d.name;
  });

  var margin = options.margin;
  var barWidth = 10;
  var columnWidth = 20;
  var containerWidth = $(options.appendTo).width();
  var width = $(options.appendTo).width()/2 - margin.left - margin.right - 30;
  var height1 = chart1Labels.length * columnWidth;
  var height2 = chart2Labels.length * columnWidth;
  var legendPos = [60, 0];

  var container = d3.select(options.appendTo)
    .append('div')
    .attr('class', 'what-my-savings-realized-container');

  // The X-Axis svg to show X-Axis lable.
  var xAxisSVG = container
    .append('div')
    .attr('class', 'xaxis-container')
    .append('svg')
    .attr('width', containerWidth)
    .attr('height', 20)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  var chartContainer1 = container
    .append('div')
    .attr('class', 'chart-container1');

  var chartContainer2 = container
    .append('div')
    .attr('class', 'chart-container2');


  // The main svg1 and svg2.
  var svg1 = chartContainer1.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height1)
    .attr('style', 'overflow:auto;')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + (margin.top - 15) + ')');
  var svg2 = chartContainer2.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height2)
    .attr('style', 'overflow:auto;')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + (margin.top - 15) + ')');

  // An element that holds the stuff in the SVG that can change.
  // We need this because we cannot clear the SVG on IE11 using .html('')
  // because IE11 doesn't support innerHTML on SVGs.
  var chartSvg1 = null;
  var chartSvg2 = null;

  renderRaw({
    x: {
      'min': 0,
      'max': options.maxXAxis
    },
    data: dataset
  });


  // The core rendering function. Handles almost everything.
  function renderRaw(data) {
    // Clear old data. IE11 hack.
    if (chartSvg1) {
      chartSvg1.remove();
    }
    if (chartSvg2) {
      chartSvg2.remove();
    }
    chartSvg1 = svg1.append('g');
    chartSvg2 = svg2.append('g');

    var yScale1 = d3.scale.ordinal()
      .domain(chart1Labels)
      .rangeRoundBands([0, height1], 0.5);
    var yScale2 = d3.scale.ordinal()
      .domain(chart2Labels)
      .rangeRoundBands([0, height2], 0.5);
    var xScale = d3.scale.linear()
      .domain([data.x.min, data.x.max])
      .range([0, width]);

    // Create X-axis labels.
    var xAxisTitle = d3.svg.axis()
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(xScale)
      .ticks(2)
      .tickFormat(function(d) {
        if (d === 0) {
          return '';
        }
        return '$' + d;
      })
      .orient('top');
    // show first X-Axis labels
    xAxisSVG.append('g')
      .attr('class', 'x axis')
      .call(xAxisTitle)
      .selectAll('text')
      .attr('x', 0)
      .attr('y', -8)
      .attr('class', 'axis-text');

    // show second X-Axis labels
    xAxisSVG.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(' + (width + margin.left + margin.right + 35) + ', 0)')
      .call(xAxisTitle)
      .selectAll('text')
      .attr('x', 0)
      .attr('y', -8)
      .attr('class', 'axis-text');

    // show X-Axis grid
    var xAxis1 = d3.svg.axis()
      .outerTickSize(0)
      .innerTickSize(-height1 - margin.top)
      .scale(xScale)
      .ticks(2)
      .tickFormat(function() {
        return '';
      })
      .orient('top');
    chartSvg1.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, -20)')
      .call(xAxis1);

    var xAxis2 = d3.svg.axis()
      .outerTickSize(0)
      .innerTickSize(-height2 - margin.top)
      .scale(xScale)
      .ticks(2)
      .tickFormat(function() {
        return '';
      })
      .orient('top');
    chartSvg2.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, -20)')
      .call(xAxis2);

    // Create chart1 Y-axis labels.
    var yAxis1 = d3.svg.axis()
      .orient('left')
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(yScale1);
    chartSvg1.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(-5, 0)')
      .call(yAxis1)
      .selectAll('text')
      .attr('class', 'axis-text');

    // Create chart2 Y-axis labels.
    var yAxis2 = d3.svg.axis()
      .orient('left')
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(yScale2);
    chartSvg2.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(-5, 0)')
      .call(yAxis2)
      .selectAll('text')
      .attr('class', 'axis-text');


    // Prepare the stack layout
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

    function noTargetSavings(d) {
      return d.name !== 'Target Savings';
    }

    function onlyTargetSavings(d) {
      return d.name === 'Target Savings';
    }

    var stackData1 = stack(data.data.chart1.filter(noTargetSavings));
    var stackData2 = stack(data.data.chart2.filter(noTargetSavings));
    var dataTargetSavings1 = data.data.chart1.filter(onlyTargetSavings)[0];
    var dataTargetSavings2 = data.data.chart2.filter(onlyTargetSavings)[0];

    // Plot the actual data.
    // Draw chart1
    // Group the elements
    var groups1 = chartSvg1.selectAll('p')
      .data(stackData1)
      .enter()
      .append('g')
      .attr('transform', function() {
        return 'translate(0,0)';
      })
      .style('fill', function(d) {
        return d.color;
      });

    // Draw rects
    groups1.selectAll('rect')
      .data(function(d) {
        return d.values;
      })
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return xScale(d.y0);
      })
      .attr('y', function(d) {
        return yScale1(d.name);
      })
      .attr('width', function(d) {
        return xScale(d.y);
      })
      .attr('height', function() {
        return barWidth;
      });

    // Draw TargetSaving
    dataTargetSavings1.values.forEach(function(item) {
      chartSvg1.append('rect')
        .attr('x', xScale(item.value) - 2)
        .attr('width', 4)
        .attr('y', yScale1(item.name))
        .attr('height', barWidth)
        .style('fill', dataTargetSavings1.color);
    });

    // Draw chart2
    // Group the elements
    var groups2 = chartSvg2.selectAll('p')
      .data(stackData2)
      .enter()
      .append('g')
      .attr('transform', function() {
        return 'translate(0,0)';
      })
      .style('fill', function(d) {
        return d.color;
      });

    // Draw rects
    groups2.selectAll('rect')
      .data(function(d) {
        return d.values;
      })
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return xScale(d.y0);
      })
      .attr('y', function(d) {
        return yScale2(d.name);
      })
      .attr('width', function(d) {
        return xScale(d.y);
      })
      .attr('height', function() {
        return barWidth;
      });

    // Draw TargetSaving
    dataTargetSavings2.values.forEach(function(item) {
      chartSvg2.append('rect')
        .attr('x', xScale(item.value) - 2)
        .attr('width', 4)
        .attr('y', yScale2(item.name))
        .attr('height', barWidth)
        .style('fill', dataTargetSavings2.color);
    });


    var legendSVG = container.append('div')
      .attr('class', 'legend-container')
      .append('svg')
      .attr('width', containerWidth)
      .attr('height', 20)
      .append('g')
      .attr('transform', 'translate(-10, 0)');

    // Add entries for each of the legend label.
    data.data.chart1.forEach(function(item, i) {
      var rectWidth = 8;
      if (item.name === 'Target Savings') {
        rectWidth = 4;
      }

      legendSVG.append('rect')
        .attr('x', legendPos[0] + i * 140)
        .attr('width', rectWidth)
        .attr('y', legendPos[1])
        .attr('height', 8)
        .style('fill', item.color);

      legendSVG.append('text')
        .text(item.name)
        .attr('x', legendPos[0] + i * 140 + 12)
        .attr('y', legendPos[1] + 8)
        .attr('class', 'legend-text');
    });

  }
}
