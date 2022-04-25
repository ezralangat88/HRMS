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

    //Querying employees list
    app.get("/employees", (req, res)=>{
        db.query(
            "SELECT * FROM employees",
            (err, result)=>{
                if(err){
                    console.log(error)
                }
                else{
                    res.send(result);
                }
            }
        )
    });
    //Update
    app.put("/employees", (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        const age = req.body.age;
        const country = req.body.country;
        const position = req.body.position;
        const wage = req.body.wage;
        db.query(
          "UPDATE employees SET wage = ? WHERE id = ?",
          [name, age, country, position, wage, id],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      });

      //Delete
      app.delete("/delete/:id", (req, res) => {
        const id = req.params.id;
        db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      });

});


app.listen(5001, ()=>{
    console.log("Server running at port 5001")
})