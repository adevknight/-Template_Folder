// Creates a SourcingResultsChart.
// `options` is an Object containing:
//   data: the raw data set.
//   appendTo: a selector, to which the newly created chart is appended to.
function SourcingResultsChart(options) {

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

  var margin = {left: 20, right: 20, top: 20, bottom: 20};
  var upperPartHeight = 155;
  var width = $(options.appendTo).width() - margin.left - margin.right;
  var height = 340 - margin.top - margin.bottom - upperPartHeight;

  // The main svg.
  d3.selectAll(".sourcing-results-container").remove();

  var chartContainer = d3.select(options.appendTo)
    .append('div')
    .attr('class', 'chart-container sourcing-results-container');

  // Generate upper part html
  var upperData = options.data.upperData;
  var upperHtml = '<table class="upper-table" cellspacing="0" cellpadding="0">'
    + '<tr class="tr1"><td class="td11"><font class="label1">'
    + upperData.data1
    + '</font><br><font class="label2">BASE LINE SPEND</font></td>'
    + '<td class="td12"><font class="label1">'
    + upperData.data2
    + '</font><br><font class="label2">SAVINGS WITH SCENARIO</font></td>'
    + '<td class="td13"><font class="label1">'
    + upperData.data3
    + '</font><br><font class="label2">SPEND WITH SCENARIO</font>'
    + '<div class="smallbox"><div class="ibracket">'
    + '<img class="img1" src="i/right-bracket.png"/></div>'
    + '<div><div class="text"><font class="label3">'
    + upperData.data4
    + '</font></div><div class="text"><font class="label4">OF SKUS ALLOCATED</font>'
    + '</div></div>'
    + '<div class="ibracket"><img class="img2" src="i/left-bracket.png"/>'
    + '</div></div></td></tr>'
    + '<tr><td colspan="3" class="td21"><font>SCENARIO PROFILE</font></td></tr></table>';

  var upperPart = chartContainer.append('div')
    .attr('height', upperPartHeight)
    .attr('class', 'table-container-upper')
    .html(upperHtml);

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

  renderRaw(options.data.dataset);


  // The core rendering function. Handles almost everything.
  function renderRaw(data) {
    // Clear old data. IE11 hack.
    if (chartSvg) {
      chartSvg.remove();
    }
    chartSvg = svg.append('g');

    var total = d3.sum(data, function(d) {
      return d.value;
    });

    var xScale = d3.scale.linear()
      .domain([0, total])
      .range([0, width]);

    var xnum = 0;
    data.forEach(function(item) {
      item.x = xnum;
      xnum += item.value;
    });

    // Plot the actual data.
    chartSvg.selectAll('p')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return xScale(d.x);
      })
      .attr('width', function(d) {
        return xScale(d.value);
      })
      .attr('y', function() {
        return 0;
      })
      .attr('height', function() {
        return height;
      })
      .style('fill', function(d) {
        return d.color;
      });

    // Add text to it
    data.forEach(function(item) {
      chartSvg.append('text')
        .text(item.name)
        .attr('x', xScale(item.x + item.value / 2) - 23)
        .attr('y', height / 2)
        .attr('class', 'treemap-text');
    });

  }

}
