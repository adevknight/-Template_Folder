// Creates a WhatMySpendBreakdownTreemapChart.
// `options` is an Object containing:
//   data: the raw data set.
//   appendTo: a selector, to which the newly created chart is appended to.
function WhatMySpendBreakdownTreemapChart(options) {
  var filteringValues = options.filterData;
  if (filteringValues) {
    filteringValues.forEach(function(filterData,i){
      options.data.dataset.children.map(function(actualData,index){
        if(filterData === actualData.name) {
          options.data.dataset.children.splice(index,1);
        }
      });
    });
  }
  var dataset = options.data.dataset;
  var margin = options.margin;
  var width = ($(options.appendTo).width()+10) - margin.left - margin.right;
  var height = options.height - margin.top - margin.bottom;
  var legendPos = [width - 280, -30];

  // The main svg.
  d3.selectAll(".what-my-spend-breakdown-svg").remove();
  d3.selectAll(".what-my-spend-breakdown-treemap-container").remove();

  var chartContainer = d3.select(options.appendTo)
    .append('div')
    .attr('class', 'chart-container what-my-spend-breakdown-treemap-container');

  var svg = chartContainer.append('svg').attr("class","what-my-spend-breakdown-svg")
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

    // Prepare tree map layout
    var treemap = d3.layout.treemap()
      .size([width, height])
      .sort(function(a, b) {
        return a.parent.name - b.parent.name;
        })
        .value(function(d) {
          return d.value;
        });

    var nodes = treemap.nodes(data);

    var groups = chartSvg.selectAll('g')
      .data(nodes.filter(function(d) {
        return !d.children;
      }))
      .enter()
      .append('g');

    // Draw nodes
    groups.append('rect')
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y;
      })
      .attr('width', function(d) {
        return d.dx - 1;
      })
      .attr('height', function(d) {
        return d.dy - 1;
      })
      .style('fill', function(d) {
        return d.parent.color;
      });

    // Add text for each node
    groups.append('text')
      .attr('class', 'treemap-text')
      .attr('x', function(d) {
        return d.x + d.dx / 2;
      })
      .attr('y', function(d) {
        return d.y + d.dy / 2 + 4;
      })
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return d.dx > 50 ? 'Supplier ' + d.name : d.name;
      });


    // Add entries for each of the legend label.
    data.children.forEach(function(item, i) {
      chartSvg.append('rect')
        .attr('x', legendPos[0] + i * 60)
        .attr('width', 8)
        .attr('y', legendPos[1])
        .attr('height', 8)
        .style('fill', item.color);

      chartSvg.append('text')
        .text(item.name)
        .attr('x', legendPos[0] + i * 60 + 16)
        .attr('y', legendPos[1] + 8)
        .attr('class', 'legend-text');
    });

  }

}
