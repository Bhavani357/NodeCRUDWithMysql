const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Ydurga232bhavani@",
    database:"humancloud"
})

con.connect(function(err){
    if(err) throw err;
    console.log("Connected");
    
    // const sql = "CREATE TABLE address (id not null autoincrement,lane VARCHAR(255),country VARCHAR(255),city VARCHAR(255),pincode VARCHAR(20),updated_on date, primary key (id))";
    // const sql = "SELECT * FROM customer"
    // con.query(sql, (error,data)=>{
    //     if (error) throw err;
    //     console.log(data);
    // })
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/customers/:id', (req,res)=>{
    const customerId = req.params.id;
    const sql =`select * from customer where id=${customerId}`;
    // const customer = await con.get(sql)
    // res.send(customer)
    con.query(sql, (error,data)=>{
        if (error) throw err;
        res.send(data);
    })
})


app.get('/customers/', (req,res)=>{
    
    const sql ="select * from customer";
    
    
    con.query(sql,[], (error,data)=>{
        if (error) throw err;
        
        res.send(data);
    })
    
})
app.put('/customers/:id', (req,res)=>{
    const customerId = req.params.id;
    const {name,age,phone,email,updated_on,address_id} = req.body;
    const updatecustomerQuery = `UPDATE customer SET name = ?, age=?,phone=?,email=?,updated_on=?,address_id=? WHERE id=?`;

    con.query(updatecustomerQuery,[name,age,phone,email,updated_on,address_id,customerId], (err,result)=>{
        if(err) throw err;
        res.send('Customer updated successfully');
    })
})

app.delete('/customers/:id', (req,res)=>{
    const customerId = req.params.id;
    console.log(customerId)
    const deleteCustomerQuery = `DELETE FROM customer WHERE id=${customerId}`;

    con.query(deleteCustomerQuery,(err,result)=>{
        if(err) throw err;
        res.send("Customer deleted successfully");
    })
})

app.post("/customers/", (req,res)=>{
    console.log(req.body)

    const {name,age,phone,email,created_on,updated_on,address_id}=req.body;
    console.log(name)
    const insertQuery = `INSERT INTO customer (name,age,phone,email,created_on,updated_on, address_id) VALUES (?,?,?,?,?,?,?)`;

    con.query(insertQuery,[name,age,phone,email,created_on,updated_on,address_id],(err,result)=>{
        if(err) throw err;
        res.send("Customer added successfully");
    })
})
app.listen(3000, ()=>{
    console.log("Listening....")
})