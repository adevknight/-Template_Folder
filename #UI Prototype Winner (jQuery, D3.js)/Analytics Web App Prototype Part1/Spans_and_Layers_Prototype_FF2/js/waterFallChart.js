"use strict";
(function ( $ ) {
  $.fn.waterFall = function(customOptions) {
    var container = this.attr("class");
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = this.width(),
      height = 255,
      svgHeight = height + 115;
    var leftSpace = 0;
    var textColor,dy;

    //Json data fetching
    d3.json("data/0directReports.json", function(error, data){
      var axisTexts = data.waterFallAxis;
      var data = data.waterFall;
      var barWidth,barGroup;
      var padding = 0.3;
      // filtering value options
      if(customOptions.filterValue){
        customOptions.filterValue.forEach(function(d){
          data.forEach(function(fullData,i){
            if (fullData.label === d){
              data.splice(i,1);
            }
          });
        });
      }

      // xScale
      var x = d3.scaleBand()
      .range([1, width-40],padding);

      // yScale
      var y = d3.scaleLinear()
      .domain([0, 80])
      .range([height, 0]);

      // Axis datas
      var xAxis = d3.axisBottom()
      .scale(x).ticks(20);
      var yAxis = d3.axisLeft()
      .scale(y).ticks(4).tickSize(-width);

      // chart svg appending
      d3.selectAll(".waterFall-chart-svg").remove();
      var waterFallChart = d3.select("."+container).append("svg").attr("class","waterFall-chart-svg")
      .attr("width", width)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", "translate(30,60)");

      // axis text note
      var axisNote = d3.select(".waterFall-chart-svg").append("g").attr("class","axisNoteG");
      axisNote.append("text").data(axisTexts).text(function(d){return d.xAxisText}).attr("x", function(){
        return -(this.getBBox().width/2)-(svgHeight / 2) ;
          }).attr("transform", "rotate(-90)  translate(0,"+10+")");
      axisNote.append("text").data(axisTexts).text(function(d){return d.yAxisText}).attr("y",svgHeight - 10).attr("x", function(){
        return (width / 2)-(this.getBBox().width/2);
      }).attr("transform", "translate(0,"+10+")");

      // axis text wrapping based on brackets
      function wrap(text, width) {
          var labelText, textTag,y,normalText;
          var regExp = /\([^)]+\)/;
          var wrapText;

            text.each(function(data,i) {
              textTag = d3.select(this);
              if(textTag.text()==="Grand Total") {
                textTag.text("");
                textTag.append("tspan").attr("x", 0).attr("y", y).text("Grand");
                textTag.append("tspan").attr("x", 0).attr("y", y+20).text("Total");
              }else {
                y = parseInt(textTag.attr("y"));
                dy = textTag.attr("dy");
                labelText = textTag.text();
                normalText = labelText.replace(/ *\([^)]*\) */g, "");
                wrapText = regExp.exec(labelText);
                textTag.text("");
                textTag.append("tspan").attr("x", 0).attr("y", y).text(normalText);
                textTag.append("tspan").attr("x", 0).attr("y", y+20).text(wrapText);
              }
            });
      }

      // total last bar appending
      var cumulative = 0;
      for (var i = 0; i < data.length; i++) {
        data[i].start = cumulative;
        cumulative += data[i].value;
        data[i].end = cumulative;

        data[i].class = ( data[i].value >= 0 ) ? 'positive' : 'negative'
      }
      if(data.length){
        data.push({
          name: 'Total',
          end: cumulative,
          start: 0,
          class: 'total',
          label: 'Grand Total',
          value: cumulative
        });
      }
      x.domain(data.map(function(d) { return d.label; }));
      //  Chart axis appending
      waterFallChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate("+(leftSpace + 20) +"," + height + ")")
      .call(xAxis) .selectAll("text").call(wrap, x.range());
      waterFallChart.append("g")
      .attr("class", "y axis")
      .call(yAxis).selectAll("text").attr("transform","translate(10,-10)");
      // bar appending  setup
      var waterFallBar = waterFallChart.selectAll(".waterFallBar")
      .data(data)
      .enter().append("g")
      .attr("class", function(d) { return "waterFallBar " + d.class })
      .attr("transform", function(d) { if(x(d.label)){return "translate(" + (x(d.label) + 40) + ",0)"; }});

      // bar appending based on data
      waterFallBar.append("rect")
      .attr("y", function(d) { return y( Math.max(d.start, d.end) ); })
      .attr("height", function(d) { return Math.abs( y(d.start) - y(d.end) ); })
      .attr("width", x.bandwidth()- 40).attr("class","waterfall-bar");

      // data showing tooltip image style
      waterFallChart.append("svg:pattern")
      .attr("id", "grump_avatar")
      .attr("width", 45)
      .attr("height", 45)
      .attr("patternUnits", "userSpaceOnUse").append("svg:image")
      .attr("xlink:href", 'i/tip-chart.png')
      .attr("width", 45)
      .attr("height",45)
      .attr("x", 0)
      .attr("y", 0);
      // level tip appending at top of the bar
      var levelTip =  waterFallBar.append("g").attr("class","level-tip");
      levelTip.append("rect").data(data).attr("y", 0).attr("height", 45).attr("width",45).attr("class","tip-rect")
      .attr("transform","translate("+ (x.bandwidth()- 40  - 45) / 2 +",-52)").style("fill", "url(#grump_avatar)");

      // inserting text for level tip
      levelTip.append("text").data(data).text(function(d) { return d.value; }).style("text-anchor", "middle").attr("transform", "translate("+ (x.bandwidth()- 40)/2 + ",-34)");

    });

  };

}( jQuery ));
