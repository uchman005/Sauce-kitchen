const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// the middle ware I'm most comfortable with
const port = 3000;
const app = express();
var newFood = String();
var newQuantity = Number();
var newPrice = Number();
var menu;

mongoose.connect("mongodb://localhost:27017/foodDB", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));


const foodSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});

const Food = mongoose.model("food", foodSchema);

app.get("/", (req, res) => {
    Food.find((err, foods)=> {
        if(!err){ foods.forEach((food)=>{
          console.log(food.name);
          });}
      });
//A simple loop that goes over the collection and logs available food
    res.end();
});

app.get("/add", (req, res) => {
    // Route created for Madam Sauce to add new food to her store
  res.send("<form action='/add' method='post'><input type='text' name='newFood' placeholder='add new food'><input type='number' name='newPrice' placeholder='price of food'><input type='number' name='newQuantity' placeholder='No of plates'><button type='submit'>Add</button></form> ");
 });

app.post("/add", (req, res) => {
     newFood = req.body.newFood;
     newPrice = req.body.newPrice;
     newQuantity = req.body.newQuantity;
    
     menu = new Food({
        name: newFood,
        quantity: newQuantity,
        price: newPrice,
    });
    menu.save();
    res.redirect('/');
});

app.get("/order", (req, res) => {
    res.send("<form action='/order' method='post'><input type='text' name='food' placeholder='Food'><input type='number' name='quantity' placeholder='Number of plates'><button type='submit'>Order</button></form>")
});

app.post("/order", (req, res) => {
    let orderedFood = String(req.body.food);
    let orderedQuantity = Number(req.body.quantity);
    let order = {
        food: orderedFood,
        quantity: orderedQuantity
    }
    console.log(order);
    res.redirect("/order");
});

app.listen(port,()=>{
    console.log(`Server is live at port ${port}`);
});