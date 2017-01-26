"use strict";
$(document).ready(function(){
  // barchart initializer
  if($(".bar-chart").length) {
    $(".bar-chart").barChartD3({
      filterValue: []
    });
  }

  // water fall chart scripts
  if($(".direct-reports-waterfall").length){
    $(".direct-reports-waterfall").waterFall({
      filterValue: []
    });
  }

  // scattePlot chart
  if($(".tenure-comapensation-chart").length){
    $(".tenure-comapensation-chart").scattePlot({
      filterValue: []
    });
  }

  // by grade box plot js by grade
  if($(".boxplot-by-grade").length){
    $(".boxplot-by-grade").boxPlot({
      jsonNmae: "byGrade",
      filterValue: []
    });
  };

// by grade box plot js by layer
  if($(".boxplot-by-layer").length){
    $(".boxplot-by-layer").boxPlot({
      jsonNmae: "byLayer",
      filterValue: []
    });
  };

// by grade box plot js by families
  if($(".boxplot-by-families").length){
    $(".boxplot-by-families").boxPlot({
      jsonNmae: "byFamily",
      filterValue: []
    });
  };

// filter functionality
  $(document).on("click",".filter-set",function(){
    $(this).closest(".filter-set-main").toggleClass("expanded");
  });

//Manage layer chart
  if($(".manage-layer-chart").length){
    $(".manage-layer-chart").doubleSideBarChart({
      height: 303,
      margin: {
        top: 45,
        right: 21,
        bottom: 69,
        left: 140
      },
      ticks: 6,
      data: "data/manageLayer.json"
    });
  }

  //Divison Layerchart
  if($(".division-layer-chart").length){
    $(".division-layer-chart").doubleSideBarChart({
      height: 365,
      margin: {
        top: 45,
        right: 21,
        bottom: 69,
        left: 300
      },
      ticks: 6,
      data: "data/divisionChart.json"
    });
  }

  //Heatmap SoC Chart
  if($(".heat-soc-chart").length){
    $(".heat-soc-chart").heatSocChart({
      jsonName: "Soc",
      filterValue: []
    });
  }

  //span2 heatmap distribution
  if($(".heat-dist-layer-chart").length){
    $(".heat-dist-layer-chart").heatmapTable({
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
    });
  }

  //span2 heatmap report
  if($(".heat-report-layer-chart").length){
    $(".heat-report-layer-chart").heatmapTable({
      height: 360,
      data: "data/heatmapReport.json",
      margin: {
        top: 40,
        right: 0,
        bottom: 0,
        left: 105
      },
      ylabel: "layer",
      type: "direct"
    });
  }

  //span2 heatmap Direct
  if($(".heat-direct-layer-chart").length){
    $(".heat-direct-layer-chart").heatmapTable({
      height: 240,
      data: "data/heatmapDirect.json",
      margin: {
        top: 40,
        right: 0,
        bottom: 0,
        left: 105
      },
      type: "grade"
    });
  }

  //Span 6 heat map compensate
  if($(".heat-compensate-layer-chart").length){
    $(".heat-compensate-layer-chart").heatmapTable({
      height: 398,
      data: "data/heatmapCompensate.json",
      margin: {
        top: 40,
        right: 0,
        bottom: 0,
        left: 105
      },
      colLbl: "grade",
      rowLbl: "layer",
      type: "distribution"
    });
  }

  //Manage layer chart
  if($(".managetwo-layer-chart").length){
    $(".managetwo-layer-chart").doubleSideBarChart({
      height: 435,
      margin: {
        top: 45,
        right: 21,
        bottom: 69,
        left: 115
      },
      ticks: 6,
      data: "data/manageLayertwo.json"
    });
  }
  //Manage layer chart span 3
  if($(".managethree-layer-chart").length){
    $(".managethree-layer-chart").doubleSideBarChart({
      height: 500,
      margin: {
        top: 45,
        right: 21,
        bottom: 100,
        left: 120
      },
      ticks: 6,
      data: "data/manageLayerthree.json"
    });
  }
  //Division layer chart span 3
  if($(".divisionthree-layer-chart").length){
    $(".divisionthree-layer-chart").doubleSideBarChart({
      height: 590,
      margin: {
        top: 45,
        right: 21,
        bottom: 100,
        left: 150
      },
      ticks: 6,
      wrap: true,
      data: "data/divisionChartthree.json"
    });
  }

  // opportunities nav dropdown
  $('.opportunities-li').on("click", function(e){
    e.stopPropagation();
    $(".opportun-inner-nav").toggle(100);
    e.preventDefault();
  });
  // clicking outside opportunities nav dropdown hide
  $(document).on("click", function() {
    $(".opportun-inner-nav").hide(100);
  });
  $(".opportun-inner-nav").on("click", function(e){
    e.stopPropagation();
  });


});
