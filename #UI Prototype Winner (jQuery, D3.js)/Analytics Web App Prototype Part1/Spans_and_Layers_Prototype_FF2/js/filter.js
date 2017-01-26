"use strict";
$(document).ready(function(){
    var getFilterValue = function(currentSelector) {
      var filteringArray = [];
      currentSelector = currentSelector.find(".filter-child-options input:checkbox");
      $(currentSelector).each(function(i,d){
        if($(d).prop("checked") == false){
          filteringArray.push($(this).val());
        }
      });
      return filteringArray;
    }

    // bar chart json file fetching
    if($(".count-manager-aside-wrapper").length){
      $.getJSON( "data/countManagingRelationships.json", function( data ) {
        $(".aside-filter-content .count-manager-aside-wrapper").append('<div class="managing-relationships-bar filter-set-main  count-manage-bar-chart"></div>');
        $(".count-manage-bar-chart").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
        data.bar.map(function(d,i){
          $(".count-manage-bar-chart .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ i +'"><span></span><i>'+d.ofDirectReports+'</i></label></div>');
        });
      });
    }

    // waterFall chart json file fetching
    if($(".direct-reports-waterfall-wrapper").length){
      $.getJSON( "data/0directReports.json", function( data ) {
        $(".aside-filter-content .direct-reports-waterfall-wrapper").append('<div class="direct-report-waterfall-bar filter-set-main  direct-report-waterfall-chart"></div>');
        $(".direct-report-waterfall-chart").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
        data.waterFall.map(function(d,i){
          $(".direct-report-waterfall-chart .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.label +'"><span></span><i>'+d.label+'</i></label></div>');
        });
      });
    }

    // scatte plot data fetching
    if($(".tenure-compensation-scatteplot-wrapper").length){
      let nonRepeated = [];
      $.getJSON( "data/tenureCompensation.json", function( data ) {
        $(".aside-filter-content .tenure-compensation-scatteplot-wrapper").append('<div class="tenure-compensation-scatteplot-dot filter-set-main  tenure-compensation-scatteplot-chart"></div>');
        $(".tenure-compensation-scatteplot-chart").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
        data.scattePlot.map(function(d,i){
          if($.inArray(d.xValue, nonRepeated) === -1) nonRepeated.push(d.xValue);
        });
        nonRepeated.forEach(function(d,i){
          $(".tenure-compensation-scatteplot-chart .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d +'"><span></span><i>'+d+'</i></label></div>');
        });
      });
    }

    // by layer data fetching
    if($(".boxplot-by-layer").length){
      $.getJSON( "data/byLayer.json", function( data ) {
        $(".aside-filter-content .by-layer-boxplot-wrapper").append('<div class=" filter-set-main  by-layer-boxplot-chart"></div>');
        $(".by-layer-boxplot-chart").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          Object.keys(data.boxPlot[0]).forEach(function(key,i){
            $(".by-layer-boxplot-chart .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ key +'"><span></span><i>'+key+'</i></label></div>');
          });
      });
    }

    // by grade data fetching
    if($(".by-grade-boxplot-wrapper").length){
      $.getJSON( "data/byGrade.json", function( data ) {
        $(".aside-filter-content .by-grade-boxplot-wrapper").append('<div class=" filter-set-main  by-grade-boxplot-chart"></div>');
        $(".by-grade-boxplot-chart").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          Object.keys(data.boxPlot[0]).forEach(function(key,i){
            $(".by-grade-boxplot-chart .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ key +'"><span></span><i>'+key+'</i></label></div>');
          });
      });
    }

    // by family data fetching
    if($(".by-family-boxplot-wrapper").length){
      $.getJSON( "data/byFamily.json", function( data ) {
        $(".aside-filter-content .by-family-boxplot-wrapper").append('<div class=" filter-set-main  by-family-boxplot-chart"></div>');
        $(".by-family-boxplot-chart").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          Object.keys(data.boxPlot[0]).forEach(function(key,i){
            $(".by-family-boxplot-chart .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ key +'"><span></span><i>'+key+'</i></label></div>');
          });
      });
    }

    // SoC Heat Map
    if($(".heat-soc-chart-wrapper").length){
      $.getJSON( "data/Soc.json", function( data ) {
        let nonRepeated = [];
        $(".aside-filter-content .heat-soc-chart-wrapper").append('<div class=" filter-set-main heat-soc-chart-filter"></div>');
        $(".heat-soc-chart-filter").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          data.layers.map(function(d,i){
            if($.inArray(d.colKey, nonRepeated) === -1) nonRepeated.push(d.colKey);
          });
          nonRepeated.forEach(function(d,i) {
            if(d !== "grand total") {
              $(".heat-soc-chart-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d +'"><span></span><i>'+d+'</i></label></div>');
            }
          });
      });
    }

    // SoC By Management Layer
    if($(".manage-layer-chart-wrapper").length){
      $.getJSON( "data/manageLayer.json", function( data ) {
        $(".aside-filter-content .manage-layer-chart-wrapper").append('<div class=" filter-set-main  manage-layer-chart-filter "></div>');
        $(".manage-layer-chart-filter").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          data.layers.map(function(d,i){
            $(".manage-layer-chart-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
          });
      });
    }

    // SoC By division
    if($(".division-layer-chart-wrapper").length){
      $.getJSON( "data/divisionChart.json", function( data ) {
        $(".aside-filter-content .division-layer-chart-wrapper").append('<div class=" filter-set-main  division-layer-chart-filter "></div>');
        $(".division-layer-chart-filter").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          data.layers.map(function(d,i){
            $(".division-layer-chart-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
          });
      });
    }

    // Span of Control by Layer
    if($(".span-control-by-layer-wrapper").length){
      $.getJSON( "data/manageLayerthree.json", function( data ) {
        $(".aside-filter-content .span-control-by-layer-wrapper").append('<div class=" filter-set-main  span-control-by-layer-chart-filter "></div>');
        $(".span-control-by-layer-chart-filter").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          data.layers.map(function(d,i){
            $(".span-control-by-layer-chart-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
          });
      });
    }

    // Span of Control by division
    if($(".span-control-by-division-wrapper").length){
      $.getJSON( "data/divisionChartthree.json", function( data ) {
        $(".aside-filter-content .span-control-by-division-wrapper").append('<div class=" filter-set-main  span-control-by-division-chart-filter"></div>');
        $(".span-control-by-division-chart-filter").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          data.layers.map(function(d,i){
            $(".span-control-by-division-chart-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
          });
      });
    }

    // SoC by Layer for the Division Selected
    if($(".soc-division-selected-wrapper").length){
      $.getJSON( "data/manageLayertwo.json", function( data ) {
        $(".aside-filter-content .soc-division-selected-wrapper").append('<div class=" filter-set-main  soc-division-selected-filter"></div>');
        $(".soc-division-selected-filter").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          data.layers.map(function(d,i){
            $(".soc-division-selected-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
          });
      });
    }

    // HC Distribution Across Layers and Grades
    if($(".heatmap-across-layers-grades-wrapper").length){
      let nonRepeated = [];
      $.getJSON( "data/heatmapDist.json", function( data ) {
        $(".aside-filter-content .heatmap-across-layers-grades-wrapper").append('<div class="filter-set-main  heatmap-across-layers-grades-filter "></div>');
        $(".heatmap-across-layers-grades-filter").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +' </span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          data.heatData.map(function(d,i){
            if($.inArray(d.Grade, nonRepeated) === -1) nonRepeated.push(d.Grade);
          });
          nonRepeated.forEach(function(d,i) {
              $(".heatmap-across-layers-grades-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d +'"><span></span><i>Grade '+d+'</i></label></div>');
          });
      });
    }

    // Avg Compensation Across Layers and Grades
    if($(".avg-across-layers-grades-wrapper").length){
      let nonRepeated = [];
      $.getJSON( "data/heatmapCompensate.json", function( data ) {
        $(".aside-filter-content .avg-across-layers-grades-wrapper").append('<div class="filter-set-main  avg-across-layers-grades-filter "></div>');
        $(".avg-across-layers-grades-filter").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +' </span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          data.heatData.map(function(d,i){
            if($.inArray(d.Grade, nonRepeated) === -1) nonRepeated.push(d.Grade);
          });
          nonRepeated.forEach(function(d,i) {
              $(".avg-across-layers-grades-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d +'"><span></span><i>Grade '+d+'</i></label></div>');
          });
      });
    }

    // Number of Direct Reports by Layer
    if($(".num-direct-report-chart-wrapper").length){
      let nonRepeated = [];
      $.getJSON( "data/heatmapReport.json", function( data ) {
        $(".aside-filter-content .num-direct-report-chart-wrapper").append('<div class="filter-set-main  num-direct-report-chart-filter "></div>');
        $(".num-direct-report-chart-filter").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+data.heading+'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          data.heatData.map(function(d,i){
            if($.inArray(d.Grade, nonRepeated) === -1) nonRepeated.push(d.Grade);
          });
          nonRepeated.forEach(function(d,i) {
            if(nonRepeated.length-1 === i) {
              $(".num-direct-report-chart-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d +'"><span></span><i>'+d+'+</i></label></div>');
            }else {
              $(".num-direct-report-chart-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d +'"><span></span><i>'+d+'</i></label></div>');
            }
          });
      });
    }


    // Number of Direct Reports by Grade
    if($(".number-direct-reports-grade-wrapper").length){
      let nonRepeated = [];
      $.getJSON( "data/heatmapDirect.json", function( data ) {
        $(".aside-filter-content .number-direct-reports-grade-wrapper").append('<div class="filter-set-main  number-direct-reports-grade-filter "></div>');
        $(".number-direct-reports-grade-filter").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+data.heading+'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
          data.heatData.map(function(d,i){
            if($.inArray(d.Grade, nonRepeated) === -1) nonRepeated.push(d.Grade);
          });
          nonRepeated.forEach(function(d,i) {
            if(nonRepeated.length-1 === i) {
              $(".number-direct-reports-grade-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d +'"><span></span><i>'+d+'+</i></label></div>');
            }else {
              $(".number-direct-reports-grade-filter .filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d +'"><span></span><i>'+d+'</i></label></div>');
            }
          });
      });
    }


    // filtering based on checkbox barchart
    $(document).on("change",".count-manage-bar-chart .filter-child-options label.filter-opt-chk input:checkbox",function(){
      var filteringArray = [];
      $(".count-manage-bar-chart .filter-child-options input:checkbox:not(:checked)").each(function(){
        filteringArray.push($(this).val());
      });
      if($(".bar-chart").length) {
        $(".bar-chart").barChartD3({
          filterValue: filteringArray
        });
      }
    });
    $(document).on("change",".direct-report-waterfall-chart .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
      $(".direct-reports-waterfall").waterFall({
        filterValue: filteredValue
      });
    });

    $(document).on("change",".by-layer-boxplot-chart .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
      $(".boxplot-by-layer").boxPlot({
        jsonNmae: "byLayer",
        filterValue: filteredValue
      });
    });

    $(document).on("change",".by-grade-boxplot-chart .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
      $(".boxplot-by-grade").boxPlot({
        jsonNmae: "byGrade",
        filterValue: filteredValue
      });
    });

    $(document).on("change",".by-family-boxplot-chart .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
      $(".boxplot-by-families").boxPlot({
        jsonNmae: "byFamily",
        filterValue: filteredValue
      });
    });

    $(document).on("change",".tenure-compensation-scatteplot-chart .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
      $(".tenure-comapensation-chart").scattePlot({
        jsonName: "tenureCompensation",
        filterValue: filteredValue
      });
    });

    //Heatmap SoC Chart
    $(document).on("change",".heat-soc-chart-filter .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
      if($(".heat-soc-chart").length){
        $(".heat-soc-chart").heatSocChart({
          jsonName: "Soc",
          filterValue: filteredValue
        });
      }
    });

    //SoC By Management Layer
    $(document).on("change",".manage-layer-chart-filter .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
      if($(".manage-layer-chart").length){
        $(".manage-layer-chart").doubleSideBarChart({
          height: 303,
          margin: {
            top: 45,
            right: 21,
            bottom: 69,
            left: 50
          },
          data: "data/manageLayer.json",
          filterValue: filteredValue
        });
      }
    });


    // SoC by division
    $(document).on("change",".division-layer-chart-filter .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
      if($(".division-layer-chart").length){
        $(".division-layer-chart").doubleSideBarChart({
          height: 365,
          margin: {
            top: 45,
            right: 21,
            bottom: 69,
            left: 50
          },
          data: "data/divisionChart.json",
          filterValue: filteredValue
        });
      }
    });

    // span-control-by-layer
    $(document).on("change",".span-control-by-layer-chart-filter .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
      if($(".managethree-layer-chart").length){
        $(".managethree-layer-chart").doubleSideBarChart({
          height: 500,
          margin: {
            top: 45,
            right: 21,
            bottom: 100,
            left: 50
          },
          data: "data/manageLayerthree.json",
          filterValue: filteredValue
        });
      }
    });

    // span-control-by-division
    $(document).on("change",".span-control-by-division-chart-filter .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
      if($(".divisionthree-layer-chart").length){
        $(".divisionthree-layer-chart").doubleSideBarChart({
          height: 500,
          margin: {
            top: 45,
            right: 21,
            bottom: 100,
            left: 50
          },
          data: "data/divisionChartthree.json",
          filterValue: filteredValue
        });
      }
    });

    // span-control-by-grade
    $(document).on("change",".number-direct-reports-grade-filter .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
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
          type: "grade",
          filterValue: filteredValue
        });
      }
    });

    // SoC by Layer for the Division Selected
    $(document).on("change",".soc-division-selected-filter .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
      if($(".managetwo-layer-chart").length){
        $(".managetwo-layer-chart").doubleSideBarChart({
          height: 500,
          margin: {
            top: 45,
            right: 21,
            bottom: 100,
            left: 50
          },
          data: "data/manageLayertwo.json",
          filterValue: filteredValue
        });
      }
    });

    // SoC by Layer for the Division Selected
    $(document).on("change",".heatmap-across-layers-grades-filter .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
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
          filterValue: filteredValue
        });
      }
    });

    // avg by Layer for the Division Selected
    $(document).on("change",".avg-across-layers-grades-filter .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
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
          type: "distribution",
          filterValue: filteredValue
        });
      }
    });

    // Number of Direct Reports by Layer
    $(document).on("change",".num-direct-report-chart-filter .filter-child-options label.filter-opt-chk input:checkbox",function(){
      let filteredValue = [];
      filteredValue = getFilterValue($(this).closest(".filter-set-options"));
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
          type: "direct",
          filterValue: filteredValue
        });
      }
    });
    // bar chart initializer
    $(window).resize(function(){
      // bar chart with filter function
      if($(".bar-chart").length) {
        var filteringArray = [];
        $(".count-manage-bar-chart .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".bar-chart").barChartD3({
          filterValue: filteringArray
        });
      }

      // scatte plot chart initializing
      if($(".tenure-comapensation-chart").length){
        var filteringArray = [];
        $(".tenure-compensation-scatteplot-chart .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".tenure-comapensation-chart").scattePlot({
          filterValue: filteringArray
        });
      }

      // water fall chart scripts
      if($(".direct-reports-waterfall").length){
        $(".direct-reports-waterfall").waterFall({
          filterValue: getFilterValue($(".direct-report-waterfall-chart .filter-set-options"))
        });
      }

      // by grade box plot js by grade
      if($(".boxplot-by-grade").length){
        var filteringArray = [];
        $(".by-grade-boxplot-chart .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".boxplot-by-grade").boxPlot({
          jsonNmae: "byGrade",
          filterValue: filteringArray
        });
      };

    // by grade box plot js by layer
      if($(".boxplot-by-layer").length){
        var filteringArray = [];
        $(".by-layer-boxplot-chart .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".boxplot-by-layer").boxPlot({
          jsonNmae: "byLayer",
          filterValue: filteringArray
        });
      };

      // by grade box plot js by families
      if($(".boxplot-by-families").length){
        var filteringArray = [];
        $(".by-family-boxplot-chart .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".boxplot-by-families").boxPlot({
          jsonNmae: "byFamily",
          filterValue: filteringArray
        });
      };
      //Manage layer chart
      if($(".manage-layer-chart").length){
        var filteringArray = [];
        $(".manage-layer-chart-filter .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".manage-layer-chart").doubleSideBarChart({
          height: 303,
          margin: {
            top: 45,
            right: 21,
            bottom: 69,
            left: 140
          },
          ticks: 6,
          data: "data/manageLayer.json",
          filterValue: filteringArray
        });
      }
      //Divison Layerchart
      if($(".division-layer-chart").length){
        var filteringArray = [];
        $(".division-layer-chart-filter .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".division-layer-chart").doubleSideBarChart({
          height: 365,
          margin: {
            top: 45,
            right: 21,
            bottom: 69,
            left: 300
          },
          ticks: 6,
          data: "data/divisionChart.json",
          filterValue: filteringArray
        });
      }
      //Heatmap SoC Chart
      if($(".heat-soc-chart").length){
        var filteringArray = [];
        $(".heat-soc-chart-filter .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        if($(".heat-soc-chart").length){
          $(".heat-soc-chart").heatSocChart({
            jsonName: "Soc",
            filterValue: filteringArray
          });
        }
      }
      //Manage layer chart
      if($(".managetwo-layer-chart").length){
        var filteringArray = [];
        $(".soc-division-selected-filter .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".managetwo-layer-chart").doubleSideBarChart({
          height: 435,
          margin: {
            top: 45,
            right: 21,
            bottom: 69,
            left: 115
          },
          ticks: 6,
          data: "data/manageLayertwo.json",
          filterValue: filteringArray
        });
      }

      //span2 heatmap distribution
      if($(".heat-dist-layer-chart").length){
        var filteringArray = [];
        $(".heatmap-across-layers-grades-filter .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".heat-dist-layer-chart").heatmapTable({
          height: 400,
          data: "data/heatmapDist.json",
          filterValue: filteringArray,
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

      //span2 heatmap report
      if($(".heat-report-layer-chart").length){
        var filteringArray = [];
        $(".num-direct-report-chart-filter .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".heat-report-layer-chart").heatmapTable({
          height: 360,
          data: "data/heatmapReport.json",
          filterValue: filteringArray,
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

      //Manage layer chart span 3
      //Divison Layerchart
      if($(".managethree-layer-chart").length){
        var filteringArray = [];
        $(".span-control-by-layer-chart-filter .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".managethree-layer-chart").doubleSideBarChart({
          height: 500,
          margin: {
            top: 45,
            right: 21,
            bottom: 69,
            left: 120
          },
          ticks: 6,
          data: "data/manageLayerthree.json",
          filterValue: filteringArray
        });
      }

      //Division layer chart span 3
      if($(".divisionthree-layer-chart").length){
        var filteringArray = [];
        $(".span-control-by-division-chart-filter .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".divisionthree-layer-chart").doubleSideBarChart({
          height: 590,
          margin: {
            top: 45,
            right: 21,
            bottom: 69,
            left: 150
          },
          ticks: 6,
          wrap: true,
          data: "data/divisionChartthree.json",
          filterValue: filteringArray
        });
      }

      //span4 heatmap Direct
      if($(".heat-direct-layer-chart").length){
        var filteringArray = [];
        $(".number-direct-reports-grade-filter .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
        $(".heat-direct-layer-chart").heatmapTable({
          height: 240,
          data: "data/heatmapDirect.json",
          margin: {
            top: 40,
            right: 0,
            bottom: 0,
            left: 105
          },
          type: "grade",
          filterValue: filteringArray
        });
      }

      //span6 heatmap avg
      if($(".heat-compensate-layer-chart").length){
        var filteringArray = [];
        $(".avg-across-layers-grades-filter  .filter-child-options input:checkbox:not(:checked)").each(function(){
          filteringArray.push($(this).val());
        });
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
          type: "distribution",
          filterValue: filteringArray
        });
      }
    });
});
