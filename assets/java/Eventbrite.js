var data = {
  "2018":{
    "areas": {
      "GB": {
          "value": 0,
          "tooltip": {
              "content": "<span style=\"font-weight:bold;\">United Kingdom</span><br />Events: " + 0
          }
      },
      "US": {
          "value": 0,
          // "href": "http://en.wikipedia.org/w/index.php?search=United States",
          "tooltip": {
              "content": "<span style=\"font-weight:bold;\">United States</span><br />Events: " + 0
          }
      }
    },
    "plots": {
        "london": {
            "value": 0,
            "tooltip": {
                "content": "<span style=\"font-weight:bold;\">London(test)</span><br />Events: " + 0
            }
        },
        "newyork": {
            "value": 0,
            "tooltip": {
                "content": "<span style=\"font-weight:bold;\">New-York</span><br />Events: " + 0
            }
        }
    }
  }
  
};

// Default plots params
var plots = {
    "london": {
        "latitude": 48.86,
        "longitude": 2.3444,
        "text": {
            "position": "left",
            "content": "London"
        },
        "href": "http://en.wikipedia.org/w/index.php?search=London"
    },
    "newyork": {
        "latitude": 40.667,
        "longitude": -73.833,
        "text": {
            "content": "New york"
        },
        "href": "http://en.wikipedia.org/w/index.php?search=New York"
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
                  min: 25,
                  max: 99,
                  attrs: {
                      fill: "#FD4851",
                      "stroke-width": 1
                  },
                  attrsHover: {
                      transform: "s1.5",
                      "stroke-width": 1
                  },
                  label: "Between 25 and 99",
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
                  label: "More Than 100",
                  size: 30
              }
          ]
      }
  }
  // ,
  // plots: $.extend(true, {}, data[2018]['plots'], plots),
  // areas: data[2018]['areas']

});

  $('.map').on('click', 'path', function() {
      console.log("$(this).attr('data-id'): " + $(this).attr("data-id"));
  });

});



$("#submitBtn").on("click",function(event){
    event.preventDefault();

    $(".mapcontainer").trigger('update', [{
      plots: $.extend(true, {}, data[2018]['plots'], plots),
      areas: data[2018]['areas']
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

console.log(arrEvents);

for(var i = 0; i < arrEvents.length; i++)
{

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

 console.log("In the plotMap function!");
}



// "areas": {
//   "AF": {
//       "value": 9658627,
//       "href": "http://en.wikipedia.org/w/index.php?search=Afghanistan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Afghanistan</span><br />Population : 9658627"
//       }
//   },
//   "ZA": {
//       "value": 11627386,
//       "href": "http://en.wikipedia.org/w/index.php?search=South Africa",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">South Africa</span><br />Population : 11627386"
//       }
//   },
//   "AL": {
//       "value": 4404946,
//       "href": "http://en.wikipedia.org/w/index.php?search=Albania",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Albania</span><br />Population : 4404946"
//       }
//   },
//   "DZ": {
//       "value": 17385595,
//       "href": "http://en.wikipedia.org/w/index.php?search=Algeria",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Algeria</span><br />Population : 17385595"
//       }
//   },
//   "DE": {
//       "value": 4971627,
//       "href": "http://en.wikipedia.org/w/index.php?search=Germany",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Germany</span><br />Population : 4971627"
//       }
//   },
//   "AD": {
//       "value": 13638189,
//       "href": "http://en.wikipedia.org/w/index.php?search=Andorra",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Andorra</span><br />Population : 13638189"
//       }
//   },
//   "AO": {
//       "value": 2701248,
//       "href": "http://en.wikipedia.org/w/index.php?search=Angola",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Angola</span><br />Population : 2701248"
//       }
//   },
//   "AG": {
//       "value": 15126184,
//       "href": "http://en.wikipedia.org/w/index.php?search=Antigua And Barbuda",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Antigua And Barbuda</span><br />Population : 15126184"
//       }
//   },
//   "SA": {
//       "value": 46964511,
//       "href": "http://en.wikipedia.org/w/index.php?search=Saudi Arabia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Saudi Arabia</span><br />Population : 46964511"
//       }
//   },
//   "AR": {
//       "value": 12256219,
//       "href": "http://en.wikipedia.org/w/index.php?search=Argentina",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Argentina</span><br />Population : 12256219"
//       }
//   },
//   "AM": {
//       "value": 50485245,
//       "href": "http://en.wikipedia.org/w/index.php?search=Armenia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Armenia</span><br />Population : 50485245"
//       }
//   },
//   "AU": {
//       "value": 16025561,
//       "href": "http://en.wikipedia.org/w/index.php?search=Australia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Australia</span><br />Population : 16025561"
//       }
//   },
//   "AT": {
//       "value": 13965402,
//       "href": "http://en.wikipedia.org/w/index.php?search=Austria",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Austria</span><br />Population : 13965402"
//       }
//   },
//   "AZ": {
//       "value": 43047101,
//       "href": "http://en.wikipedia.org/w/index.php?search=Azerbaijan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Azerbaijan</span><br />Population : 43047101"
//       }
//   },
//   "BS": {
//       "value": 11110061,
//       "href": "http://en.wikipedia.org/w/index.php?search=Bahamas",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Bahamas</span><br />Population : 11110061"
//       }
//   },
//   "BH": {
//       "value": 40674353,
//       "href": "http://en.wikipedia.org/w/index.php?search=Bahrain",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Bahrain</span><br />Population : 40674353"
//       }
//   },
//   "BD": {
//       "value": 53852427,
//       "href": "http://en.wikipedia.org/w/index.php?search=Bangladesh",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Bangladesh</span><br />Population : 53852427"
//       }
//   },
//   "BB": {
//       "value": 51726459,
//       "href": "http://en.wikipedia.org/w/index.php?search=Barbados",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Barbados</span><br />Population : 51726459"
//       }
//   },
//   "BE": {
//       "value": 17478824,
//       "href": "http://en.wikipedia.org/w/index.php?search=Belgium",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Belgium</span><br />Population : 17478824"
//       }
//   },
//   "BZ": {
//       "value": 19813183,
//       "href": "http://en.wikipedia.org/w/index.php?search=Belize",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Belize</span><br />Population : 19813183"
//       }
//   },
//   "BJ": {
//       "value": 44953708,
//       "href": "http://en.wikipedia.org/w/index.php?search=Benin",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Benin</span><br />Population : 44953708"
//       }
//   },
//   "BT": {
//       "value": 13959918,
//       "href": "http://en.wikipedia.org/w/index.php?search=Bhutan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Bhutan</span><br />Population : 13959918"
//       }
//   },
//   "BY": {
//       "value": 52744657,
//       "href": "http://en.wikipedia.org/w/index.php?search=Belarus",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Belarus</span><br />Population : 52744657"
//       }
//   },
//   "MM": {
//       "value": 33932678,
//       "href": "http://en.wikipedia.org/w/index.php?search=Myanmar",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Myanmar</span><br />Population : 33932678"
//       }
//   },
//   "BO": {
//       "value": 15347372,
//       "href": "http://en.wikipedia.org/w/index.php?search=Bolivia, Plurinational State Of",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Bolivia, Plurinational State Of</span><br />Population : 15347372"
//       }
//   },
//   "BA": {
//       "value": 55163105,
//       "href": "http://en.wikipedia.org/w/index.php?search=Bosnia And Herzegovina",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Bosnia And Herzegovina</span><br />Population : 55163105"
//       }
//   },
//   "BW": {
//       "value": 10210684,
//       "href": "http://en.wikipedia.org/w/index.php?search=Botswana",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Botswana</span><br />Population : 10210684"
//       }
//   },
//   "BR": {
//       "value": 13773462,
//       "href": "http://en.wikipedia.org/w/index.php?search=Brazil",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Brazil</span><br />Population : 13773462"
//       }
//   },
//   "BN": {
//       "value": 23061545,
//       "href": "http://en.wikipedia.org/w/index.php?search=Brunei Darussalam",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Brunei Darussalam</span><br />Population : 23061545"
//       }
//   },
//   "BG": {
//       "value": 31201642,
//       "href": "http://en.wikipedia.org/w/index.php?search=Bulgaria",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Bulgaria</span><br />Population : 31201642"
//       }
//   },
//   "BF": {
//       "value": 52730033,
//       "href": "http://en.wikipedia.org/w/index.php?search=Burkina Faso",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Burkina Faso</span><br />Population : 52730033"
//       }
//   },
//   "BI": {
//       "value": 39826160,
//       "href": "http://en.wikipedia.org/w/index.php?search=Burundi",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Burundi</span><br />Population : 39826160"
//       }
//   },
//   "KH": {
//       "value": 36274350,
//       "href": "http://en.wikipedia.org/w/index.php?search=Cambodia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Cambodia</span><br />Population : 36274350"
//       }
//   },
//   "CM": {
//       "value": 7591156,
//       "href": "http://en.wikipedia.org/w/index.php?search=Cameroon",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Cameroon</span><br />Population : 7591156"
//       }
//   },
//   "CA": {
//       "value": 13705826,
//       "href": "http://en.wikipedia.org/w/index.php?search=Canada",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Canada</span><br />Population : 13705826"
//       }
//   },
//   "CV": {
//       "value": 42831397,
//       "href": "http://en.wikipedia.org/w/index.php?search=Cape Verde",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Cape Verde</span><br />Population : 42831397"
//       }
//   },
//   "CF": {
//       "value": 53113913,
//       "href": "http://en.wikipedia.org/w/index.php?search=Central African Republic",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Central African Republic</span><br />Population : 53113913"
//       }
//   },
//   "CL": {
//       "value": 19897272,
//       "href": "http://en.wikipedia.org/w/index.php?search=Chile",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Chile</span><br />Population : 19897272"
//       }
//   },
//   "CN": {
//       "value": 55991190,
//       "href": "http://en.wikipedia.org/w/index.php?search=China",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">China</span><br />Population : 55991190"
//       }
//   },
//   "CY": {
//       "value": 43379798,
//       "href": "http://en.wikipedia.org/w/index.php?search=Cyprus",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Cyprus</span><br />Population : 43379798"
//       }
//   },
//   "CO": {
//       "value": 41758359,
//       "href": "http://en.wikipedia.org/w/index.php?search=Colombia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Colombia</span><br />Population : 41758359"
//       }
//   },
//   "KM": {
//       "value": 13835614,
//       "href": "http://en.wikipedia.org/w/index.php?search=Comoros",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Comoros</span><br />Population : 13835614"
//       }
//   },
//   "CG": {
//       "value": 12989248,
//       "href": "http://en.wikipedia.org/w/index.php?search=Congo",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Congo</span><br />Population : 12989248"
//       }
//   },
//   "CD": {
//       "value": 32111987,
//       "href": "http://en.wikipedia.org/w/index.php?search=Congo, The Democratic Republic Of The",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Congo, The Democratic Republic Of The</span><br />Population : 32111987"
//       }
//   },
//   "KP": {
//       "value": 335812,
//       "href": "http://en.wikipedia.org/w/index.php?search=Korea, Democratic People's Republic Of",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Korea, Democratic People's Republic Of</span><br />Population : 335812"
//       }
//   },
//   "KR": {
//       "value": 24971808,
//       "href": "http://en.wikipedia.org/w/index.php?search=Korea, Republic Of",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Korea, Republic Of</span><br />Population : 24971808"
//       }
//   },
//   "CR": {
//       "value": 47553128,
//       "href": "http://en.wikipedia.org/w/index.php?search=Costa Rica",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Costa Rica</span><br />Population : 47553128"
//       }
//   },
//   "CI": {
//       "value": 29618591,
//       "href": "http://en.wikipedia.org/w/index.php?search=C\u00d4te D'ivoire",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">C\u00d4te D'ivoire</span><br />Population : 29618591"
//       }
//   },
//   "HR": {
//       "value": 16824399,
//       "href": "http://en.wikipedia.org/w/index.php?search=Croatia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Croatia</span><br />Population : 16824399"
//       }
//   },
//   "CU": {
//       "value": 58921479,
//       "href": "http://en.wikipedia.org/w/index.php?search=Cuba",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Cuba</span><br />Population : 58921479"
//       }
//   },
//   "DK": {
//       "value": 52985953,
//       "href": "http://en.wikipedia.org/w/index.php?search=Denmark",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Denmark</span><br />Population : 52985953"
//       }
//   },
//   "DJ": {
//       "value": 26540234,
//       "href": "http://en.wikipedia.org/w/index.php?search=Djibouti",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Djibouti</span><br />Population : 26540234"
//       }
//   },
//   "DM": {
//       "value": 29452243,
//       "href": "http://en.wikipedia.org/w/index.php?search=Dominica",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Dominica</span><br />Population : 29452243"
//       }
//   },
//   "EG": {
//       "value": 31450250,
//       "href": "http://en.wikipedia.org/w/index.php?search=Egypt",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Egypt</span><br />Population : 31450250"
//       }
//   },
//   "AE": {
//       "value": 12440847,
//       "href": "http://en.wikipedia.org/w/index.php?search=United Arab Emirates",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">United Arab Emirates</span><br />Population : 12440847"
//       }
//   },
//   "EC": {
//       "value": 43467542,
//       "href": "http://en.wikipedia.org/w/index.php?search=Ecuador",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Ecuador</span><br />Population : 43467542"
//       }
//   },
//   "ER": {
//       "value": 6397470,
//       "href": "http://en.wikipedia.org/w/index.php?search=Eritrea",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Eritrea</span><br />Population : 6397470"
//       }
//   },
//   "ES": {
//       "value": 8073748,
//       "href": "http://en.wikipedia.org/w/index.php?search=Spain",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Spain</span><br />Population : 8073748"
//       }
//   },
//   "EE": {
//       "value": 58820939,
//       "href": "http://en.wikipedia.org/w/index.php?search=Estonia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Estonia</span><br />Population : 58820939"
//       }
//   },
//   "US": {
//       "value": 11141137,
//       "href": "http://en.wikipedia.org/w/index.php?search=United States",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">United States</span><br />Population : 11141137"
//       }
//   },
//   "ET": {
//       "value": 5688205,
//       "href": "http://en.wikipedia.org/w/index.php?search=Ethiopia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Ethiopia</span><br />Population : 5688205"
//       }
//   },
//   "FJ": {
//       "value": 24357599,
//       "href": "http://en.wikipedia.org/w/index.php?search=Fiji",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Fiji</span><br />Population : 24357599"
//       }
//   },
//   "FI": {
//       "value": 55479349,
//       "href": "http://en.wikipedia.org/w/index.php?search=Finland",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Finland</span><br />Population : 55479349"
//       }
//   },
//   "FR": {
//       "value": 10051648,
//       "href": "http://en.wikipedia.org/w/index.php?search=France",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">France</span><br />Population : 10051648"
//       }
//   },
//   "GA": {
//       "value": 55402573,
//       "href": "http://en.wikipedia.org/w/index.php?search=Gabon",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Gabon</span><br />Population : 55402573"
//       }
//   },
//   "GM": {
//       "value": 26017425,
//       "href": "http://en.wikipedia.org/w/index.php?search=Gambia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Gambia</span><br />Population : 26017425"
//       }
//   },
//   "GE": {
//       "value": 15519204,
//       "href": "http://en.wikipedia.org/w/index.php?search=Georgia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Georgia</span><br />Population : 15519204"
//       }
//   },
//   "GH": {
//       "value": 30839697,
//       "href": "http://en.wikipedia.org/w/index.php?search=Ghana",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Ghana</span><br />Population : 30839697"
//       }
//   },
//   "GR": {
//       "value": 33868698,
//       "href": "http://en.wikipedia.org/w/index.php?search=Greece",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Greece</span><br />Population : 33868698"
//       }
//   },
//   "GD": {
//       "value": 48618854,
//       "href": "http://en.wikipedia.org/w/index.php?search=Grenada",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Grenada</span><br />Population : 48618854"
//       }
//   },
//   "GT": {
//       "value": 41893631,
//       "href": "http://en.wikipedia.org/w/index.php?search=Guatemala",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Guatemala</span><br />Population : 41893631"
//       }
//   },
//   "GN": {
//       "value": 34195911,
//       "href": "http://en.wikipedia.org/w/index.php?search=Guinea",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Guinea</span><br />Population : 34195911"
//       }
//   },
//   "GQ": {
//       "value": 29064706,
//       "href": "http://en.wikipedia.org/w/index.php?search=Equatorial Guinea",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Equatorial Guinea</span><br />Population : 29064706"
//       }
//   },
//   "GW": {
//       "value": 37877509,
//       "href": "http://en.wikipedia.org/w/index.php?search=Guinea-bissau",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Guinea-bissau</span><br />Population : 37877509"
//       }
//   },
//   "GY": {
//       "value": 27905753,
//       "href": "http://en.wikipedia.org/w/index.php?search=Guyana",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Guyana</span><br />Population : 27905753"
//       }
//   },
//   "HT": {
//       "value": 10760913,
//       "href": "http://en.wikipedia.org/w/index.php?search=Haiti",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Haiti</span><br />Population : 10760913"
//       }
//   },
//   "HN": {
//       "value": 39118723,
//       "href": "http://en.wikipedia.org/w/index.php?search=Honduras",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Honduras</span><br />Population : 39118723"
//       }
//   },
//   "HU": {
//       "value": 29359015,
//       "href": "http://en.wikipedia.org/w/index.php?search=Hungary",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Hungary</span><br />Population : 29359015"
//       }
//   },
//   "JM": {
//       "value": 16608694,
//       "href": "http://en.wikipedia.org/w/index.php?search=Jamaica",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Jamaica</span><br />Population : 16608694"
//       }
//   },
//   "JP": {
//       "value": 41025330,
//       "href": "http://en.wikipedia.org/w/index.php?search=Japan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Japan</span><br />Population : 41025330"
//       }
//   },
//   "MH": {
//       "value": 32208871,
//       "href": "http://en.wikipedia.org/w/index.php?search=Marshall Islands",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Marshall Islands</span><br />Population : 32208871"
//       }
//   },
//   "PW": {
//       "value": 28678998,
//       "href": "http://en.wikipedia.org/w/index.php?search=Palau",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Palau</span><br />Population : 28678998"
//       }
//   },
//   "SB": {
//       "value": 21105582,
//       "href": "http://en.wikipedia.org/w/index.php?search=Solomon Islands",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Solomon Islands</span><br />Population : 21105582"
//       }
//   },
//   "IN": {
//       "value": 55729786,
//       "href": "http://en.wikipedia.org/w/index.php?search=India",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">India</span><br />Population : 55729786"
//       }
//   },
//   "ID": {
//       "value": 6463278,
//       "href": "http://en.wikipedia.org/w/index.php?search=Indonesia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Indonesia</span><br />Population : 6463278"
//       }
//   },
//   "JO": {
//       "value": 11503082,
//       "href": "http://en.wikipedia.org/w/index.php?search=Jordan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Jordan</span><br />Population : 11503082"
//       }
//   },
//   "IR": {
//       "value": 24549539,
//       "href": "http://en.wikipedia.org/w/index.php?search=Iran, Islamic Republic Of",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Iran, Islamic Republic Of</span><br />Population : 24549539"
//       }
//   },
//   "IQ": {
//       "value": 15564905,
//       "href": "http://en.wikipedia.org/w/index.php?search=Iraq",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Iraq</span><br />Population : 15564905"
//       }
//   },
//   "IE": {
//       "value": 49860068,
//       "href": "http://en.wikipedia.org/w/index.php?search=Ireland",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Ireland</span><br />Population : 49860068"
//       }
//   },
//   "IS": {
//       "value": 43346894,
//       "href": "http://en.wikipedia.org/w/index.php?search=Iceland",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Iceland</span><br />Population : 43346894"
//       }
//   },
//   "IL": {
//       "value": 40043692,
//       "href": "http://en.wikipedia.org/w/index.php?search=Israel",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Israel</span><br />Population : 40043692"
//       }
//   },
//   "IT": {
//       "value": 30971313,
//       "href": "http://en.wikipedia.org/w/index.php?search=Italy",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Italy</span><br />Population : 30971313"
//       }
//   },
//   "KZ": {
//       "value": 40727365,
//       "href": "http://en.wikipedia.org/w/index.php?search=Kazakhstan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Kazakhstan</span><br />Population : 40727365"
//       }
//   },
//   "KE": {
//       "value": 39976056,
//       "href": "http://en.wikipedia.org/w/index.php?search=Kenya",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Kenya</span><br />Population : 39976056"
//       }
//   },
//   "KG": {
//       "value": 50741166,
//       "href": "http://en.wikipedia.org/w/index.php?search=Kyrgyzstan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Kyrgyzstan</span><br />Population : 50741166"
//       }
//   },
//   "KI": {
//       "value": 2739636,
//       "href": "http://en.wikipedia.org/w/index.php?search=Kiribati",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Kiribati</span><br />Population : 2739636"
//       }
//   },
//   "KW": {
//       "value": 7143295,
//       "href": "http://en.wikipedia.org/w/index.php?search=Kuwait",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Kuwait</span><br />Population : 7143295"
//       }
//   },
//   "LA": {
//       "value": 7006195,
//       "href": "http://en.wikipedia.org/w/index.php?search=Lao People's Democratic Republic",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Lao People's Democratic Republic</span><br />Population : 7006195"
//       }
//   },
//   "LS": {
//       "value": 9845083,
//       "href": "http://en.wikipedia.org/w/index.php?search=Lesotho",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Lesotho</span><br />Population : 9845083"
//       }
//   },
//   "LV": {
//       "value": 41310498,
//       "href": "http://en.wikipedia.org/w/index.php?search=Latvia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Latvia</span><br />Population : 41310498"
//       }
//   },
//   "LB": {
//       "value": 7135983,
//       "href": "http://en.wikipedia.org/w/index.php?search=Lebanon",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Lebanon</span><br />Population : 7135983"
//       }
//   },
//   "LR": {
//       "value": 39902936,
//       "href": "http://en.wikipedia.org/w/index.php?search=Liberia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Liberia</span><br />Population : 39902936"
//       }
//   },
//   "LY": {
//       "value": 20308572,
//       "href": "http://en.wikipedia.org/w/index.php?search=Libya",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Libya</span><br />Population : 20308572"
//       }
//   },
//   "LI": {
//       "value": 47474524,
//       "href": "http://en.wikipedia.org/w/index.php?search=Liechtenstein",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Liechtenstein</span><br />Population : 47474524"
//       }
//   },
//   "LT": {
//       "value": 8883554,
//       "href": "http://en.wikipedia.org/w/index.php?search=Lithuania",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Lithuania</span><br />Population : 8883554"
//       }
//   },
//   "LU": {
//       "value": 24481903,
//       "href": "http://en.wikipedia.org/w/index.php?search=Luxembourg",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Luxembourg</span><br />Population : 24481903"
//       }
//   },
//   "MK": {
//       "value": 35334757,
//       "href": "http://en.wikipedia.org/w/index.php?search=Macedonia, The Former Yugoslav Republic Of",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Macedonia, The Former Yugoslav Republic Of</span><br />Population : 35334757"
//       }
//   },
//   "MG": {
//       "value": 11872339,
//       "href": "http://en.wikipedia.org/w/index.php?search=Madagascar",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Madagascar</span><br />Population : 11872339"
//       }
//   },
//   "MY": {
//       "value": 10514132,
//       "href": "http://en.wikipedia.org/w/index.php?search=Malaysia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Malaysia</span><br />Population : 10514132"
//       }
//   },
//   "MW": {
//       "value": 56208722,
//       "href": "http://en.wikipedia.org/w/index.php?search=Malawi",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Malawi</span><br />Population : 56208722"
//       }
//   },
//   "MV": {
//       "value": 38076761,
//       "href": "http://en.wikipedia.org/w/index.php?search=Maldives",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Maldives</span><br />Population : 38076761"
//       }
//   },
//   "ML": {
//       "value": 14994568,
//       "href": "http://en.wikipedia.org/w/index.php?search=Mali",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Mali</span><br />Population : 14994568"
//       }
//   },
//   "MT": {
//       "value": 40105844,
//       "href": "http://en.wikipedia.org/w/index.php?search=Malta",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Malta</span><br />Population : 40105844"
//       }
//   },
//   "MA": {
//       "value": 20899017,
//       "href": "http://en.wikipedia.org/w/index.php?search=Morocco",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Morocco</span><br />Population : 20899017"
//       }
//   },
//   "MU": {
//       "value": 41637711,
//       "href": "http://en.wikipedia.org/w/index.php?search=Mauritius",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Mauritius</span><br />Population : 41637711"
//       }
//   },
//   "MR": {
//       "value": 47481836,
//       "href": "http://en.wikipedia.org/w/index.php?search=Mauritania",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Mauritania</span><br />Population : 47481836"
//       }
//   },
//   "MX": {
//       "value": 35886813,
//       "href": "http://en.wikipedia.org/w/index.php?search=Mexico",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Mexico</span><br />Population : 35886813"
//       }
//   },
//   "FM": {
//       "value": 14018414,
//       "href": "http://en.wikipedia.org/w/index.php?search=Micronesia, Federated States Of",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Micronesia, Federated States Of</span><br />Population : 14018414"
//       }
//   },
//   "MD": {
//       "value": 29170731,
//       "href": "http://en.wikipedia.org/w/index.php?search=Moldova, Republic Of",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Moldova, Republic Of</span><br />Population : 29170731"
//       }
//   },
//   "MC": {
//       "value": 10124768,
//       "href": "http://en.wikipedia.org/w/index.php?search=Monaco",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Monaco</span><br />Population : 10124768"
//       }
//   },
//   "MN": {
//       "value": 25935165,
//       "href": "http://en.wikipedia.org/w/index.php?search=Mongolia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Mongolia</span><br />Population : 25935165"
//       }
//   },
//   "ME": {
//       "value": 41182538,
//       "href": "http://en.wikipedia.org/w/index.php?search=Montenegro",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Montenegro</span><br />Population : 41182538"
//       }
//   },
//   "MZ": {
//       "value": 13778946,
//       "href": "http://en.wikipedia.org/w/index.php?search=Mozambique",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Mozambique</span><br />Population : 13778946"
//       }
//   },
//   "NA": {
//       "value": 13363989,
//       "href": "http://en.wikipedia.org/w/index.php?search=Namibia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Namibia</span><br />Population : 13363989"
//       }
//   },
//   "NP": {
//       "value": 8379025,
//       "href": "http://en.wikipedia.org/w/index.php?search=Nepal",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Nepal</span><br />Population : 8379025"
//       }
//   },
//   "NI": {
//       "value": 18157013,
//       "href": "http://en.wikipedia.org/w/index.php?search=Nicaragua",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Nicaragua</span><br />Population : 18157013"
//       }
//   },
//   "NE": {
//       "value": 38515482,
//       "href": "http://en.wikipedia.org/w/index.php?search=Niger",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Niger</span><br />Population : 38515482"
//       }
//   },
//   "NG": {
//       "value": 17890124,
//       "href": "http://en.wikipedia.org/w/index.php?search=Nigeria",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Nigeria</span><br />Population : 17890124"
//       }
//   },
//   "NO": {
//       "value": 11296518,
//       "href": "http://en.wikipedia.org/w/index.php?search=Norway",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Norway</span><br />Population : 11296518"
//       }
//   },
//   "NZ": {
//       "value": 10457464,
//       "href": "http://en.wikipedia.org/w/index.php?search=New Zealand",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">New Zealand</span><br />Population : 10457464"
//       }
//   },
//   "OM": {
//       "value": 56583463,
//       "href": "http://en.wikipedia.org/w/index.php?search=Oman",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Oman</span><br />Population : 56583463"
//       }
//   },
//   "UG": {
//       "value": 14343799,
//       "href": "http://en.wikipedia.org/w/index.php?search=Uganda",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Uganda</span><br />Population : 14343799"
//       }
//   },
//   "UZ": {
//       "value": 32815768,
//       "href": "http://en.wikipedia.org/w/index.php?search=Uzbekistan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Uzbekistan</span><br />Population : 32815768"
//       }
//   },
//   "PK": {
//       "value": 53649518,
//       "href": "http://en.wikipedia.org/w/index.php?search=Pakistan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Pakistan</span><br />Population : 53649518"
//       }
//   },
//   "PS": {
//       "value": 51136014,
//       "href": "http://en.wikipedia.org/w/index.php?search=Palestine, State Of",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Palestine, State Of</span><br />Population : 51136014"
//       }
//   },
//   "PA": {
//       "value": 23315637,
//       "href": "http://en.wikipedia.org/w/index.php?search=Panama",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Panama</span><br />Population : 23315637"
//       }
//   },
//   "PG": {
//       "value": 41114902,
//       "href": "http://en.wikipedia.org/w/index.php?search=Papua New Guinea",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Papua New Guinea</span><br />Population : 41114902"
//       }
//   },
//   "PY": {
//       "value": 33548798,
//       "href": "http://en.wikipedia.org/w/index.php?search=Paraguay",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Paraguay</span><br />Population : 33548798"
//       }
//   },
//   "NL": {
//       "value": 35276260,
//       "href": "http://en.wikipedia.org/w/index.php?search=Netherlands",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Netherlands</span><br />Population : 35276260"
//       }
//   },
//   "PE": {
//       "value": 35446265,
//       "href": "http://en.wikipedia.org/w/index.php?search=Peru",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Peru</span><br />Population : 35446265"
//       }
//   },
//   "PH": {
//       "value": 34322043,
//       "href": "http://en.wikipedia.org/w/index.php?search=Philippines",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Philippines</span><br />Population : 34322043"
//       }
//   },
//   "PL": {
//       "value": 45620929,
//       "href": "http://en.wikipedia.org/w/index.php?search=Poland",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Poland</span><br />Population : 45620929"
//       }
//   },
//   "PT": {
//       "value": 52057328,
//       "href": "http://en.wikipedia.org/w/index.php?search=Portugal",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Portugal</span><br />Population : 52057328"
//       }
//   },
//   "QA": {
//       "value": 11426306,
//       "href": "http://en.wikipedia.org/w/index.php?search=Qatar",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Qatar</span><br />Population : 11426306"
//       }
//   },
//   "DO": {
//       "value": 40515317,
//       "href": "http://en.wikipedia.org/w/index.php?search=Dominican Republic",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Dominican Republic</span><br />Population : 40515317"
//       }
//   },
//   "RO": {
//       "value": 35581537,
//       "href": "http://en.wikipedia.org/w/index.php?search=Romania",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Romania</span><br />Population : 35581537"
//       }
//   },
//   "GB": {
//       "value": 54682340,
//       "href": "http://en.wikipedia.org/w/index.php?search=United Kingdom",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">United Kingdom</span><br />Population : 54682340"
//       }
//   },
//   "RU": {
//       "value": 1796386,
//       "href": "http://en.wikipedia.org/w/index.php?search=Russian Federation",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Russian Federation</span><br />Population : 1796386"
//       }
//   },
//   "RW": {
//       "value": 57822849,
//       "href": "http://en.wikipedia.org/w/index.php?search=Rwanda",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Rwanda</span><br />Population : 57822849"
//       }
//   },
//   "KN": {
//       "value": 38996246,
//       "href": "http://en.wikipedia.org/w/index.php?search=Saint Kitts And Nevis",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Saint Kitts And Nevis</span><br />Population : 38996246"
//       }
//   },
//   "SM": {
//       "value": 26304422,
//       "href": "http://en.wikipedia.org/w/index.php?search=San Marino",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">San Marino</span><br />Population : 26304422"
//       }
//   },
//   "VC": {
//       "value": 27147131,
//       "href": "http://en.wikipedia.org/w/index.php?search=Saint Vincent And The Grenadines",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Saint Vincent And The Grenadines</span><br />Population : 27147131"
//       }
//   },
//   "LC": {
//       "value": 54422763,
//       "href": "http://en.wikipedia.org/w/index.php?search=Saint Lucia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Saint Lucia</span><br />Population : 54422763"
//       }
//   },
//   "SV": {
//       "value": 1580682,
//       "href": "http://en.wikipedia.org/w/index.php?search=El Salvador",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">El Salvador</span><br />Population : 1580682"
//       }
//   },
//   "WS": {
//       "value": 39926700,
//       "href": "http://en.wikipedia.org/w/index.php?search=Samoa",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Samoa</span><br />Population : 39926700"
//       }
//   },
//   "ST": {
//       "value": 18219165,
//       "href": "http://en.wikipedia.org/w/index.php?search=Sao Tome And Principe",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Sao Tome And Principe</span><br />Population : 18219165"
//       }
//   },
//   "SN": {
//       "value": 28443185,
//       "href": "http://en.wikipedia.org/w/index.php?search=Senegal",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Senegal</span><br />Population : 28443185"
//       }
//   },
//   "RS": {
//       "value": 18800470,
//       "href": "http://en.wikipedia.org/w/index.php?search=Serbia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Serbia</span><br />Population : 18800470"
//       }
//   },
//   "SC": {
//       "value": 18802298,
//       "href": "http://en.wikipedia.org/w/index.php?search=Seychelles",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Seychelles</span><br />Population : 18802298"
//       }
//   },
//   "SL": {
//       "value": 55503113,
//       "href": "http://en.wikipedia.org/w/index.php?search=Sierra Leone",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Sierra Leone</span><br />Population : 55503113"
//       }
//   },
//   "SG": {
//       "value": 7962240,
//       "href": "http://en.wikipedia.org/w/index.php?search=Singapore",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Singapore</span><br />Population : 7962240"
//       }
//   },
//   "SK": {
//       "value": 36371234,
//       "href": "http://en.wikipedia.org/w/index.php?search=Slovakia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Slovakia</span><br />Population : 36371234"
//       }
//   },
//   "SI": {
//       "value": 35934342,
//       "href": "http://en.wikipedia.org/w/index.php?search=Slovenia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Slovenia</span><br />Population : 35934342"
//       }
//   },
//   "SO": {
//       "value": 9839599,
//       "href": "http://en.wikipedia.org/w/index.php?search=Somalia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Somalia</span><br />Population : 9839599"
//       }
//   },
//   "SD": {
//       "value": 51008054,
//       "href": "http://en.wikipedia.org/w/index.php?search=Sudan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Sudan</span><br />Population : 51008054"
//       }
//   },
//   "SS": {
//       "value": 29958600,
//       "href": "http://en.wikipedia.org/w/index.php?search=South Sudan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">South Sudan</span><br />Population : 29958600"
//       }
//   },
//   "LK": {
//       "value": 14575955,
//       "href": "http://en.wikipedia.org/w/index.php?search=Sri Lanka",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Sri Lanka</span><br />Population : 14575955"
//       }
//   },
//   "SE": {
//       "value": 21619250,
//       "href": "http://en.wikipedia.org/w/index.php?search=Sweden",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Sweden</span><br />Population : 21619250"
//       }
//   },
//   "CH": {
//       "value": 5958749,
//       "href": "http://en.wikipedia.org/w/index.php?search=Switzerland",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Switzerland</span><br />Population : 5958749"
//       }
//   },
//   "SR": {
//       "value": 5178192,
//       "href": "http://en.wikipedia.org/w/index.php?search=Suriname",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Suriname</span><br />Population : 5178192"
//       }
//   },
//   "SZ": {
//       "value": 27730264,
//       "href": "http://en.wikipedia.org/w/index.php?search=Swaziland",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Swaziland</span><br />Population : 27730264"
//       }
//   },
//   "SY": {
//       "value": 21582690,
//       "href": "http://en.wikipedia.org/w/index.php?search=Syrian Arab Republic",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Syrian Arab Republic</span><br />Population : 21582690"
//       }
//   },
//   "TJ": {
//       "value": 50642453,
//       "href": "http://en.wikipedia.org/w/index.php?search=Tajikistan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Tajikistan</span><br />Population : 50642453"
//       }
//   },
//   "TZ": {
//       "value": 57495636,
//       "href": "http://en.wikipedia.org/w/index.php?search=Tanzania, United Republic Of",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Tanzania, United Republic Of</span><br />Population : 57495636"
//       }
//   },
//   "TD": {
//       "value": 58550394,
//       "href": "http://en.wikipedia.org/w/index.php?search=Chad",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Chad</span><br />Population : 58550394"
//       }
//   },
//   "CZ": {
//       "value": 30320544,
//       "href": "http://en.wikipedia.org/w/index.php?search=Czech Republic",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Czech Republic</span><br />Population : 30320544"
//       }
//   },
//   "TH": {
//       "value": 33437289,
//       "href": "http://en.wikipedia.org/w/index.php?search=Thailand",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Thailand</span><br />Population : 33437289"
//       }
//   },
//   "TL": {
//       "value": 12826556,
//       "href": "http://en.wikipedia.org/w/index.php?search=Timor-leste",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Timor-leste</span><br />Population : 12826556"
//       }
//   },
//   "TG": {
//       "value": 339468,
//       "href": "http://en.wikipedia.org/w/index.php?search=Togo",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Togo</span><br />Population : 339468"
//       }
//   },
//   "TO": {
//       "value": 38473438,
//       "href": "http://en.wikipedia.org/w/index.php?search=Tonga",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Tonga</span><br />Population : 38473438"
//       }
//   },
//   "TT": {
//       "value": 12371383,
//       "href": "http://en.wikipedia.org/w/index.php?search=Trinidad And Tobago",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Trinidad And Tobago</span><br />Population : 12371383"
//       }
//   },
//   "TN": {
//       "value": 26536578,
//       "href": "http://en.wikipedia.org/w/index.php?search=Tunisia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Tunisia</span><br />Population : 26536578"
//       }
//   },
//   "TM": {
//       "value": 15950613,
//       "href": "http://en.wikipedia.org/w/index.php?search=Turkmenistan",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Turkmenistan</span><br />Population : 15950613"
//       }
//   },
//   "TR": {
//       "value": 6731994,
//       "href": "http://en.wikipedia.org/w/index.php?search=Turkey",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Turkey</span><br />Population : 6731994"
//       }
//   },
//   "TV": {
//       "value": 15522860,
//       "href": "http://en.wikipedia.org/w/index.php?search=Tuvalu",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Tuvalu</span><br />Population : 15522860"
//       }
//   },
//   "VU": {
//       "value": 44341327,
//       "href": "http://en.wikipedia.org/w/index.php?search=Vanuatu",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Vanuatu</span><br />Population : 44341327"
//       }
//   },
//   "VE": {
//       "value": 58586954,
//       "href": "http://en.wikipedia.org/w/index.php?search=Venezuela, Bolivarian Republic Of",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Venezuela, Bolivarian Republic Of</span><br />Population : 58586954"
//       }
//   },
//   "VN": {
//       "value": 45536841,
//       "href": "http://en.wikipedia.org/w/index.php?search=Viet Nam",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Viet Nam</span><br />Population : 45536841"
//       }
//   },
//   "UA": {
//       "value": 41019846,
//       "href": "http://en.wikipedia.org/w/index.php?search=Ukraine",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Ukraine</span><br />Population : 41019846"
//       }
//   },
//   "UY": {
//       "value": 41906427,
//       "href": "http://en.wikipedia.org/w/index.php?search=Uruguay",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Uruguay</span><br />Population : 41906427"
//       }
//   },
//   "YE": {
//       "value": 51501615,
//       "href": "http://en.wikipedia.org/w/index.php?search=Yemen",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Yemen</span><br />Population : 51501615"
//       }
//   },
//   "ZM": {
//       "value": 55678602,
//       "href": "http://en.wikipedia.org/w/index.php?search=Zambia",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Zambia</span><br />Population : 55678602"
//       }
//   },
//   "ZW": {
//       "value": 57040464,
//       "href": "http://en.wikipedia.org/w/index.php?search=Zimbabwe",
//       "tooltip": {
//           "content": "<span style=\"font-weight:bold;\">Zimbabwe</span><br />Population : 57040464"
//       }
//   }
// },
