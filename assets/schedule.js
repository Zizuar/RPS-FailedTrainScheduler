var config = {
    apiKey: "AIzaSyACCiiKvA1Cfp1C17ztZD1FXTi0_NQcLCU",
    authDomain: "shuttlebayschedule.firebaseapp.com",
    databaseURL: "https://shuttlebayschedule.firebaseio.com",
    projectId: "shuttlebayschedule",
    storageBucket: "shuttlebayschedule.appspot.com",
    messagingSenderId: "1059238990153"
  };

 firebase.initializeApp(config);
 
 var database = firebase.database();
 
 var shuttle;
 var dport;
 var idi;
 var interval;
 var etaCal;
 var nShuttleTime;

 var idiConverted = moment(idi, "HH:mm").subtract(1, "years");
    console.log("idi: " + idiConverted);
 var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(idiConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

var etaCal = diffTime % interval;
    console.log(etaCal);



var tMinutesTillTrain = interval - etaCal;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
var nShuttleTime = moment().add(tMinutesTillTrain, "minutes");
// var nShuttleTime = Date.now().add(tMinutesTillTrain, "minutes");
// var nShuttleTime = Date.now() ++ (tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nShuttleTime).format("hh:mm"));
    
 $("#submitButton").on("click", function () {
    shuttle = $("#shuttle").val().trim();
    dport = $("#dport").val().trim();
    idi = moment($("#idi").val().trim(), "HH:mm").format("X");
    interval = $("#interval").val().trim();
    // etaCal = $("#etaCal").val().trim();
    

 

    database.ref().push({
        "shuttle": shuttle,
        "dport": dport,
        "idi": idi,
        "interval": interval
        
        // "etaCal": etaCal
    })

    $("#train-input").val("");
	$("#destination-input").val("");
	$("#time-input").val("");
	$("#frequency-input").val("");
 
 })





 database.ref().on("child_added", function (childSnapshot) {
     var newShuttle = $("<tr><th>"+childSnapshot.val().shuttle+"</th><td>"+ childSnapshot.val().dport +"</td><td>"+ childSnapshot.val().interval +"</td><td>"+ childSnapshot.val().interval +"</td></tr>");
    $("#shuttleTable").append(newShuttle);
 
 });
