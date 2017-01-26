$(document).ready(function(){
  //Variance Chart
  if($(".var-heat-map-chart").length){
    d3.json("data/variance-heat-chart.json", function(error, data) {
      VarianceHeatChart({
        appendTo: ".var-heat-map-chart",
        data: data,
        height: 274,
        margin: { top: 44, right: 0,  bottom: 44, left: 88}
      });
    });
  }

  //What my realized Savings
  if($(".benefit-what-saving-chart").length){
    d3.json("data/what-my-savings-realized-chart.json", function(error, data) {
      WhatMySavingsRealizedChart({
        appendTo: ".benefit-what-saving-chart",
        maxXAxis: 100,
        data: data,
        margin: {top: 18, right: 20, bottom: 20, left: 45}
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
        margin: {top: 85, right: 20, bottom: 20, left: 60}
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
        margin: {left: 70, right: 10, top: 40, bottom: 50}
      });
    });
  }
  //sourcing-results-chart
  if($(".sourcing-results-chart").length){
    d3.json("data/sourcing-results-chart.json", function(error, data) {
      SourcingResultsChart({
        appendTo: ".sourcing-results-chart",
        data: data
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
        margin: {left: 70, right: 10, top: 40, bottom: 40}
      });
    });
  }

  //what-i-spending-on-chart
  if($(".am-spend-chart").length){
    d3.json("data/what-i-spending-on-chart.json", function(error, data) {
      WhatISpendingOnChart({
        appendTo: ".am-spend-chart",
        type: "category",
        showLegend: false,
        maxXAxis: 100,
        data: data,
        margin: {top: 20, right: 20, bottom: 10, left: 55}
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
        margin: {top: 20, right: 20, bottom: 10, left: 55}
      });
    });
  }

  //what-my-spend-breakdown-treemap
  if($(".anal-spend-break-chart").length){
    d3.json("data/what-my-spend-breakdown-treemap-chart.json", function(error, data) {
      WhatMySpendBreakdownTreemapChart({
        appendTo: ".anal-spend-break-chart",
        data: data,
        height: 260,
        margin: {left: 0, right: 10, top: 30, bottom: 20}
      });
    });
  }

  //How is My Spend Changing Over Time
  if($(".how-spend-chart").length){
    d3.json("data/how-my-spend-changing-chart.json", function(error, data) {
      HowMySpendChangingChart({
        appendTo: ".how-spend-chart",
        data: data,
        height: 260,
        margin: {left: 50, right: 50, top: 50, bottom: 40}
      });
    });
  }


    // dropdown intialize
    $("body select").msDropDown({
        enableAutoFilter: false
    });

    //dropdown width
    $(".dd").css("width", "100%");

    //Date picker from and to
    if($(".js-date-range").length){
      var dateFormat = "mm/dd/yy",
        from = $( ".js-from-date" )
          .datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1
          })
          .on( "change", function() {
            to.datepicker( "option", "minDate", getDate( this ) );
          }),
        to = $( ".js-to-date" ).datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 1
        })
        .on( "change", function() {
          from.datepicker( "option", "maxDate", getDate( this ) );
        });

      function getDate( element ) {
        var date;
        try {
          date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
          date = null;
        }

        return date;
      }
    }
    // filter functionality
      $(document).on("click",".filter-set",function(){
        $(this).closest(".filter-set-main").toggleClass("expanded");
      });
      // grid sorting
      if($(".key-off-track-table").length){
        $(".key-off-track-table").tablesorter();
      }
      if($(".supplier-analysis-table").length){
        $(".supplier-analysis-table").tablesorter({
          headers: {
            5: {
              sorter: false
            },
            6: {
              sorter: false
            },
            7: {
              sorter: false
            },
            8: {
              sorter: false
            }
          }
        });
      }
      if($(".spend-details-table").length){
        $(".spend-details-table").tablesorter();
      }
      //customScrollbar
      $(window).load(function () {
        if($(".units-graph-scroll,.whatam-spend-sub-scroll").length){
          $(".units-graph-scroll,.whatam-spend-sub-scroll").customScrollbar({
            skin: "default-skin",
            hScroll: false
          });
        }
      });

      //Top projects slider
      if($(".js-top-projects-slider").length){
        $( ".js-top-projects-slider" ).slider({
            range: "min",
            value: 5,
            min: 0,
            max: 20,
            create: function( event, ui ) {
              $(".js-proj-val").val(5);
              $(".js-top-projects-slider.ui-slider .ui-slider-handle").html("<span class='range-numbers'>5</span>");
              setSliderTicks(event.target,false);
            },
            slide: function( event, ui ) {
              $(".js-proj-val").val( ui.value );
              $(".js-top-projects-slider.ui-slider .ui-slider-handle .range-numbers").text(ui.value);
            }
        });
        //Input change
        $(".js-proj-val").keyup(function(e){
          val = $(this).val();
          if(val !== ""){
            if(val > 20){
              $(".js-top-projects-slider").slider('value',20);
              $(".js-top-projects-slider.ui-slider .ui-slider-handle .range-numbers").text(20);
            } else if(val === 0) {
              $(".js-top-projects-slider").slider('value',0);
              $(".js-top-projects-slider.ui-slider .ui-slider-handle .range-numbers").text(0);
            } else {
              $(".js-top-projects-slider").slider('value',val);
              $(".js-top-projects-slider.ui-slider .ui-slider-handle .range-numbers").text(val);
            }
          } else {
            $(".js-top-projects-slider").slider('value',0);
            $(".js-top-projects-slider.ui-slider .ui-slider-handle .range-numbers").text(0);
          }
        });
      }
      //js category slider
      if($(".js-top-category-slider").length){
        $( ".js-top-category-slider" ).slider({
            range: "min",
            value: 5,
            min: 0,
            max: 20,
            create: function( event, ui ) {
              $(".js-cat-val").val(5);
              $(".js-top-category-slider.ui-slider .ui-slider-handle").html("<span class='range-numbers'>5</span>");
              setSliderTicks(event.target,false);
            },
            slide: function( event, ui ) {
                $(".js-cat-val").val( ui.value );
              $(".js-top-category-slider.ui-slider .ui-slider-handle .range-numbers").text(ui.value);
            }
        });
        //Input change
        $(".js-cat-val").keyup(function(e){
          val = $(this).val();
          if(val !== ""){
              if(val > 20){
                $(".js-top-category-slider").slider('value',20);
                $(".js-top-category-slider.ui-slider .ui-slider-handle .range-numbers").text(20);
              } else if(val === 0) {
                $(".js-top-category-slider").slider('value',0);
                $(".js-top-category-slider.ui-slider .ui-slider-handle .range-numbers").text(0);
              } else {
                $(".js-top-category-slider").slider('value',val);
                $(".js-top-category-slider.ui-slider .ui-slider-handle .range-numbers").text(val);
              }

          } else {
            $(".js-top-category-slider").slider('value',0);
            $(".js-top-category-slider.ui-slider .ui-slider-handle .range-numbers").text(0);
          }
        });
      }
      //js risk slider
      if($(".js-top-risk-slider").length){
        $( ".js-top-risk-slider" ).slider({
            range: "min",
            value: 5,
            min: 0,
            max: 20,
            create: function( event, ui ) {
              $(".js-risk-val").val(5);
              $(".ui-slider .ui-slider-handle").html("<span class='range-numbers'>5</span>");
              setSliderTicks(event.target,false);
            },
            slide: function( event, ui ) {
                $(".js-risk-val").val( ui.value );
              $(".ui-slider .ui-slider-handle .range-numbers").text(ui.value);
            }
        });
        //Input change
        $(".js-risk-val").keyup(function(e){
          val = $(this).val();
          if(val !== ""){
              if(val > 20){
                $(".js-top-risk-slider").slider('value',20);
                $(".js-top-risk-slider.ui-slider .ui-slider-handle .range-numbers").text(20);
              } else if(val === 0) {
                $(".js-top-risk-slider").slider('value',0);
                $(".js-top-risk-slider.ui-slider .ui-slider-handle .range-numbers").text(0);
              } else {
                $(".js-top-risk-slider").slider('value',val);
                $(".js-top-risk-slider.ui-slider .ui-slider-handle .range-numbers").text(val);
              }

          } else {
            $(".js-top-risk-slider").slider('value',0);
            $(".js-top-risk-slider.ui-slider .ui-slider-handle .range-numbers").text(0);
          }
        });
      }

      //Analysis slider
      if($(".js-anal-projects-slider").length){
        $( ".js-anal-projects-slider" ).slider({
            range: "min",
            value: 5,
            min: 0,
            max: 20,
            create: function( event, ui ) {
              $(".js-anal-val").val(5);
              $(".js-anal-projects-slider.ui-slider .ui-slider-handle").html("<span class='range-numbers'>5</span>");
              setSliderTicks(event.target,false);
            },
            slide: function( event, ui ) {
                $(".js-anal-val").val( ui.value );
              $(".js-anal-projects-slider.ui-slider .ui-slider-handle .range-numbers").text(ui.value);
            }
        });
        //Input change
        $(".js-anal-val").keyup(function(e){
          val = $(this).val();
          if(val !== ""){
              if(val > 20){
                $(".js-anal-projects-slider").slider('value',20);
                $(".js-anal-projects-slider.ui-slider .ui-slider-handle .range-numbers").text(20);
              } else if(val === 0) {
                $(".js-anal-projects-slider").slider('value',0);
                $(".js-anal-projects-slider.ui-slider .ui-slider-handle .range-numbers").text(0);
              } else {
                $(".js-anal-projects-slider").slider('value',val);
                $(".js-anal-projects-slider.ui-slider .ui-slider-handle .range-numbers").text(val);
              }

          } else {
            $(".js-anal-projects-slider").slider('value',0);
            $(".js-anal-projects-slider.ui-slider .ui-slider-handle .range-numbers").text(0);
          }
        });
      }

      //Js exclude amount
      if($(".js-amount-slider").length){
        $( ".js-amount-slider" ).slider({
            range: true,
            value: 5,
            min: 0,
            max: 168,
            values: [ 10, 166.73 ],
            create: function( event, ui ) {
              $(".js-amount-slider.ui-slider .ui-slider-handle").eq(0).html("<span class='range-numbers'>$10.00M</span>");
              $(".js-amount-slider.ui-slider .ui-slider-handle").eq(1).html("<span class='range-numbers  range-two'>$166.73M</span>");
              setSliderTicks(event.target, true);
            },
            slide: function( event, ui ) {
              $(".js-amount-slider.ui-slider .ui-slider-handle").eq(0).html("<span class='range-numbers'>$"+ ui.values[0]+".00M</span>");
              $(".js-amount-slider.ui-slider .ui-slider-handle").eq(1).html("<span class='range-two range-numbers'>$"+ ui.values[1]+".00M</span>")
            }
        });
      }
      //Axis draw for ui slider
      function setSliderTicks(el,range){
          var $slider =  $(el);
          var max =  $slider.slider("option", "max");
          var spacing =  100 / (max -1);

          $slider.find('.ui-slider-tick-mark').remove();
          if(range === false){
            for (var i = 0; i < max ; i++) {
                //Adding tick
                if(i!==(max-1) && (i!==0)){
                  if(((i)%4)===0){
                    $('<div class="ui-slider-tick-mark"></div>').css('left', (spacing * i) +  '%').appendTo($slider);
                  }
                }

                //Adding label
                if(i===0){
                  $('<p class="ui-slider-tick-lbl">'+(i)+'</p>').css('left', ((spacing * i)+1) +  '%').appendTo($slider);
                } else if(i===(max-1)){
                  $('<p class="ui-slider-tick-lbl">'+(i+1)+'</p>').css('left', ((spacing * i)-4) +  '%').appendTo($slider);
                }
             }
          } else if(range === true){
            for (var i = 0; i < max ; i++) {
                //Adding tick
                if(i!==(max-1) && (i!==0)){
                  if(((i)%42)===0){
                    $('<div class="ui-slider-tick-mark"></div>').css('left', (spacing * i) +  '%').appendTo($slider);
                  }
                }
             }
          }
      }

});
