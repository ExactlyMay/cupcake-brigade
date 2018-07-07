var intervalId;
var time;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;
var questionCounter = 0;
var correctAnswer;
var correctImage;



$(document).ready(function(){

    $(".container").mapael({
        map : {
            name : "world_countries"
        }
    });

    $('.map').on('click', 'path', function() {
        console.log("$(this).attr('data-id'): " + $(this).attr("data-id"));
    });

});



