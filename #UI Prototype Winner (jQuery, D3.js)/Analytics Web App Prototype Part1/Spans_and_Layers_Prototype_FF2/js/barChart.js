"use strict";
(function ( $ ) {
  $.fn.barChartD3 = function(customOptions) {

    var container = this.attr("class");
    var margin = {top: 60, right: 30, bottom: 30, left: 40},
      width = this.width()-70,
      height = 225,
      svgHeight = height + 105;
    var leftSpace = 60;
    var textColor,legendGroup;

    //Json data fetching
    d3.json("data/countManagingRelationships.json", function(error, data){
      var axisTexts = data.barAxis;
      var data = data.bar;
      var barWidth,barGroup;
      var filterValues = [];
      // filtering value options
      if(customOptions.filterValue){
        customOptions.filterValue.forEach(function(d){
          data[d].color = "";
          data[d].ofManagers=null;
        });
      }

      // xScale
      var x = d3.scaleBand()
      .range([0, width-leftSpace]).domain(data.map(function(d) { return d.ofDirectReports; }));

      // yScale
      var y = d3.scaleLinear()
      .domain([0, 200])
      .range([height, 0]);

      // Axis datas
      var xAxis = d3.axisBottom()
      .scale(x).ticks(20);
      var yAxis = d3.axisLeft()
      .scale(y).ticks(5).tickSize(-width);

      // chart svg appending
      d3.selectAll(".bar-chart-svg").remove();
      var barChart = d3.select("."+container).append("svg").attr("class","bar-chart-svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // axis note appending
      var chartNote = d3.select(".bar-chart-svg").append("g").attr("class","chart-note");
      chartNote.append("text").data(axisTexts).text(function(d){return d.xAxisText}).attr("x", function(){
          return -(this.getBBox().width/2)-(svgHeight / 2) ;
      }).attr("transform", "rotate(-90)  translate(0,"+10+")").attr("class","axis-hint");

      chartNote.append("text").data(axisTexts).text(function(d){return d.yAxisText}).attr("y",svgHeight - 10).attr("x", function(){
        return (width / 2)-(this.getBBox().width/2) + leftSpace ;
      }).attr("transform", "translate(0,"+10+")").attr("class","axis-hint");;

      //  Axis appending
      barChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate("+leftSpace+"," + height + ")")
      .call(xAxis).selectAll("text").style("text-anchor","middle");
      barChart.append("g")
      .attr("class", "y axis")
      .call(yAxis).selectAll("text").attr("transform","translate(10,-10)");

      // appending group for bars
      barChart.append("g").attr("class", "bar-group").attr("transform","translate("+leftSpace+",0)");

      // bar width calculation
      barWidth = (width-leftSpace) / data.length;

      // bars appending
      barGroup = barChart.select(".bar-group").selectAll(".bars")
      .data(data)
      .enter().append("g").attr("class","bars")
      .attr("transform", function(d,i){
        return "translate("+(i * barWidth) + ", 0)";
      });
      barGroup.append("rect")
      .attr("y", function(d) { return y(d.ofManagers); })
      .attr("height", function(d) { return height - y(d.ofManagers); })
      .attr("width", x.bandwidth() - 10).attr("transform", "translate(5,0)").attr("fill",function(d){return d.color});

      // adding color for bar text based on bar height
      var addColor = function(currentText,textColor) {
        d3.select(currentText).attr("fill",textColor);
      };

      // appending bar text
      barGroup.append("text")
      .attr("y", function(d) {
        var textPosition =  ((height - y(d.ofManagers))/2)+y(d.ofManagers);
        if (textPosition < (height - 10)) {
          textColor = "#fff";
          addColor(this,textColor);
          return textPosition;
        }
        else {
          textColor = "#636363";
          addColor(this,textColor);
          return y(d.ofManagers) - 12;
        }
      }).attr("dy", ".75em").attr("class",textColor)
      .text(function(d) { return d.ofManagers; }).attr("x", function(){
        return ((x.bandwidth() - 10) / 2)-(this.getBBox().width/4);
      }).attr("transform", "translate(10,0)");

      // legends adding
      chartNote.append("g").data(axisTexts).attr("class","legends-container");
      axisTexts.map(function(da){
        da.legends.map(function(d,i) {
          legendGroup = chartNote.append("g").attr("class","legends-group").attr("transform","translate("+ (width-leftSpace)  +","+(i*20)+")");
          legendGroup.append("rect").attr("width","10").attr("height","10").attr("fill",d.color);
          legendGroup.append("text").text(d.legendFor).attr("x",20).attr("y",8);
        });
      });
    });

  };

}( jQuery ));
