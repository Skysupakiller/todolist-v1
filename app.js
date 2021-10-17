//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({ // this to be written after the app=express():
  extended: true
}));
app.use(express.static("public")); //to add image or css

app.set("view engine", "ejs"); // to set up ejs

app.get("/", function(req, res) {

  //module return valure here
  const day = date.getDate();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});


app.post("/", function(req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});


app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
})