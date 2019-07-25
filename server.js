const express = require('express')                                // เรียกใช้ Express
const bodyParser = require('body-parser');
const mysql = require('mysql')                                    // เรียกใช้ mysql
const db = mysql.createConnection({                               // config ค่าการเชื่อมต่อฐานข้อมูล
  host     : 'localhost', 
  user     : 'root',
  password : 'singto11442525',
  database : 'myDB'
})

db.connect()                                                      // เชื่อมต่อฐานข้อมูล
const app = express()                                             // สร้าง Object เก็บไว้ในตัวแปร app เพื่อนำไปใช้งาน
// Select Data
    app.use(bodyParser.json() );                                  // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({                               // to support URL-encoded bodies
      extended: true
    })); 

    app.post("/adduser", function(req, res) {
    // get data from forms and add to the table called user..
      var id = req.body.id;
      var name = req.body.name;
      console.log(id, name);
      db.query("INSERT INTO myDB.myTB (id, name) VALUES ('" + id + "', '" + name + "')", function (err, result) {
        if (err) throw err;
      console.log("1 record inserted");
      });
      res.redirect("/");
    })

app.get('/',(req,res)=> {                                     // Router เวลาเรียกใช้งาน
  let sql = 'SELECT * FROM myDB.myTB;'                              // คำสั่ง sql
  let query = db.query(sql,(err,results) => {                       // สั่ง Query คำสั่ง sql
    if(err) throw err                                                 // ดัก error
  console.log(results)                                              // แสดงผล บน Console 
  res.json(results)                                                 // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
app.listen('3000',() => {     //
console.log('start port 3000')  
})