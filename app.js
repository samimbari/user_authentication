//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

const db = mongoose.connect("mongodb://localhost:27017/profileDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profileId : String,
  address: String
});

const Profile = mongoose.model("Profile", profileSchema);

  app.post("/register", function(req, res) {
    var body = req.body;
    Profile.create(body, function(err) {
      if(!err) {
        res.send(body);
      } else {
        res.send(err);
      }
    });
  });



//SERVER
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("server is up and running...");
});
