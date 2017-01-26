$(document).ready(function(){
  // getting filtering values
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

  $(window).resize(function(){

    //Variance Chart
    if($(".var-heat-map-chart").length){
      d3.json("data/variance-heat-chart.json", function(error, data) {
        VarianceHeatChart({
          appendTo: ".var-heat-map-chart",
          data: data,
          height: 274,
          margin: { top: 44, right: 0,  bottom: 44, left: 88},
          filterData: getFilterValue($(".filter-variance-heat .filter-set-options"))
        });
      });
    }

    //when-my-savings-realized-chart
    if($(".when-saving-real-chart").length){
      d3.json("data/when-my-savings-realized-chart.json", function(error, data) {
        WhenMySavingsRealizedChart({
          appendTo: ".when-saving-real-chart",
          data: data,
          height: 245,
          margin: {top: 85, right: 20, bottom: 20, left: 60},
          filterData: getFilterValue($(".filter-saving-realize .filter-set-options"))
        });
      });
    }

    //sourcing-results-chart
    if($(".sourcing-results-chart").length){
      d3.json("data/sourcing-results-chart.json", function(error, data) {
        SourcingResultsChart({
          appendTo: ".sourcing-results-chart",
          data: data,
          filterData: getFilterValue($(".filter-sourcing-results .filter-set-options"))
        });
      });
    }

    //what-my-spend-breakdown-chart
    if($(".myspend-break-chart").length){
      d3.json("data/what-my-spend-breakdown-chart.json", function(error, data) {
        WhatMySpendBreakdownChart({
          appendTo: ".myspend-break-chart",
          data: data,
          height: 264,
          margin: {left: 70, right: 10, top: 40, bottom: 40},
          filterData: getFilterValue($(".filter-myspend-break-chart .filter-set-options"))
        });
      });
    }

    //Where is My Risk and What is the Likelihood of this Risk Occu
    if($(".risk-likelihood-chart").length){
      d3.json("data/where-my-risk-chart.json", function(error, data) {
        WhereMyRiskChart({
          appendTo: ".risk-likelihood-chart",
          data: data,
          height: 264,
          margin: {left: 70, right: 10, top: 40, bottom: 50},
          filterData: getFilterValue($(".filter-risk-likelihood-chart .filter-set-options"))
        });
      });
    }

    //What is My Spend Breakdown? resize browser function
    if($(".anal-spend-break-chart").length){
      d3.json("data/what-my-spend-breakdown-treemap-chart.json", function(error, data) {
        WhatMySpendBreakdownTreemapChart({
          appendTo: ".anal-spend-break-chart",
          data: data,
          height: 260,
          margin: {left: 0, right: 10, top: 30, bottom: 20},
          filterData: getFilterValue($(".spend-breakdown-wrapper .filter-set-options"))
        });
      });
    }


    // How is My Spend Changing Over Time? resize browser function
    if($(".how-spend-chart").length){
      d3.json("data/how-my-spend-changing-chart.json", function(error, data) {
        HowMySpendChangingChart({
          appendTo: ".how-spend-chart",
          data: data,
          filterData: getFilterValue($(".spend-changing-over-time-wrapper .filter-set-options")),
          height: 260,
          margin: {left: 50, right: 50, top: 50, bottom: 40}
        });
      });
    }

    // //what-i-spending-on-chart
    if($(".am-spend-chart").length){
      d3.json("data/what-i-spending-on-chart.json", function(error, data) {
        WhatISpendingOnChart({
          appendTo: ".am-spend-chart",
          type: "category",
          showLegend: false,
          maxXAxis: 100,
          data: data,
          margin: {top: 20, right: 20, bottom: 10, left: 55},
          filterData: getFilterValue($(".filter-spend-on-category .filter-set-options"))
        });
      });
    }

    //what-i-spending-on-chart
    if($(".am-spend-chart-sub").length){
      d3.json("data/what-i-spending-on-chart.json", function(error, data) {
        WhatISpendingOnChart({
          appendTo: ".am-spend-chart-sub",
          type: "sub-category",
          showLegend: true,
          maxXAxis: 100,
          data: data,
          filterData: getFilterValue($(".filter-spend-on-sub-category .filter-set-options")),
          margin: {top: 20, right: 20, bottom: 10, left: 55}
        });
      });
    }
    //What my realized Savings
    if($(".benefit-what-saving-chart").length){
      var filteringArray = [];
      var filteringArrayone = [];
      var totalFilterArrays = [];
      $(".filter-what-saving-realize .filter-child-options label.filter-opt-chk input:checkbox:not(:checked)").each(function(){
        filteringArray.push($(this).val());
      });
      $(".filter-what-saving-realize2 .filter-child-options label.filter-opt-chk input:checkbox:not(:checked)").each(function(){
        filteringArrayone.push($(this).val());
      });
      totalFilterArrays.push(filteringArray);
      totalFilterArrays.push(filteringArrayone);
      d3.json("data/what-my-savings-realized-chart.json", function(error, data) {
        WhatMySavingsRealizedChart({
          appendTo: ".benefit-what-saving-chart",
          maxXAxis: 100,
          data: data,
          filterData: totalFilterArrays,
          chartType: "2",
          margin: {top: 18, right: 20, bottom: 20, left: 45}
        });
      });
    }
  });
});
