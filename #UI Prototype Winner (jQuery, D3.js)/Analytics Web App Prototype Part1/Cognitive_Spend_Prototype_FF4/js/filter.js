$(document).ready(function(){

  // Variance heat map
  if($(".filter-variance-heat").length){
    $.getJSON( "data/variance-heat-chart.json", function( data ) {
      var filterData = data.dataset.data;
      $(".aside-filter-content .filter-variance-heat").append('<div class="filter-set-main"></div>');
      $(".filter-variance-heat").find(".filter-set-main").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
        filterData.map(function(d,i){
          $(".filter-variance-heat").find(".filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
        });
    });
  }

  // What are my realized chart1
  if($(".filter-what-saving-realize").length){
    $.getJSON( "data/what-my-savings-realized-chart.json", function( data ) {
      var filterData = data.dataset.chart1;
      $(".aside-filter-content .filter-what-saving-realize").append('<div class="filter-set-main"></div>');
      $(".filter-what-saving-realize").find(".filter-set-main").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading+" chart1" +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
      filterData[0].values.forEach(function(d, i){
        $(".filter-what-saving-realize").find(".filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
      });
    });
  }

  // What are my realized chart2
  if($(".filter-what-saving-realize2").length){
    $.getJSON( "data/what-my-savings-realized-chart.json", function( data ) {
      var filterData = data.dataset.chart2;
      $(".aside-filter-content .filter-what-saving-realize2").append('<div class="filter-set-main"></div>');
      $(".filter-what-saving-realize2").find(".filter-set-main").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading+" chart2" +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
      filterData[0].values.forEach(function(d, i){
        $(".filter-what-saving-realize2").find(".filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
      });
    });
  }

  //When my savings chart
  if($(".filter-saving-realize").length){
    $.getJSON( "data/when-my-savings-realized-chart.json", function( data ) {
      var filterData = data.dataset;
      $(".aside-filter-content .filter-saving-realize").append('<div class="filter-set-main"></div>');
      $(".filter-saving-realize").find(".filter-set-main").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
        filterData.map(function(d,i){
          $(".filter-saving-realize").find(".filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
        });
    });
  }

  // Sourcing result
  if($(".filter-sourcing-results").length){
    $.getJSON( "data/sourcing-results-chart.json", function( data ) {
      var filterData = data.dataset;
      $(".aside-filter-content .filter-sourcing-results").append('<div class="filter-set-main"></div>');
      $(".filter-sourcing-results").find(".filter-set-main").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
        filterData.map(function(d,i){
          $(".filter-sourcing-results").find(".filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
        });
    });
  }

  // Executive Spend breakdown chart
  if($(".filter-myspend-break-chart").length){
    $.getJSON( "data/what-my-spend-breakdown-chart.json", function( data ) {
      var filterData = data.dataset;
      $(".aside-filter-content .filter-myspend-break-chart").append('<div class="filter-set-main"></div>');
      $(".filter-myspend-break-chart").find(".filter-set-main").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
        filterData.map(function(d,i){
          $(".filter-myspend-break-chart").find(".filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
        });
    });
  }

  // Executive Spend breakdown chart
  if($(".filter-risk-likelihood-chart").length){
    $.getJSON( "data/where-my-risk-chart.json", function( data ) {
      var filterData = ['LOW', 'MEDIUM', 'HIGH'];
      $(".aside-filter-content .filter-risk-likelihood-chart").append('<div class="filter-set-main"></div>');
      $(".filter-risk-likelihood-chart").find(".filter-set-main").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
        filterData.map(function(d,i){
          $(".filter-risk-likelihood-chart").find(".filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d +'"><span></span><i>'+d+'</i></label></div>');
        });
    });
  }



  // What is My Spend Breakdown? appending a data for filter
  if($(".spend-breakdown-wrapper").length){
    $.getJSON( "data/what-my-spend-breakdown-treemap-chart.json", function( data ) {
      var filterData = data.dataset.children;
      $(".aside-filter-content .spend-breakdown-wrapper").append('<div class="filter-set-main"></div>');
      $(".spend-breakdown-wrapper").find(".filter-set-main").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
        filterData.map(function(d,i){
          $(".spend-breakdown-wrapper").find(".filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
        });
    });
  }

  //What ispend oncategory
  if($(".filter-spend-on-category").length){
    $.getJSON( "data/what-i-spending-on-chart.json", function( data ) {
      var filterData = data.dataset.category;
      $(".aside-filter-content .filter-spend-on-category").append('<div class="filter-set-main"></div>');
      $(".filter-spend-on-category").find(".filter-set-main").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading+" Category?" +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
      filterData[0].values.forEach(function(d, i){
        $(".filter-spend-on-category").find(".filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
      });
    });
  }

  //What ispend on sub category
  if($(".filter-spend-on-sub-category").length){
    $.getJSON( "data/what-i-spending-on-chart.json", function( data ) {
      var filterData = data.dataset["sub-category"];
      $(".aside-filter-content .filter-spend-on-sub-category").append('<div class="filter-set-main"></div>');
      $(".filter-spend-on-sub-category").find(".filter-set-main").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading+" Sub Category?" +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
      filterData[0].values.forEach(function(d, i){
        $(".filter-spend-on-sub-category").find(".filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
      });
    });
  }

  // How is My Spend Changing Over Time?
  if($(".spend-changing-over-time-wrapper").length){
    $.getJSON( "data/how-my-spend-changing-chart.json", function( data ) {
      var filterData = data.dataset[0].values;
      $(".aside-filter-content .spend-changing-over-time-wrapper").append('<div class="filter-set-main"></div>');
      $(".spend-changing-over-time-wrapper").find(".filter-set-main").append('<div class="filter-set"><span class="yellow-arrow"></span><span>'+ data.heading +'</span><span class="info-icon icons"></span></div><div class="filter-set-options"></div>');
        filterData.map(function(d,i){
          $(".spend-changing-over-time-wrapper").find(".filter-set-options").append('<div class="filter-child-options"><label class="chkbox filter-opt-chk"><input type="checkbox" name="filter" checked value="'+ d.name +'"><span></span><i>'+d.name+'</i></label></div>');
        });
    });
  }
});

//Variance heat onchange event
$(document).on("change",".filter-variance-heat .filter-child-options label.filter-opt-chk input:checkbox",function(){
  var filteringArray = [];
  $(".filter-variance-heat .filter-child-options label.filter-opt-chk input:checkbox:not(:checked)").each(function(){
    filteringArray.push($(this).val());
  });
  //sourcing-results-chart
  d3.json("data/variance-heat-chart.json", function(error, data) {
    VarianceHeatChart({
      appendTo: ".var-heat-map-chart",
      data: data,
      height: 274,
      margin: { top: 44, right: 0,  bottom: 44, left: 88},
      filterData: filteringArray
    });
  });
});

//Sourcing Results onchange event
$(document).on("change",".filter-sourcing-results .filter-child-options label.filter-opt-chk input:checkbox",function(){
  var filteringArray = [];
  $(".filter-sourcing-results .filter-child-options label.filter-opt-chk input:checkbox:not(:checked)").each(function(){
    filteringArray.push($(this).val());
  });
  //sourcing-results-chart
  d3.json("data/sourcing-results-chart.json", function(error, data) {
    SourcingResultsChart({
      appendTo: ".sourcing-results-chart",
      data: data,
      filterData: filteringArray
    });
  });
});

////what-my-spend-breakdown-chart on change
$(document).on("change",".filter-myspend-break-chart .filter-child-options label.filter-opt-chk input:checkbox",function(){
  var filteringArray = [];
  $(".filter-myspend-break-chart .filter-child-options label.filter-opt-chk input:checkbox:not(:checked)").each(function(){
    filteringArray.push($(this).val());
  });
  //sourcing-results-chart
  d3.json("data/what-my-spend-breakdown-chart.json", function(error, data) {
    WhatMySpendBreakdownChart({
      appendTo: ".myspend-break-chart",
      data: data,
      filterData: filteringArray,
      height: 264,
      margin: {left: 70, right: 10, top: 40, bottom: 40}
    });
  });
});

////WhereMyRiskChart on change
$(document).on("change",".filter-risk-likelihood-chart .filter-child-options label.filter-opt-chk input:checkbox",function(){
  var filteringArray = [];
  $(".filter-risk-likelihood-chart .filter-child-options label.filter-opt-chk input:checkbox:not(:checked)").each(function(){
    filteringArray.push($(this).val());
  });
  //WhereMyRiskChart
  d3.json("data/where-my-risk-chart.json", function(error, data) {
    WhereMyRiskChart({
      appendTo: ".risk-likelihood-chart",
      data: data,
      filterData: filteringArray,
      height: 264,
      margin: {left: 70, right: 10, top: 40, bottom: 50}
    });
  });
});

// What is My Spend Breakdown? onchange event
$(document).on("change",".spend-breakdown-wrapper .filter-child-options label.filter-opt-chk input:checkbox",function(){
  var filteringArray = [];
  $(".spend-breakdown-wrapper .filter-child-options label.filter-opt-chk input:checkbox:not(:checked)").each(function(){
    filteringArray.push($(this).val());
  });
  //what-my-spend-breakdown-treemap
  d3.json("data/what-my-spend-breakdown-treemap-chart.json", function(error, data) {
    WhatMySpendBreakdownTreemapChart({
      appendTo: ".anal-spend-break-chart",
      data: data,
      filterData: filteringArray,
      height: 260,
      margin: {left: 0, right: 10, top: 30, bottom: 20}
    });
  });
});

// How is My Spend Changing Over Time?
$(document).on("change",".spend-changing-over-time-wrapper .filter-child-options label.filter-opt-chk input:checkbox",function(){
  var filteringArray = [];
  $(".spend-changing-over-time-wrapper .filter-child-options label.filter-opt-chk input:checkbox:not(:checked)").each(function(){
    filteringArray.push($(this).val());
  });
  //what-my-spend-breakdown-treemap
  d3.json("data/how-my-spend-changing-chart.json", function(error, data) {
    HowMySpendChangingChart({
      appendTo: ".how-spend-chart",
      data: data,
      filterData: filteringArray,
      height: 260,
      margin: {left: 50, right: 50, top: 50, bottom: 40}
    });
  });
});

//what-i-spending-on-chart category on change
$(document).on("change",".filter-spend-on-category .filter-child-options label.filter-opt-chk input:checkbox",function(){
  var filteringArray = [];
  $(".filter-spend-on-category .filter-child-options label.filter-opt-chk input:checkbox:not(:checked)").each(function(){
    filteringArray.push($(this).val());
  });
  d3.json("data/what-i-spending-on-chart.json", function(error, data) {
    WhatISpendingOnChart({
      appendTo: ".am-spend-chart",
      type: "category",
      showLegend: false,
      maxXAxis: 100,
      data: data,
      filterData: filteringArray,
      margin: {top: 20, right: 20, bottom: 10, left: 55}
    });
  });
});

//what-i-spending-on-chart category on change
$(document).on("change",".filter-spend-on-sub-category .filter-child-options label.filter-opt-chk input:checkbox",function(){
  var filteringArray = [];
  $(".filter-spend-on-sub-category .filter-child-options label.filter-opt-chk input:checkbox:not(:checked)").each(function(){
    filteringArray.push($(this).val());
  });
  d3.json("data/what-i-spending-on-chart.json", function(error, data) {
    WhatISpendingOnChart({
      appendTo: ".am-spend-chart-sub",
      type: "sub-category",
      showLegend: true,
      maxXAxis: 100,
      data: data,
      filterData: filteringArray,
      margin: {top: 20, right: 20, bottom: 10, left: 55}
    });
  });
});




//what scavings chart2 onchange event
$(document).on("change",".filter-what-saving-realize-common .filter-child-options label.filter-opt-chk input:checkbox",function(){
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
});


//When are My Savings Realized?
$(document).on("change",".filter-saving-realize .filter-child-options label.filter-opt-chk input:checkbox",function(){
  var filteringArray = [];
  $(".filter-saving-realize .filter-child-options label.filter-opt-chk input:checkbox:not(:checked)").each(function(){
    filteringArray.push($(this).val());
  });
  //sourcing-results-chart
  d3.json("data/when-my-savings-realized-chart.json", function(error, data) {
    WhenMySavingsRealizedChart({
      appendTo: ".when-saving-real-chart",
      data: data,
      filterData: filteringArray,
      height: 245,
      margin: {top: 85, right: 20, bottom: 20, left: 60}
    });
  });
});
