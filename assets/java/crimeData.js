
var states = [];
var stateAbbr = "";

$(document).ready(function(){
	$('#submitBtn').on('click', populateCrimeData);
});

function populateCrimeData(event) {
    event.preventDefault();

    stateAbbr = $("#addState").val().trim();

    var queryURL = "https://api.usa.gov/crime/fbi/sapi/api/estimates/states/" + stateAbbr + "?api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv"
    
	$.ajax({
		url: queryURL,
        method: "GET"
	}).then(function(response) {
		console.log(response);
		
        $("#states").append(response);
    });
}



