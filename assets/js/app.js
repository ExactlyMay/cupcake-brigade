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



$(document).ready(function(){

login();

});

function login(){
    function newLogin(user){
        if (user)
        {
            testAlert(user);
        } else {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    }

    firebase.auth().onAuthStateChanged(newLogin);
}

function testAlert(user){

    database.ref('users').push({
        uid: user.uid,
        userName: user.email,
        displayName: user.displayName,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    alert("Welcome, " + user.displayName + "!");

    console.log("hello " + user.displayName);

    //Get the current userID
    var userId = firebase.auth().currentUser.uid;
    //Get the user data
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        //Do something with your user data located in snapshot
    });

    firebase.database().ref('users').set({
        UID: userId,
        username: name,
        email: email
        //some more user data
    });
  
    
}
    database.ref("search").on("child_added", function(snapshot) {
        var childData = snapshot.val();
    });