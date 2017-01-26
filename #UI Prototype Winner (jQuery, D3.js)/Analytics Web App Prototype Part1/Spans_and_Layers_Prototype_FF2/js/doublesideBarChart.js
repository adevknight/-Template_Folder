"use strict";
(function($){
  $.fn.doubleSideBarChart = function(options){
    var defaults = {
      height: 303,
      data: "data/manageLayer.json",
      wrap: false,
      margin: {
        top: 45,
        right: 21,
        bottom: 69,
        left: 50
      },
      ticks: 4,
      filterValue: []
    }
    var settings = $.extend(defaults,options || {});
    //bar chart function calling
    return this.each(function(){
      var className = $(this).attr('class').split(' ')[0];
      var container = $(this).attr("class");
      var margin = settings.margin,
          width = $(this).width() - margin.left - margin.right,
          height = settings.height - margin.top - margin.bottom;

      //XScale
      var x = d3.scaleLinear()
          .range([0, width]);
      //yScale
      var y = d3.scaleBand()
          .rangeRound([0, height])
          .paddingInner(0.2)
          .paddingOuter(0);
      //Xaxis
      var xAxis = d3.axisBottom(x)
        .ticks(settings.ticks)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickFormat(function(d){
          (d < 0) ? d=-d : d;
          return d;
        });
      //yAxis
      var yAxis = d3.axisLeft(y)
         .tickSizeInner(-(width));

      //ChartContainer
      d3.selectAll("."+className+" svg").remove();
      var svg = d3.select(this).append("svg").attr("class",className+"-svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.json(settings.data, function(data){
        var axisInfo = data.axisInfo;
        data = data.layers;
        // filter operation
        if(settings.filterValue) {
          settings.filterValue.forEach(function(filteringData,index){
            data.map(function(chartData,i){
              if(filteringData === chartData.name) {
                data.splice(i,1);
              }
            });
          });
        }
        x.domain([
          d3.min(data, function(d){ return -(d.xPositive+2)}),
          d3.max(data, function(d){ return d.yPositive+2})])
        y.domain(data.map(function (d) {
            return d.name;
        }));

        //Chart axis info append
        var chartNote = d3.select("."+className+" svg").append("g").attr("class","chart-note");
        chartNote.append("text").data(axisInfo)
          .text(function(d){ return d.xAxisText})
          .attr("x", function(d){
            return (x(0)+(margin.left)-(this.getBBox().width/2));
          })
          .attr("y", (height+margin.top+margin.bottom)-35)
          .attr("class","axis-hint");;

          chartNote.append("text").data(axisInfo)
            .text(function(d){ return d.yAxisText})
            .attr("x", function(d){
              return -(this.getBBox().width/2)-( (height+margin.top)/ 2)
            })
            .attr("class","axis-hint")
            .attr("transform", "rotate(-90)  translate(0,"+30+")");

          //Top borderLine
          var lineGroup = d3.select("."+className+" svg")
            .selectAll(".lineGroup")
            .data(data)
            .enter().append("g")
            .attr("class", "lineGroup")
            .attr("transform",function(d, i){
              return "translate(50,"+((i*y.step())+margin.top)+")"
            });
          var topBorder = lineGroup.append("line")
             .attr("class", "topBorder")
             .attr("x2", width+(margin.left-50))
             .attr("y1", function(d,i){
               return -(y.step()-y.bandwidth())/2;
             })
             .attr("y2", function(d,i){
               return -(y.step()-y.bandwidth())/2;
             })
           //Xline apped
           d3.select("."+className+" svg").append("g")
              .attr("class", "xLine")
              .attr("transform",function(d, i){
                return "translate(50,"+((i*y.step())+margin.top)+")"
              })
              .append("line")
              .attr("x2", width+(margin.left-50))
              .attr("y1", height)
              .attr("y2", height);

        //Right Side bar group
        var rightGroup = svg.selectAll(".rightGroup")
            .data(data)
            .enter().append("g")
            .attr("class", "rightGroup")
            .attr("transform",function(d, i){
              return "translate(0,"+(i*y.step())+")"
            });

        //Right side rectangle bar
        rightGroup.append("rect")
            .attr("class", "bar1")
            .attr("x", function (d) {
                return x(Math.min(0, d.xPositive));
            })
            .attr("width", function (d) {
                return Math.abs(x(d.xPositive) - x(0));
            })
            .attr("height", y.bandwidth());

       if(settings.wrap === true)   {
         lineGroup.append("text")
           .text(function(d){ return d.name.toUpperCase(); })
           .attr("class", "ylbl")
           .attr("x", 0)
           .attr("y", function (d,i) {
               return (y.bandwidth()/2)+(this.getBBox().height/2)-8;
           })
           .attr("dy",0)
           .style("fill", "#636363").call(wrap, 120);
       } else {
         lineGroup.append("text")
           .text(function(d){ return d.name.toUpperCase(); })
           .attr("class", "ylbl")
           .attr("x", 0)
           .attr("y", function (d,i) {return (y.bandwidth()/2)+(this.getBBox().height/2)-2;
           })
           .attr("dy",0)
           .style("fill", "#636363")
       }

        //Right bar label text
        rightGroup.append("text")
          .text(function(d){ return d.xPositive.toFixed(1); })
          .attr("class", "barLbl")
          .attr("x", function (d) {
            return x(Math.min(0, d.xPositive))+(Math.abs(x(d.xPositive) - x(0))/2);
          })
          .attr("y", function (d,i) {
              return (y.bandwidth()/2)+(this.getBBox().height/2)-3;
          })
          .style("fill", "#fff");

        //Left Side bar group
        var leftGroup = svg.selectAll(".leftGroup")
            .data(data)
            .enter().append("g")
            .attr("class", "leftGroup")
            .attr("transform",function(d, i){
              return "translate(0,"+(i*y.step())+")"
            });

        leftGroup.append("rect")
            .attr("class", "bar2")
            .attr("x", function (d) {
                return x(Math.min(0, -d.yPositive));
            })
            .attr("width", function (d) {
                return Math.abs(x(-d.yPositive) - x(0));
            })
            .attr("height", y.bandwidth());

        // Left bar label text
        leftGroup.append("text")
          .text(function(d){ return d.yPositive.toFixed(1); })
          .attr("class", "barLbl")
          .attr("x", function (d) {
            return x(Math.min(0, -d.yPositive))+(Math.abs(x(-d.yPositive) - x(0))/2);
          })
          .attr("y", function (d,i) {
              return (y.bandwidth()/2)+(this.getBBox().height/2)-4;
          })
          .style("fill", "#fff");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0,"+height+")")
            .call(xAxis).selectAll("text").attr("transform","translate(0,5)");

        svg.append("g")
            .attr("class", "zero axis")
            .append("line")
            .attr("x1", x(0))
            .attr("x2", x(0))
            .attr("y1", -23)
            .attr("y2", height)
            .style("stroke","#e1e1e1");

            //Text wrapping
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
      });
    });
  }
}(jQuery));
