//Firebase
var config = {
	apiKey: "AIzaSyCn4XC2OW3MeQMqQ8mGhgG0AL1ncDmjGOY",
	authDomain: "cupcake-brigade.firebaseapp.com",
	databaseURL: "https://cupcake-brigade.firebaseio.com",
	projectId: "cupcake-brigade",
	storageBucket: "cupcake-brigade.appspot.com",
	messagingSenderId: "1092615531812"
};
firebase.initializeApp(config);
var database = firebase.database();
$(document).ready(function() {

	function newLogin(user) {
		if (user) {
			userDetails(user);
		} else {
			$("#loginBtn").on('click', login);
		}
	}
	firebase.auth().onAuthStateChanged(newLogin);

});

function login() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(provider);
}


function testAlert(user) {
	console.log("hello " + user.displayName);
}

function userDetails(user) {
	$("#loginBtn").hide();
	$("#loginScreen").append("<p class='center'> Welcome, " + user.displayName + "!</p>");

}


// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
	}
}

