const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

//Allowing making of req from frontend to an API
app.use(cors());

//Applying json middleware to enable parsing of info from frontend in json format
app.use(express.json());

//Defining mysql configuration
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "crud",
});

//Acquiring employee's object vars from frontend
app.post("/create", (req, res) =>{
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  //Inserting values to db
  db.query(
      "INSERT INTO employees (name, age, country, position, wage) VALUES(?,?,?,?,?)",
      [name, age, country, position, wage],
      (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Records Inserted Successfully");
        }      
      }
    );

});


app.listen(5001, ()=>{
    console.log("Server running at port 5001")
})