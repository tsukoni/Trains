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
var firstTrainTime;
var timeDiff;
var minutesPassedTimer;
var eta;
var arrivalTime;
var arrival;
$("#add-train").on("click", function(event) {
    event.preventDefault();
    trainName = $('#train-name').val().trim();
    destina = $('#destination').val().trim();
    firstTrain = $('#first-train').val().trim();
    frequen = $('#frequency').val().trim();
    timeStamp = firebase.database.ServerValue.TIMESTAMP;
    //gets unique timestamp for each iteration
    firstTrainTime = moment(firstTrain, "hh:mm");
    //converts hh:mm (military time format) string to date time
    timeDiff = moment().diff(moment(firstTrainTime), "minutes");
    //gets how many minutes from first train to present
    minutesPassedTimer = timeDiff % frequen;
    //cycles through all trains so far and gives minutes passed in current iterations
    eta = frequen - minutesPassedTimer;
    //gets how many minutes until the next train
    arrivalTime = moment().add(eta, "minutes");
    //adds eta to current time
    arrival = moment(arrivalTime).format("hh:mm");
    //formats cause objects in firebase keeps returning undefined
    dataRef.ref().push({
        train: trainName,
        destination: destina,
        often: frequen,
        arrival: arrival,
        eta: eta
    })
});
dataRef.ref().on("child_added", function(childSnapshot) {
    var tableRow = $("<tr>");
    tableRow.attr("id", childSnapshot.val().timestamp);
    var tableDataString = "<td>" + childSnapshot.val().train + "</td>" +
        "<td>" + childSnapshot.val().destination + "</td>" +
        "<td>" + childSnapshot.val().often + "</td>" +
        "<td>" + childSnapshot.val().arrival + "</td>" +
        "<td>" + childSnapshot.val().eta + "</td>"
    tableRow.append(tableDataString)
    $("#schedule-table").append(tableRow);
});