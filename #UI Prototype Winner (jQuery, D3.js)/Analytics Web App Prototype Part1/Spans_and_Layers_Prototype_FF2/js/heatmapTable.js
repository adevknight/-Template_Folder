"use strict";
(function($){
  $.fn.heatmapTable = function(options){
    var defaults = {
      height: 400,
      data: "data/heatmapDist.json",
      margin: {
        top: 40,
        right: 0,
        bottom: 0,
        left: 105
      },
      colLbl: "grade",
      rowLbl: "layer",
      type: "distribution",
      rowLblPos: -65,
      colLblPos: -18
    }
    var settings = $.extend(defaults,options || {});
    $(this).css("min-height", settings.height)

    //bar chart function calling
    return this.each(function(){
      var className = $(this).attr('class').split(' ')[0];
      var container = $(this).attr("class");
      var margin = settings.margin,
          width = $(this).width() - margin.left - margin.right,
          height = settings.height - margin.top - margin.bottom;

      //Json
      d3.json(settings.data, function(data){
        data = data.heatData;
        if(settings.filterValue) {
          settings.filterValue.forEach(function(filterData,i){
            data.map(function(chartData,i){
              if(filterData === chartData.Grade) {
                data.splice(i,1);
              }
            });
          });
        }
        var nonRepeated = [];
        data.map(function(d,i){
          if($.inArray(d.Grade, nonRepeated) === -1) nonRepeated.push(d.Grade);
        });
        if(settings.filterValue) {
          nonRepeated.forEach(function(colLabel,i){
            settings.filterValue.forEach(function(filterData,index){
              if(colLabel === filterData) {
                nonRepeated.splice(i,1);
              }
            });
          });
        }
        var maxCol = d3.max(data, function(d){ return parseInt(d.Grade); });
        var maxRow = d3.max(data, function(d){ return parseInt(d.Layer); });

        //height of eac row in the heat map
        //width of each column in the map
        var gridWidth = (width/nonRepeated.length),
            gridHeight = (height/maxRow);

        //Create an array for labels
        var rowLables = [], colLabels = [];
        for(let i=1; i<=maxRow; i++){
          rowLables.push(settings.rowLbl.toUpperCase()+" "+i)
        }
        if(settings.type === "distribution") {
            nonRepeated.forEach(function(colLabelData,i){
              colLabels.push(settings.colLbl.toUpperCase()+" "+colLabelData);
            });
        } else if(settings.type === "direct") {
            nonRepeated.forEach(function(colLabelData,i){
              if(nonRepeated.length-1 === i) {
                colLabels.push(colLabelData+"+");
              }else {
                colLabels.push(colLabelData);
              }
            });
        } else if(settings.type === "grade") {
            rowLables = [];
            for(let i=1; i<=maxRow; i++){
              (i===maxRow) ? rowLables.push("Grand Total ".toUpperCase()) : rowLables.push("Grade ".toUpperCase()+ i)

            }
            nonRepeated.forEach(function(colLabelData,i){
              if(nonRepeated.length-1 === i) {
                colLabels.push(colLabelData+"+");
              }else {
                colLabels.push(colLabelData);
              }
            });
        }

        //Chartcontainer
        d3.selectAll("."+className+" svg").remove();
        var chartContainer = d3.select("."+className)
             .append("svg").attr("class", className+"-svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform","translate("+ margin.left +","+ margin.top+")");

          //gridGroup of rectangle
          var gridGroup = chartContainer.append("g")
              .attr("class", "gridGroup");
          //Rectangle group
          var boxGroup = gridGroup.selectAll(".boxGroup")
            .data(data, function(d){ return d.Layer + ":" + d.Grade; })
            .enter().append("g")
            .attr("class", "boxGroup")
            .attr("transform",function(d, i){
              return "translate("+(nonRepeated.indexOf(d.Grade)) * gridWidth+","+(d.Layer-1) * gridHeight+")"
            });
          //Append rectangle
          var gridBox = boxGroup.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("class", "rectBorder")
            .attr("width", gridWidth)
            .attr("height", gridHeight)
            .style("fill", function(d) { return d.color });

         //Append rectangle text
         var rectText = gridGroup.selectAll(".txt")
            .data(data, function(d){ return d.Layer + ":" + d.Grade; })
            .enter().append("text").attr("class", "txt")
            .text(function(d) { return d.value })
            .attr("x", function(d){ return ((nonRepeated.indexOf(d.Grade))*gridWidth)+(gridWidth/2)- (this.getBBox().width/2); })
            .attr("y", function(d){ return ((d.Layer-1)*gridHeight)+(gridHeight/2); })
            .attr("dy", 5)
            .style("fill", function(d) { return d.colorText });


          //Layer labels
          var groupRows = chartContainer.selectAll(".groupRow")
              .data(rowLables).enter()
              .append("g").attr("class", "groupRow")
              .attr("transform",function(d, i){
                return "translate("+settings.rowLblPos+","+ i*gridHeight+")"
              });

          var layerLabels = groupRows.append("text")
              .text(function(d){ return d; })
              .attr("class", "labl")
              .attr("x", 0)
              .attr("y", function(d){
                return (gridHeight/2)+(this.getBBox().height/2);
              })
              .style("text-anchor","middle");

         //Grade labels
         var groupCols = chartContainer.selectAll(".groupCol")
             .data(colLabels).enter()
             .append("g").attr("class", "groupCol")
             .attr("transform",function(d, i){
               return "translate("+ ((i*gridWidth) + gridWidth/nonRepeated.length)+","+settings.colLblPos+")"
             });
         var gradeLabels = groupCols.append("text")
             .text(function(d){ return d; })
             .attr("class", "labl")
             .attr("x", 40)
             .attr("y", 0)
             .style("text-anchor","middle");

        //Draw xline
        var gridXLine = groupRows.append("line")
           .attr("class", "gridXLine")
           .attr("x1", (-settings.rowLblPos)+5)
           .attr("x2", width+65)
           .attr("y1", 0)
           .attr("y2", 0);
       //Draw yline
       var groupYline = chartContainer.selectAll(".groupYline")
           .data(colLabels).enter()
           .append("g").attr("class", "groupYline")
           .attr("transform",function(d, i){
             return "translate("+ ((i*gridWidth))+",0)"
           });
       var gridYLine = groupYline.append("line")
          .attr("class", "gridYLine")
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", 0)
          .attr("y2", height+5)
      });
    });
  }
}(jQuery));
