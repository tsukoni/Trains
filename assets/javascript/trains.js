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
$("#add-train").on("click", function(event) {
    event.preventDefault();
    var trainName = $('#train-name').val().trim();
    var destina = $('#destination').val().trim();
    var firstTrain = $('#first-train').val().trim();
    var frequen = $('#frequency').val().trim();
    var timeStamp = firebase.database.ServerValue.TIMESTAMP;
    var current = moment();
    var firstTrainTime = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainTime);

    //current time in milliseconds
 /*   var k = Math.round(new Date(firstTrain).getTime()/1000)


    console.log(milli)

    console.log(k);*/

      /*  var now = moment.unix(milli/1000).format("hh:mm a");*/
/*    startDateMilliseconds = Date.parse(startDate);
*/
/*    var monthsWorked = Math.floor((today - startDateMilliseconds) / (1000 * 3600 * 24 * 30));
*/
/*    var totalBilled = monthlyRate * monthsWorked;
*/
    dataRef.ref().push({
        train: trainName,
        destination: destina,
        first: firstTrain,
        often: frequen,
        
    })
}); 

dataRef.ref().on("child_added", function(childSnapshot) {
    var tableRow = $("<tr>");
    tableRow.attr("id", childSnapshot.val().timestamp);
    var tableDataString = "<td>" + childSnapshot.val().train + "</td>" +
        "<td>" + childSnapshot.val().destination + "</td>" +
        "<td>" + childSnapshot.val().first + "</td>" +
        "<td>" + childSnapshot.val().often + "</td>" 
       tableRow.append(tableDataString)
    $("#schedule-table").append(tableRow);
});