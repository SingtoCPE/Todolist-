const express = require('express')                               
const bodyParser = require('body-parser');
const mysql = require('mysql')                                    
const db = mysql.createConnection({                               
  host     : 'localhost', 
  user     : 'root',
  password : 'singto11442525',
  database : 'myDB'
})

  db.connect()                                                      
  const app = express()                                            
  app.use(bodyParser.json() );                                  
  app.use(bodyParser.urlencoded({extended: true})); 
//-------------------------------------------------------------------------------
  app.post("/adduser", function(req, res) {     //add more one
    console.log(req.body.length);
    
    var i;
    for (i = 0; i < req.body.length; i++) { 
      var item = req.body[i];
      var id = item.id;
      var name = item.name;
    
      console.log(id, name);
      db.query("INSERT INTO myDB.myTB (id, name) VALUES ('" + id + "', '" + name + "')", function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    
    }
    res.redirect("/");
  })
//-------------------------------------------------------------------------------
app.post("/adduserone", function(req, res) {        //add one by one
  console.log(req.body.length);
  
    var item = req.body;
    var id = item.id;
    var name = item.name;
  
    console.log(id, name);
    db.query("INSERT INTO myDB.myTB (id, name) VALUES ('" + id + "', '" + name + "')", function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  
  
  res.redirect("/");
})

//-------------------------------------------------------------------------------

  app.get('/',(req,res)=> {                        //get all             
    let sql = 'SELECT * FROM myDB.myTB;'                              
    let query = db.query(sql,(err,results) => {                       
      if(err) throw err                                                
      console.log(results)                                             
      res.json(results)                                                
    })
  })
//-------------------------------------------------------------------------------
  app.get('/id/s2',(req,res)=> {                        //get some information           
    let sql = "SELECT * FROM myDB.myTB WHERE id = 's2'"                              
    let query = db.query(sql,(err,results) => {                       
      if(err) throw err                                                
      console.log(results)                                             
      res.json(results)                                                
    })
  })
//-------------------------------------------------------------------------------  
  app.delete('/deluser', function (req, res) {    //delete more one
    
    let sql = `DELETE FROM myDB.myTB WHERE orders between 16 and 30`;
    let query = db.query(sql,(err,results) => {                       
      if(err) throw err                                                
      console.log("1 record deleted");
    });
    res.redirect("/");                                            
  })
//-------------------------------------------------------------------------------

app.put('/updateuser', function (req, res) {        //update
  db.query("UPDATE myDB.myTB SET id='s2.1' WHERE id='s2'", function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
  });
  res.redirect("/");
});

//-------------------------------------------------------------------------------
  app.listen('3000',() => {     //

    console.log('start port 3000')  
  })