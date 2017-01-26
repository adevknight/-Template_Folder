// Creates a HowMySpendChangingChart.
// `options` is an Object containing:
//   data: the raw data set.
//   appendTo: a selector, to which the newly created chart is appended to.
function HowMySpendChangingChart(options) {
  var filteringValues = options.filterData;
  if (filteringValues) {
    filteringValues.forEach(function(filterData,i){
      options.data.dataset.map(function(actualDataGroup,index){
        actualDataGroup.values.forEach(function(actualData,ind){
          if(actualData.name === filterData) {
            options.data.dataset[index].values.splice(ind,1);
          }
        });
      });
    });
  }
  var dataset = options.data.dataset;
  var types = ['% of Revenue', 'Supplier Count'];

  var margin = {left: 50, right: 50, top: 50, bottom: 40};
  var width = $(options.appendTo).width() - margin.left - margin.right;
  var height = options.height - margin.top - margin.bottom;
  var legendPos = [width - 210, -40];
  d3.selectAll(".how-my-spend-changing-container").remove();
  d3.selectAll(".how-my-spend-changing-svg").remove();
  var chartContainer = d3.select(options.appendTo)
    .append('div')
    .attr('class', 'chart-container how-my-spend-changing-container')
    .style("width", width + margin.left + margin.right+"px")
    .style("height", (height-5) + margin.top + margin.bottom+"px");

  // The main svg.
  var svg = chartContainer.append('svg').attr("class","how-my-spend-changing-svg")
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

    var xScale = d3.scale.ordinal()
      .domain(data.data[0].values.map(function(d) {
        return d.name;
      }))
      .rangeRoundBands([0, width], 0.5);
    var yScale1 = d3.scale.linear()
      .domain([data.y.min, data.y.max[types[0]]])
      .range([height, 0]);
    var yScale2 = d3.scale.linear()
      .domain([data.y.min, data.y.max[types[1]]])
      .range([height, 0]);

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

    // Create left Y-axis labels.
    var yAxis1 = d3.svg.axis()
      .orient('left')
      .outerTickSize(0)
      .innerTickSize(-width - 40)
      .scale(yScale1)
      .ticks(data.y.max['niceNum'])
      .tickFormat(function(d) {
        if (d === 0) {
          return '';
        }
        return d + '%';
      });
    chartSvg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(-20, 0)')
      .call(yAxis1)
      .selectAll('text')
      .attr('class', 'axis-text')
      .attr('x', 20)
      .attr('y', -8);
    // Add left Y-axis title
    chartSvg.append('text')
      .attr('transform', 'rotate(-90)')
      .text('% OF REVENUE')
      .attr('class', 'y axis')
      .attr('x', -(height / 2) - 30)
      .attr('y', -margin.left + 15)
      .attr('class', 'yaxis-title');

    // Create right Y-axis labels.
    var yAxis2 = d3.svg.axis()
      .orient('right')
      .outerTickSize(0)
      .innerTickSize(0)
      .scale(yScale2)
      .ticks(data.y.max['niceNum'])
      .tickFormat(function(d) {
        if (d === 0) {
          return '';
        }
        return d / 1000 + 'K';
      });
    chartSvg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + width + ', 0)')
      .call(yAxis2)
      .selectAll('text')
      .attr('class', 'axis-text')
      .attr('y', -8);
    // Add right Y-axis title
    chartSvg.append('text')
      .attr('transform', 'rotate(-90)')
      .text('SUPPLIER COUNT')
      .attr('class', 'y axis')
      .attr('x', -(height / 2) - 35)
      .attr('y', width + margin.left - 10)
      .attr('class', 'yaxis-title');


    // Plot the actual data.
    chartSvg.selectAll('p')
      .data(data.data)
      .enter()
      .append('g')
      .each(function(item) {
        var d3Data = d3.select(this)
          .selectAll('p')
          .data(item.values)
          .enter();

        if (item.name === types[0]) {
          d3Data.append('rect')
            .attr('x', function(d) {
              return xScale(d.name);
            })
            .attr('width', xScale.rangeBand())
            .attr('y', function(d) {
              return yScale1(d.value);
            })
            .attr('height', function(d) {
              return height - yScale1(d.value);
            })
            .style('fill', item.color);
        } else if (item.name === types[1]) {
          // Define the line
          var lineFunc = d3.svg.line()
            .x(function(d) {
              return xScale(d.name);
            })
            .y(function(d) {
              return yScale2(d.value);
            })
            .interpolate('linear');

          // Draw lines
          d3.select(this)
            .attr('transform', function() {
              return 'translate(' + (xScale.rangeBand() / 2) + ',0)';
            })
            .append('path')
            .attr('class', 'line')
            .style('stroke', function() {
              return 3;
            })
            .attr('d', lineFunc(item.values))
            .attr('stroke', item.color)
            .attr('stroke-width', 2)
            .attr('fill', 'none');

          // Draw points
          d3Data.append('circle')
            .attr('stroke', item.color)
            .attr('fill', item.color)
            .attr('cx', function(d) {
              return xScale(d.name);
            })
            .attr('cy', function(d) {
              return yScale2(d.value);
            })
            .attr('r', 4);
        }

      });

    // Add entries for each of the legend label.
    data.data.forEach(function(item, i) {
      chartSvg.append('rect')
        .attr('x', legendPos[0] + i * 140)
        .attr('width', 8)
        .attr('y', legendPos[1])
        .attr('height', 8)
        .style('fill', item.color);

      chartSvg.append('text')
        .text(item.name)
        .attr('x', legendPos[0] + i * 140 + 20)
        .attr('y', legendPos[1] + 8)
        .attr('class', 'legend-text');
    });

  }

  // Get the max values from array, and generate the Y Axis
  function getMaxYAxis(data) {
    var res = {};

    var factor;
    var niceNum = 0;
    data.forEach(function(item) {

      var max = d3.max(item.values, function(d) {
        return d.value;
      });

      if (item.name === types[0]) {
        factor = 10;
      } else if (item.name === types[1]) {
        factor = 1000;
      }

      niceNum = Math.max(niceNum, Math.ceil(max / factor));
    });

    res.niceNum = niceNum;
    res[types[0]] = niceNum * 10;
    res[types[1]] = niceNum * 1000;

    return res;
  }
}
