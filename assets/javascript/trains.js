var config = {
    apiKey: "AIzaSyCBqN72tGOK-lBT2OztzvHOVNYqQp1AGkE",
    authDomain: "train-token.firebaseapp.com",
    databaseURL: "https://train-token.firebaseio.com",
    projectId: "train-token",
    storageBucket: "train-token.appspot.com",
    messagingSenderId: "679305525601"
};
firebase.initializeApp(config);
var dataRef = firebase.database();
var trainName;
var destina;
var firstTrain;
var frequen;
var timeStamp;
var current;
var firstTrainTime;
var firstTrainMilli;
var timeDiff;
var eta;
var etaM;
var arrivalTime;
var arrival;
var time;
$("#add-train").on("click", function(event) {
    event.preventDefault();
    trainName = $('#train-name').val().trim();
    destina = $('#destination').val().trim();
    firstTrain = $('#first-train').val().trim();
    frequen = $('#frequency').val().trim();
    timeStamp = firebase.database.ServerValue.TIMESTAMP;
    current = moment.now();
    //current time in milliseconds
    firstTrainTime = moment(firstTrain, "hh:mm");
    //converts hh:mm (military time format) string to date
    firstTrainMilli = Date.parse(firstTrainTime);
    //converts date attribute into milliseconds
    timeDiff = current - firstTrainMilli;
    //gets how many milliseconds have passed since first train
    minutesDiff = timeDiff / (60 * 1000);
    //converts elapsed time from milliseconds to minutes
    eta = minutesDiff % frequen;
    //retrieves number of minutes till next train IMPORTANT
    etaM = eta * (60 * 1000);
    //gets eta converted into milliseconds
    arrivalTime = current + etaM
    //adds etaM to current time
    time = new Date(arrivalTime);
    //converts arrival time in milliseconds to dollars IMPORTANT
    dataRef.ref().push({
        train: trainName,
        destination: destina,
        often: frequen,
        time: time, 
        eta: eta

    })
});
dataRef.ref().on("child_added", function(childSnapshot) {
    var tableRow = $("<tr>");
    tableRow.attr("id", childSnapshot.val().timestamp);
    var tableDataString = "<td>" + childSnapshot.val().train + "</td>" +
        "<td>" + childSnapshot.val().destination + "</td>" +
        "<td>" + childSnapshot.val().often + "</td>" +
        "<td>" + childSnapshot.val().time + "</td>" +
        "<td>" + childSnapshot.val().eta + "</td>"
    tableRow.append(tableDataString)
    $("#schedule-table").append(tableRow);
});