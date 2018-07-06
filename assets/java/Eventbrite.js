var plots = {
  "GB": {
      "latitude": 55.3781,
      "longitude": -3.4360,
      "text": {
          "position": "left",
          "content": "Great Britain"
      },
      "eventCount": 0
  },
  "US": {
      "latitude": 37.0902,
      "longitude": -95.7129,
      "text": {
          "position": "left",
          "content": "United States"
      },
      "eventCount": 0
  },
  "AU": {
    "latitude": 37.0902,
    "longitude": -95.7129,
    "text": {
        "position": "left",
        "content": "Australia"
    },
    "eventCount": 0
}
};




$(document).ready(function(){

  // Mapael initialisation    
  $world = $(".container");
  $world.mapael({
    map: {
        name: "world_countries",
        defaultArea: {
            attrs: {
                fill: "#fff",
                stroke: "#232323",
                "stroke-width": 0.3
            }
        },
        defaultPlot: {
            text: {
                attrs: {
                    fill: "#b4b4b4",
                    "font-weight": "normal"
                },
                attrsHover: {
                    fill: "#fff",
                    "font-weight": "bold"
                }
            }
        }
        , zoom: {
            enabled: true
            , step: 0.25
            , maxLevel: 20
        }
    },
    legend: {
        plot: {
          display: true,
          title: "Number of Events",
          marginBottom: 6,
          slices: [
              {
                  type: "circle",
                  max: 10,
                  attrs: {
                      fill: "#FD4851",
                      "stroke-width": 1
                  },
                  attrsHover: {
                      transform: "s1.5",
                      "stroke-width": 1
                  },
                  label: "Less Than 10",
                  size: 10
              },
              {
                  type: "circle",
                  min: 11,
                  max: 19,
                  attrs: {
                      fill: "#FD4851",
                      "stroke-width": 1
                  },
                  attrsHover: {
                      transform: "s1.5",
                      "stroke-width": 1
                  },
                  label: "Between 11 and 19",
                  size: 20
              },
              {
                  type: "circle",
                  min: 100,
                  attrs: {
                      fill: "#FD4851",
                      "stroke-width": 1
                  },
                  attrsHover: {
                      transform: "s1.5",
                      "stroke-width": 1
                  },
                  label: "More Than 20",
                  size: 30
              }
          ]
      }
  }

});

  $('.map').on('click', 'path', function() {
      console.log("$(this).attr('data-id'): " + $(this).attr("data-id"));
  });

});



$("#refresh").on("click",function(event){
    event.preventDefault();
    $(".mapcontainer").trigger('update', [{
      newPlots: plots
      // areas: data[2018]['areas'], 
      // plots: data[2018]['plots'], 
      // animDuration: 1000
    }]);

    //   Token for an Eventbrite api
    var Token = "E37FO4F4OMDF4ELNTCLM";
    var EventName = $("#searchEvents").val().trim();
    console.log(EventName);
  // Here we are building the URL we need to query the database

var queryURL = "https://www.eventbriteapi.com/v3/events/search/?q="+ EventName +"&token="+ Token ; 

$.ajax({
  url: queryURL,
  method: "GET"
})


// We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

//     // Log the resulting object
    // console.log(response);

    var arrEvents = response.events;

// console.log(arrEvents);

for(var i = 0; i < arrEvents.length; i++)
{
  var eventbriteLocale = arrEvents[i].locale;
  var countryCode = eventbriteLocale.slice(3, 5);
  plots[countryCode].eventCount++;
      console.log(plots);

  console.log("Locale: " + arrEvents[i].locale + " Timezone (start): " + arrEvents[i].start.timezone);
}


    plotMap();


    var left = $("<div>");
    var lh1 = $("<h1>");
    lh1.text("Description of Event");
    var lp = $("<p>")
    lp.text(response.events[0].description.text);
    left.append(lh1);
    left.append(lp);

    $(".box__left").append(left);

    var right = $("<div>");
    var rh1 = $("<h1>");
    rh1.text("Details of Event");
    var rp = $("<p>")
    var rp2 = $("<p>");
    rp.text("Date(Start time) :"+ response.events[0].start.local);
    rp2.text("Timezone : " +response.events[0].start.timezone);
    right.append(rh1);
    right.append(rp);
    right.append(rp2);
    

    $(".box__right").append(right);

    var bottom = $("<div>");
    var bh1 = $("<h1>");
    bh1.text("Buy Tickets From Here :");
    var bp = $("<p>")
    bp.text(response.events[0].url);
    bottom.append(bh1);
    bottom.append(bp);

    $(".box__bottom").append(bottom);

    var top = $("<div>");
    var th1 = $("<h1>");
    th1.text("Event Poster");
    var path = response.events[0].logo.url;
    var img = $("<img>");
    img.attr("src",path);
    top.append(th1);
    top.append(img);

    $(".box__top").append(top);

    var boxp = $("<p>");
    boxp.text(response.events[0].name.text);
    boxp.addClass("box_text_center");
    $(".box").append(boxp);
    

  });



});


function plotMap(){

  // Knob initialisation (for selecting a year)
  // $(".knob").knob({
  //     release: function (value) {
  //         $(".world").trigger('update', [{
  //             mapOptions: data[value],
  //             animDuration: 300
  //         }]);
  //     }
  // });

//  console.log("In the plotMap function!");
}