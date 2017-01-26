"use strict";
(function ( $ ) {
  $.fn.scattePlot = function(customOptions) {
    var container = this.attr("class");
    var margin = {top: 20, right: 30, bottom: 40, left: 80},
      width = this.width(),
      bottomSpace = 60,
      height = 130 + bottomSpace + margin.top,leftSpace = 60,
      svgHeight = height + 40,
      xAxisHeight = height - bottomSpace + margin.bottom;
    var textColor,legendGroup;

    //Json data fetching
    d3.json("data/tenureCompensation.json", function(error, data){
      var axisTexts = data.scattePlotAxis;
      var data = data.scattePlot;
      var barWidth,barGroup;
      // filtering value options
      if(customOptions.filterValue){
        customOptions.filterValue.forEach(function(filteringData){
          data.map(function(actualData,i){
            if(actualData.xValue == filteringData){
              data.splice(i,1);
            }
          });
        });
      }
    // xScale
    var x = d3.scaleLinear()
    .range([0, width-margin.left-leftSpace-20]).domain([0,d3.max(data,function(d){return d.xValue;})]);

    // yScale
    var y = d3.scaleLinear()
    .domain([0, d3.max(data,function(d){return d.yValue;})])
    .range([height-bottomSpace, 0]);
    var format = d3.format(",.2f");

    // Axis datas
    var xAxis = d3.axisBottom()
    .scale(x).ticks(15);
    var yAxis = d3.axisLeft()
    .scale(y).ticks(5).tickFormat(function(d){return "$" + format(d) + "M"});

    // chart svg appending
    d3.selectAll(".scattPlot-chart-svg").remove();
    var scattPlot = d3.select("."+container).append("svg").data(data).attr("class","scattPlot-chart-svg")
    .attr("width", width)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("height",svgHeight);

    // appending lines
    var axisLineGroup = d3.select(".scattPlot-chart-svg").append("g").attr("class","dashed-axis");
    axisLineGroup.append("line").attr("x1", (x(0)+ margin.left)).attr("y1",(y(0)+margin.top)).attr("x2", width ).attr("y2",y(0) + margin.top).style("stroke-dasharray", ("8, 8"));
    axisLineGroup.append("line").attr("x1", (x(0)+ margin.left+leftSpace)).attr("y1",height).attr("x2", (0+ margin.left+leftSpace)).attr("y2",0).style("stroke-dasharray", ("8, 8"));

    // outer box line generator
    var boxGenerator = d3.select(".scattPlot-chart-svg").append("g").attr("class","scattplot-outer-box");
    boxGenerator.append("line").attr("x1",margin.left).attr("y1",0).attr("x2",width).attr("y2",0);
    boxGenerator.append("line").attr("x1",margin.left).attr("y1",height).attr("x2",width).attr("y2",height);
    boxGenerator.append("line").attr("x1",margin.left).attr("y1",0).attr("x2",margin.left).attr("y2",height);
    boxGenerator.append("line").attr("x1",width).attr("y1",0).attr("x2",width).attr("y2",height);

    //  Axis appending
    scattPlot.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+leftSpace+"," + xAxisHeight + ")")
    .call(xAxis);
    scattPlot.append("g")
    .attr("class", "y axis")
    .call(yAxis).selectAll("text").attr("transform","translate(-15,0)");

    // axis note appending
    var chartNote = d3.select(".scattPlot-chart-svg").append("g").attr("class","chart-note");
    chartNote.append("text").data(axisTexts).text(function(d){return d.xAxisText}).attr("x", function(){
      return -(this.getBBox().width/2)-(xAxisHeight / 2) ;
    }).attr("transform", "rotate(-90)  translate(0,"+10+")");
    chartNote.append("text").data(axisTexts).text(function(d){return d.yAxisText}).attr("y",svgHeight - 10).attr("x", function(){
      return (width / 2)+(this.getBBox().width/2) - leftSpace ;
    }).attr("transform", "translate(0,"+10+")");

    // draw plot points
    var diamondContainer = scattPlot.append("g").attr("class","diamond-container").attr("transform","translate("+(leftSpace + 4)+",0)")
    diamondContainer.selectAll(".rect")
    .data(data)
    .enter().append("rect")
    .attr("class", "rect")
    .attr("width", 8)
    .attr("height", 8)
    .style("fill", function(d){return d.color;}).attr("transform", function(d){return "translate("+x(d.xValue)+","+(y(d.yValue)-11)+") rotate(45)"});
    });

  };

}( jQuery ));
