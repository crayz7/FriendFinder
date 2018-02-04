var path = require("path");
var friends = require("../data/friends.js")

//Routes
module.exports = function(app) {
  // Get all friends
  app.get("/api/friends", function(req, res) {
	res.json(friends);
  });

 //  app.post("/api/friends", function(req, res) {
	// res.sendFile(path.join(__dirname, "/../public/survey.html"));
 //  })
}