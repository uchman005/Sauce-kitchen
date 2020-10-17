const express = require("express");
const bodyParser = require("body-parser");
// the middle ware I'm most comfortable with
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

let foodDisplayArr = ["Rice", "Beans", "Akpu", "Okpa"];
// this is the array from which Sauce displays available food
app.get("/", (req, res) => {
foodDisplayArr.forEach((food)=>{
    console.log(food);
//A simple loop that goes over the display array and logs available food
});
    

res.end();

});

app.get("/add", (req, res) => {
    // Route created for Madam Sauce to add new food to her store
  res.send("<form action='/add' method='post'><input type='text' name='newFood' placeholder='add new food'><input type='number' name='newPrice' placeholder='price of food'><input type='number' name='newQuantity' placeholder='No of plates'><button type='submit'>Add</button></form> ");
 });

app.post("/add", (req, res) => {
    let newFood = req.body.newFood;
    let newPrice = Number(req.body.newPrice);
    let newQuantity = Number(req.body.newQuantity);
 
    foodDisplayArr.push(newFood);
    res.redirect('/');
  
});


app.listen(port,()=>{
    console.log(`Server is live at port ${port}`);
});