var path = require("path");
var friends = require("../data/friends.js");

//Routes
module.exports = function(app) {
  // Get all friends
  app.get("/api/friends", function(req, res) {
	res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  // var inputData = req.body;
  // var inputScores = inputData.scores;
  // var totalDifference = 0;
  // //var scoresArray = [];
  // // Loop through each friend's scores  
  // for (var i = 0; i < inputScores.length; i++) {
  //  	if(inputScores[i] == "1 (Strongly Disagree)") {
		// 		inputScores[i] = 1;
		// 	} else if(inputScores[i] == "5 (Strongly Agree)") {
		// 		inputScores[i] = 5;
		// 	} else {
		// 		inputScores[i] = parseInt(inputScores[i]);
		// 	}
		// 	console.log(inputScores);
   // Add new friend entry

	// Capture the user input object
	var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    //runs through all current friends in list
    for(var i=0; i < friends.length; i++){
      var scoresDiff = 0;
      //run through scores to compare friends
      for(var j=0; j < newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //push results into scoresArray
      scoresArray.push(scoresDiff);
    }

    //after all friends are compared, find best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    var bff = friends[bestMatch];
    res.json(bff);

    //pushes new submission into the friendsList array
    friends.push(req.body);

  //friends.push(inputScores/res.json(friends);
  });
}