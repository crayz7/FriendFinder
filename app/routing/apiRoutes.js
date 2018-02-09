var path = require("path");
var friends = require("../data/friends.js");

//Routes
module.exports = function(app) {
  // Get all friends
  app.get("/api/friends", function(req, res) {
	res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
  	// Capture the user input object
	var newFriendScores = req.body['scores[]'];
	//var newFriendScores = [];
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;
    console.log(newFriendScores);
    //runs through all current friends in list
    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      //run through scores to compare friends
      for(var j = 0; j < newFriendScores.length; j++) {
        totalDifference += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //push results into scoresArray
      scoresArray.push(totalDifference);
    }

    //after all friends are compared, find best match
    for(var i = 0; i < scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    var newFriend = friends[bestMatch];
    res.json(newFriend);

    //pushes new submission into the friendsList array
    friends.push(req.body);
  });
}