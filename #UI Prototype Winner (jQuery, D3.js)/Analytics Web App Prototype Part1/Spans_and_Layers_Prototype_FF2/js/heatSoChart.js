"use strict";
(function ( $ ) {
  $.fn.heatSocChart = function(customOptions) {
    var container = this.attr("class");
    var margin = {top: 20, right: 21, bottom: 40, left: 80},
        width = this.width() - margin.left - margin.right,
        height = 360 - margin.top - margin.bottom;

    //Json
    d3.json("data/"+customOptions.jsonName+".json", function(data){
      var axisInfo = data.axisInfo;
      data = data.layers;


      // filter options
      if(customOptions.filterValue){
        customOptions.filterValue.forEach(function(filterData,index) {
          data.map(function(chartData,i){
            if(chartData.colKey.toLowerCase() === filterData.toLowerCase()){
              data[i].row = null;
              data[i].col = null;
              data[i].colKey = "";
              data[i].value = null;
              data[i].color = "transparent";
            }
          });
        });
      }

      var maxCol = d3.max(data, function(d){ return parseInt(d.col); });
      var maxRow = d3.max(data, function(d){ return parseInt(d.row); });
      //height of eac row in the heat map
      //width of each column in the map
      var gridWidth = Math.floor(width/maxCol),
          gridHeight = Math.floor(height/maxRow);

      //Create an array for labels
      var rowLables = [], colLabels = [];
      for(let i=1; i<=maxRow; i++){
        rowLables.push(i)
      }
      var nonRepeated = [];
      var colArray = [];
      data.map(function(d,i){
        if($.inArray(d.colKey, nonRepeated) === -1)
        {
          nonRepeated.push(d.colKey);
          colArray.push(d.col);
        }
      });
      nonRepeated.forEach(function(item,indx){
          colLabels.push(item.toUpperCase());
      });

      //Chartcontainer
      d3.selectAll("."+container+" .heat-soc-chart-svg").remove();
      var chartContainer = d3.select(".heat-soc-chart")
           .append("svg").attr("class","heat-soc-chart-svg")
           .attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom + 20)
           .append("g")
           .attr("transform","translate("+ margin.left +","+ margin.top+")");

       //Chart axis info append
       var chartNote = d3.select(".heat-soc-chart svg").append("g").attr("class","chart-note");
       // var chartNote = svg.append("g").attr("class","chart-note");
       chartNote.append("text").data(axisInfo)
         .text(function(d){ return d.xAxisText})
         .attr("x", function(d){
           return (width/2)+20;
         })
         .attr("y", (height+margin.top+margin.bottom)+15)
         .attr("class","axis-hint");;

         chartNote.append("text").data(axisInfo)
           .text(function(d){ return d.yAxisText})
           .attr("x", function(d){
             return -(this.getBBox().width/2)-( (height+margin.top)/ 2)
           })
           .attr("class","axis-hint")
           .attr("transform", "rotate(-90)  translate(0,"+30+")");

       //Layer labels
       var groupRows = chartContainer.selectAll(".groupRow")
           .data(rowLables).enter()
           .append("g").attr("class", "groupRow")
           .attr("transform",function(d, i){
             return "translate(-20,"+ i*gridHeight+")"
           });

       var layerLabels = groupRows.append("text")
           .text(function(d){ return d; })
           .attr("x", 0)
           .attr("y", gridHeight/2)
           .style("text-anchor","middle");
       //border line
       var bottomBorder = groupRows.append("line")
          .attr("class", "borderLine")
          .attr("x2", width)
          .attr("y1", function(d,i){ return gridHeight; })
          .attr("y2", function(d,i){ return gridHeight; })
      //Grade labels
      var groupCols = chartContainer.selectAll(".groupCol")
          .data(colLabels).enter()
          .append("g").attr("class", "groupCol")
          .attr("transform",function(d, i){
            return "translate("+parseInt((colArray[i]-1)*gridWidth)+","+(height+20)+")"
          });
      var gradeLabels = groupCols.append("text")
          .text(function(d){ return d; })
          .attr("x", 0)
          .attr("y", 0).attr("dy",0)
            .style("text-anchor","middle").call(wrap, gridWidth).attr("transform",function(){
              return "translate("+gridWidth/2+",0)";
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
              var noNumber = [];
              words.forEach(function(d,i){
                noNumber[i] = words[i].replace(/[0-9]/g, '');
              });
              words = noNumber;
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


      //gridGroup of rectangle
      var gridGroup = chartContainer.append("g")
          .attr("class", "gridGroup");

    //inner rectangel
    var heatmapGroup = gridGroup.selectAll(".smallRect")
      .data(data, function(d){ return d.row + ":" + d.col; })
      .enter().append("rect")
      .attr("class", "smallRect")
      .attr("width", 25)
      .attr("height", 17)
      .attr("x", function(d){
        return (((d.col-1)*gridWidth)+(gridWidth/2))-(25/2);
      })
      .attr("y", function(d){
        return ((d.row-1)*gridHeight)+(gridHeight/2)-(17/2);
      })
      .style("fill", function(d) { return d.color });

     var rectText = gridGroup.selectAll(".txt")
        .data(data, function(d){ return d.row + ":" + d.col; })
        .enter().append("text").attr("class", "txt")
        .text(function(d) { return d.value; })
        .attr("x", function(d){ return ((d.col-1)*gridWidth)+(gridWidth/2)- (this.getBBox().width/2); })
        .attr("y", function(d){ return ((d.row-1)*gridHeight)+(gridHeight/2); })
        .attr("dy", 4)
        .style("fill", "#fff");

    });
  }
}( jQuery ));
