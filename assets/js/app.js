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
	login();
});

function login() {
	function newLogin(user) {
		if (user) {
			testAlert(user);
		} else {
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithRedirect(provider);
		}
	}
	firebase.auth().onAuthStateChanged(newLogin);
}

function testAlert(user) {
	console.log("hello " + user.displayName);
}
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}