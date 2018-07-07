





$("#submitBtn").on("click",function(event){
    event.preventDefault();

    $(".box__left").text("");
    $(".box__bottom").text("");
    $(".box__top").text("");
    $(".box__right").text("");
    $(".front").empty();

    //   Token for an Eventbrite api
var Token = "E37FO4F4OMDF4ELNTCLM";
var EventName = $("#searchEvents").val().trim();
console.log(EventName);
// Here we are building the URL we need to query the database
// AIzaSyA8cKuGcg8_ZyxrmARMBgXbx8gXKGKSans api key for an street view..
// https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10&key=YOUR_API_KEY




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

    var bottom = $("<div>");
    var bh1 = $("<h1>");
    bh1.text("Buy Tickets From Here :");
    var bp = $("<p>")
    bp.html("<a href="+response.events[0].url+">"+response.events[0].url+"</a>");
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
    $(".front").append(boxp);
    
    $("#eventid").text(response.events[0].venue_id);
    // console.log(response.events[0].venue_id);
    r= response.events[0].venue_id;
    eventvenue(r);
      
  
  
  
  
    function eventvenue(r) {
      // alert("hi");
  
    var queryURLV =  "https://www.eventbriteapi.com/v3/venues/"+ r +"/?token=" + Token ;
  
  $.ajax({
    url: queryURLV,
    method: "GET"
  })
  
  
  // We store all of the retrieved data inside of an object called "response"
    .then(function(response2) {
  
      
  
  //     // Log the resulting object
      console.log(response2);
  
      var right = $("<div>");
      var rh1 = $("<h1>");
      rh1.text("Details of Event");
      var rp = $("<p>")
      var rp2 = $("<p>");
      var rp3 = $("<p>");
      rp.text("Address : "+ response2.address.localized_address_display);
      rp2.text("city : " +response2.address.city);
      rp3.text("Region : " + response2.address.region);
      right.append(rh1);
      right.append(rp);
      right.append(rp2);
      right.append(rp3);
      
  
      $(".box__right").append(right);
  
  
    });
  }
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
            $("#searchEvents").val(r.innerText);
            console.log(r.innerText);
          };
					speechRecognizer.onerror = function (event) {
					};
				}else{
					r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
				}
			
        
        
    });
