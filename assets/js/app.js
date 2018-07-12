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
			$("#loginBtn").on('click', login(user));
		}
	}
    firebase.auth().onAuthStateChanged(newLogin);
    
    $("#submitBtn").on("click", addSearch);
});

function login(user) {
	var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    
    database.ref('users').push({
        uid: user.uid,
        userName: user.email,
        displayName: user.displayName,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
}

function userDetails(user) {
	$("#loginBtn").hide();
    $("#loginScreen").append("<p class='center'> Welcome, " + user.displayName + "!</p>");
}

function addSearch(){
    var userId = firebase.auth().currentUser.uid;

    var searchTerm = $( "#searchEvents" ).val().trim();
    database.ref('search/' + userId).push({
        searchTerm: searchTerm
    });

    //Get the current userID
    //Get the user data
    // return firebase.database("search").ref(userId).once('value').then(function(snapshot) {
        //Do something with your user data located in snapshot
        
    // });

    
}

database.ref("search").on("child_added", function(snapshot) {
    var childData = snapshot.val();
});