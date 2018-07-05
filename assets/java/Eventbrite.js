





$("#submitBtn").on("click",function(event){
    event.preventDefault();
    //   Token for an Eventbrite api
var Token = "E37FO4F4OMDF4ELNTCLM";
var EventName = $("#searchEvents").val().trim();
console.log(EventName);
// Here we are building the URL we need to query the database

var queryURL = "https://www.eventbriteapi.com/v3/events/search/?q="+ EventName +"&token="+ Token ; 

// Here we run our AJAX call to the OpenWeatherMap API

$.ajax({
  url: queryURL,
  method: "GET"
})


// We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    

//     // Log the resulting object
    console.log(response);

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



var r = document.getElementById('result');

			$("#speechbtn").on("click",function (event) {
       
        event.preventDefault();
				if('webkitSpeechRecognition' in window){
					var speechRecognizer = new webkitSpeechRecognition();
					speechRecognizer.continuous = true;
					speechRecognizer.interimResults = true;
					speechRecognizer.lang = 'en-IN';
					speechRecognizer.start();

					var finalTranscripts = '';

					speechRecognizer.onresult = function(event){
						var interimTranscripts = '';
						for(var i = event.resultIndex; i < event.results.length; i++){
							var transcript = event.results[i][0].transcript;
							transcript.replace("\n", "<br>");
							if(event.results[i].isFinal){
								finalTranscripts += transcript;
							}else{
								interimTranscripts += transcript;
							}
						}
						r.innerHTML = finalTranscripts + '<span style="color:#999">' + interimTranscripts + '</span>';
					};
					speechRecognizer.onerror = function (event) {
					};
				}else{
					r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
				}
    });