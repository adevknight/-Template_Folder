"use strict";
(function ( $ ) {
  $.fn.boxPlot = function(customOptions) {
    var container = this.attr("class");
    var labels = false; // show the text labels beside individual boxplots?
    var margin = {top: 30, right: 50, bottom: 70, left: 80};
    var  width = this.width() - margin.left - margin.right;
    var height = 256 - margin.top - margin.bottom;
    var noSpaceWidth = width + margin.left + margin.right ;
    var noSpaceHeight = height + margin.top + margin.bottom;

    var min = Infinity,
        max = -Infinity;

    // parse in the data
    d3.json("data/"+customOptions.jsonNmae+".json", function(error, data){
      var axisTexts = data.chartNote;
      data = data.boxPlot;
      // data array initialzing
      var plotData = [];
      var groupData = [];
      var allData = [];
      var bottomSpace = 40;
      // filtering value options
      if(customOptions.filterValue){
        customOptions.filterValue.forEach(function(d){
          delete data[0][d];
        });
      }
      Object.keys(data[0]).forEach(function(d,i){
        plotData[i] = [];
        plotData[i][1] = [];
        plotData[i][0] = d;
      });
      data.map(function(d,ind){
        Object.keys(d).forEach(function(key,i){
          var currentData = [];
          d[key].map(function(d,index){
            currentData[index]= d.value;
            max = Math.max(max,d.value);
            min = Math.min(min,d.value);
          });
          plotData[i][1] = currentData;

        });
      });

    	var chart = d3.box()
    		.whiskers(iqr(1.5))
    		.height(height)
    		.domain([0, max])
    		.showLabels(labels);
      d3.selectAll("."+container+" .box-blot-svg").remove();
    	var boxPlot = d3.select("."+container).append("svg")
    		.attr("width", noSpaceWidth)
    		.attr("height", noSpaceHeight + bottomSpace)
    		.attr("class", "box box-blot-svg")
    		.append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // axis note appending
      var chartNote = d3.select("."+container+" .box-blot-svg").append("g").attr("class","chart-note");
      chartNote.append("text").data(axisTexts).text(function(d){return d.yAxisText}).attr("transform",function(d){
         return "translate("+(this.getBBox().width/2 - margin.left + 10)+","+(noSpaceHeight/2 + this.getBBox().width/2)+" ) rotate(-90)";
      });

    	// the x-axis
    	var x = d3.scaleBand()
    		.domain( plotData.map(function(d) { return d[0] } ) )
    		.rangeRound([0 , noSpaceWidth-margin.left], 0.7, 0.3);

    	var xAxis = d3.axisBottom()
    		.scale(x);
    	// the y-axis
    	var y = d3.scaleLinear()
    		.domain([0, max])
    		.range([height + margin.top, margin.top]);
      var format = d3.format(",.2f");
    	var yAxis = d3.axisLeft()
        .scale(y).ticks(5).tickFormat(function(d){return "$" + format(d) + "M"});


        var boxGenerator = d3.select("."+container+" .box-blot-svg").append("g").attr("class","boxplot-outer-box");
        boxGenerator.append("line").attr("x1",margin.left).attr("y1",0).attr("x2",noSpaceWidth).attr("y2",0);
        boxGenerator.append("line").attr("x1",margin.left).attr("y1",noSpaceHeight).attr("x2",noSpaceWidth).attr("y2",noSpaceHeight);
        boxGenerator.append("line").attr("x1",margin.left).attr("y1",0).attr("x2",margin.left).attr("y2",noSpaceHeight);
        boxGenerator.append("line").attr("x1",noSpaceWidth).attr("y1",0).attr("x2",noSpaceWidth).attr("y2",noSpaceHeight);

        // appending lines
        var axisLineGroup = d3.select("."+container+" .box-blot-svg").append("g").attr("class","dashed-axis");
        axisLineGroup.append("line").attr("x1",margin.left).attr("y1",(noSpaceHeight - bottomSpace)).attr("x2", noSpaceWidth ).attr("y2",(noSpaceHeight - bottomSpace));


      // draw the dots
      var drawCircles = boxPlot.append("g").attr("class","points-container");
    	// draw the boxplots
    	boxPlot.selectAll(".box")
          .data(plotData)
    	  .enter().append("g")
    		.attr("transform", function(d) { return "translate(" +  (x(d[0]) + 15 )  + "," + margin.top + ")"; } ).attr("class","ratio-box")
          .call(chart.width(x.bandwidth() - 30))
      plotData.forEach(function(d,i){
        var xCalcuation = d[0];
        var yCalcuation;
        d[1].forEach(function(points,i){
          yCalcuation = points;
          drawCircles.append("circle").attr("class","plot-circle").attr("r",5)
          .attr("cx", (x(xCalcuation)+ (x.bandwidth() / 2)) ).attr("cy",y(yCalcuation)).attr("transform","translate(0,-5)");
        });
      });


      // wrapping texts
      function wrap(text, width) {
        text.each(function() {
          var text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              word,
              line = [],
              lineNumber = 0,
              lineHeight = 1.1, // ems
              y = text.attr("y"),
              dy = parseFloat(text.attr("dy")),
              tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
        });
      }

    	 // draw y axis
    	boxPlot.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    	// draw x axis
    	boxPlot.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (height  + margin.top + bottomSpace) + ")")
          .call(xAxis).selectAll(".tick text").call(wrap, x.bandwidth());
    });

    // Returns a function to compute the interquartile range.
    function iqr(k) {
      return function(d, i) {
        var q1 = d.quartiles[0],
            q3 = d.quartiles[2],
            iqr = (q3 - q1) * k,
            i = -1,
            j = d.length;
        while (d[++i] < q1 - iqr);
        while (d[--j] > q3 + iqr);
        return [i, j];
      };
    }
  };



  // box plot callculation start
  d3.box = function() {
    var width = 1,
        height = 1,
        duration = 0,
        domain = null,
        value = Number,
        whiskers = boxWhiskers,
        quartiles = boxQuartiles,
  	  showLabels = true, // whether or not to show text labels
  	  numBars = 4,
  	  curBar = 1,
        tickFormat = null;


      function constant(x) {
        return function() {
          return x;
        };
      }

    // For each small multiple…
    function box(g) {
      g.each(function(data, i) {
  	  var d = data[1].sort(d3.ascending);
        var g = d3.select(this),
            n = d.length,
            min = d[0],
            max = d[n - 1];

        // Compute quartiles. Must return exactly 3 elements.
        var quartileData = d.quartiles = quartiles(d);

        // Compute whiskers. Must return exactly 2 elements, or null.
        var whiskerIndices = whiskers && whiskers.call(this, d, i),
            whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

        // Compute outliers. If no whiskers are specified, all data are "outliers".
        // We compute the outliers as indices, so that we can join across transitions!
        var outlierIndices = whiskerIndices
            ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
            : d3.range(n);

        // Compute the new x-scale.
        var x1 = d3.scaleLinear()
            .domain(domain && domain.call(this, d, i) || [min, max])
            .range([height, 0]);

        // Retrieve the old x-scale, if this is an update.
        var x0 = this.__chart__ || d3.scaleLinear()
            .domain([0, Infinity])
  		 // .domain([0, max])
            .range(x1.range());

        // Stash the new scale.
        this.__chart__ = x1;

        // Update center line: the vertical line spanning the whiskers.
        var center = g.selectAll("line.center")
            .data(whiskerData ? [whiskerData] : []);

  	 //vertical line
        center.enter().insert("line", "rect")
            .attr("class", "center")
            .attr("x1", width / 2)
            .attr("y1", function(d) { return x0(d[0]); })
            .attr("x2", width / 2)
            .attr("y2", function(d) { return x0(d[1]); })
            .style("opacity", 1e-6)
          .transition()
            .duration(duration)
            .style("opacity", 1)
            .attr("y1", function(d) { return x1(d[0]); })
            .attr("y2", function(d) { return x1(d[1]); });

        center.transition()
            .duration(duration)
            .style("opacity", 1)
            .attr("y1", function(d) { return x1(d[0]); })
            .attr("y2", function(d) { return x1(d[1]); });

        center.exit().transition()
            .duration(duration)
            .style("opacity", 1e-6)
            .attr("y1", function(d) { return x1(d[0]); })
            .attr("y2", function(d) { return x1(d[1]); })
            .remove();

        // Update innerquartile box.
        var box = g.selectAll("rect.box")
            .data([quartileData]);

        box.enter().append("rect")
            .attr("class", "box full-rect")
            .attr("x", 0)
            .attr("y", function(d) { return x0(d[2]); })
            .attr("width", width)
            .attr("height", function(d) {return x0(d[0]) - x0(d[2]); })
          .transition()
            .duration(duration)
            .attr("y", function(d) { return x1(d[2]); })
            .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });
        // small rectacngle
        var smallBox = g.selectAll(".first-rect")
            .data([quartileData]);
        smallBox.enter().append("rect").attr("class","first-rect").attr("width", width).attr("height", function(d) { return x1(d[1]) - x1(d[2]); })
        .attr("x",0).attr("y",function(d) { return x1(d[2]); }).attr("fill","#000");

        box.transition()
            .duration(duration)
            .attr("y", function(d) { return x1(d[2]); })
            .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

            // update border lines
            var boxLines = g.selectAll(".box-plot-borders")
                .data([quartileData]);

            boxLines.enter().append("line").attr("class","box-plot-borders").attr("x1",0)
            .attr("y1",function(d) { return x1(d[2]); }).attr("x2",width)
            .attr("y2",function(d) { return x1(d[2]); }).attr("fill","#959595");

            boxLines.enter().append("line").attr("class","box-plot-borders")
            .attr("x1",0).attr("y1",function(d) { return x1(d[2]);}).attr("x2",width)
            .attr("y2",function(d) { return x1(d[2]); }).attr("fill","#959595").attr("transform",function(d) {var totalBoxHeight = x1(d[0]) - x1(d[2]);return "translate(0,"+ totalBoxHeight+")"; });

        // Update whiskers.
        var whisker = g.selectAll("line.whisker")
            .data(whiskerData || []);

        whisker.enter().insert("line", "text")
            .attr("class", "whisker")
            .attr("x1", 0)
            .attr("y1", x0)
            .attr("x2", 0 + width)
            .attr("y2", x0)
            .style("opacity", 1e-6)
          .transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1)
            .style("opacity", 1);

        whisker.transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1)
            .style("opacity", 1);

        whisker.exit().transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1)
            .style("opacity", 1e-6)
            .remove();

        // Update outliers.
        var outlier = g.selectAll("circle.outlier")
            .data(outlierIndices, Number);



        outlier.transition()
            .duration(duration)
            .attr("cy", function(i) { return x1(d[i]); })
            .style("opacity", 1);

        outlier.exit().transition()
            .duration(duration)
            .attr("cy", function(i) { return x1(d[i]); })
            .style("opacity", 1e-6)
            .remove();

        // Compute the tick format.
        var format = tickFormat || x1.tickFormat(8);

        // Update box ticks.
        var boxTick = g.selectAll("text.box")
            .data(quartileData);
  	 if(showLabels == true) {
        boxTick.enter().append("text")
            .attr("class", "box")
            .attr("dy", ".3em")
            .attr("dx", function(d, i) { return i & 1 ? 6 : -6 })
            .attr("x", function(d, i) { return i & 1 ?  + width : 0 })
            .attr("y", x0)
            .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
            .text(format)
          .transition()
            .duration(duration)
            .attr("y", x1);
  	}

        boxTick.transition()
            .duration(duration)
            .text(format)
            .attr("y", x1);

        // Update whisker ticks. These are handled separately from the box
        // ticks because they may or may not exist, and we want don't want
        // to join box ticks pre-transition with whisker ticks post-.
        var whiskerTick = g.selectAll("text.whisker")
            .data(whiskerData || []);
  	if(showLabels == true) {
        whiskerTick.enter().append("text")
            .attr("class", "whisker")
            .attr("dy", ".3em")
            .attr("dx", 6)
            .attr("x", width)
            .attr("y", x0)
            .text(format)
            .style("opacity", 1e-6)
          .transition()
            .duration(duration)
            .attr("y", x1)
            .style("opacity", 1);
  	}
        whiskerTick.transition()
            .duration(duration)
            .text(format)
            .attr("y", x1)
            .style("opacity", 1);

        whiskerTick.exit().transition()
            .duration(duration)
            .attr("y", x1)
            .style("opacity", 1e-6)
            .remove();
      });
      d3.timerFlush();
    }

    box.width = function(x) {
      if (!arguments.length) return width;
      width = x;
      return box;
    };

    box.height = function(x) {
      if (!arguments.length) return height;
      height = x;
      return box;
    };

    box.tickFormat = function(x) {
      if (!arguments.length) return tickFormat;
      tickFormat = x;
      return box;
    };

    box.duration = function(x) {
      if (!arguments.length) return duration;
      duration = x;
      return box;
    };

    box.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x == null ? x : constant(x);
      return box;
    };

    box.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return box;
    };

    box.whiskers = function(x) {
      if (!arguments.length) return whiskers;
      whiskers = x;
      return box;
    };

    box.showLabels = function(x) {
      if (!arguments.length) return showLabels;
      showLabels = x;
      return box;
    };

    box.quartiles = function(x) {
      if (!arguments.length) return quartiles;
      quartiles = x;
      return box;
    };

    return box;
  };

  function boxWhiskers(d) {
    return [0, d.length - 1];
  }

  function boxQuartiles(d) {
    return [
      d3.quantile(d, .25),
      d3.quantile(d, .5),
      d3.quantile(d, .75)
    ];
  }

}( jQuery ));
