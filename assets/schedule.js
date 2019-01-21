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

    
 $("#submitButton").on("click", function () {
    event.preventDefault();

    shuttle = $("#shuttle").val().trim();
    dport = $("#dport").val().trim();
    idi = $("#idi").val().trim();
    interval = $("#interval").val().trim();


 

    database.ref().push({
        "shuttle": shuttle,
        "dport": dport,
        "idi": idi,
        "interval": interval,
        // "idiConvert": idiConvert,
    })

    $("#shuttle").val("");
	$("#dport").val("");
	$("#idi").val("");
	$("#interval").val("");
 
 })





 database.ref().on("child_added", function (childSnapshot) {
    shuttle = childSnapshot.val().shuttle;
    dport = childSnapshot.val().dport;
    idi = childSnapshot.val().idi;
    interval = childSnapshot.val().interval;

    var intervalCap = interval;
    var idiCap = idi;
    var idiConvert = moment(idiCap, "HH:mm").subtract(1, "years");
    console.log(idiConvert)
    var currentTime = moment();
    var diffTime = moment().diff(moment(idiConvert), "Minutes");
    var tRemainder = diffTime % intervalCap;
    var tMinutesUntilShuttle = idiCap - tRemainder;
    var nextShuttle = moment().add(tMinutesUntilShuttle, "Minutes");
    var nextShuttleDig = moment(nextShuttle).format("hh:mm A")

     var newShuttle = $("<tr><th>"+ shuttle +"</th><td>"+ dport +"</td><td>"+ interval +"</td><td>"+ nextShuttleDig +"</td><td>"+ tMinutesUntilShuttle+"</td></tr>");
    $("#shuttleTable").append(newShuttle);
 
 });
