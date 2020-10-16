const express = require("express");
const bodyParser = require("body-parser");
// the middle ware I'm most comfortable with
const port = 3000;

const app = express();

app.get("/", (req, res) => {
    res.send("We are Sauce kitchen");
});






app.listen(port,()=>{
    console.log(`Server is live at port ${port}`);
});