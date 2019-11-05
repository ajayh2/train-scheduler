// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDHK50FtS2YMwQHN6Y2ImwlcbI_tyzHgqI",
    authDomain: "train-scheduler-6bf82.firebaseapp.com",
    databaseURL: "https://train-scheduler-6bf82.firebaseio.com",
    projectId: "train-scheduler-6bf82",
    storageBucket: "train-scheduler-6bf82.appspot.com",
    messagingSenderId: "937457349134",
    appId: "1:937457349134:web:2e3edf541444f54601025f",
    measurementId: "G-X0ZTJTJK79"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

	var firstTime = moment(trainTime, "hh:mm A").subtract(1, "years");
	console.log(firstTime);

	// Current time
	var currentTime = moment();
	console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm A"));

	// Difference between times
	var diffTime = moment().diff(moment(firstTime), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var remainder = diffTime % frequency;
	console.log(remainder);

	// Mins until train
	var minsTillTrain = frequency - remainder;
	console.log("MINUTES TILL TRAIN: " + minsTillTrain);

	// Next train
	var nextTrain = moment().add(minsTillTrain, "minutes").format("hh:mm A");
	console.log("ARRIVAL TIME: " + nextTrain);


  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(minsTillTrain)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  