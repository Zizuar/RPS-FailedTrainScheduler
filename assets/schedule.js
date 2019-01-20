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
 
 $("#submitButton").on("click", function () {
    shuttle = $("#shuttle").val().trim();
    dport = $("#dport").val().trim();
    idi = $("#idi").val().trim();
    interval = $("#interval").val().trim();
 
 
    database.ref().push({
        "shuttle": shuttle,
        "dport": dport,
        "idi": idi,
        "interval": interval
    })
 
 })

 database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot)
    console.log(childSnapshot.val().shuttle);
    console.log(childSnapshot.val().dport);
    console.log(childSnapshot.val().idi);
    console.log(childSnapshot.val().interval);
 
    var newShuttle = $("<tr><th>"+childSnapshot.val().shuttle+"</th><th>"+ childSnapshot.val().dport +"</th><th>"+ childSnapshot.val().interval +"</th><th>"+ childSnapshot.val().interval +"</th></tr>");
    $("#shuttleTable").append(newShuttle);
 
 });