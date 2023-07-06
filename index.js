const express = require("express");
const  mysql = require("mysql");
const cors = require("cors");
const localStorage = require("localStorage");
const app = express();

const db= mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"root123",
    database:"loginuser"
})


app.use(express.json());
app.use(cors());
app.post('/registers',(req,res)=>{

    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email

    console.log(username);
    console.log(password);
    console.log(email);


    db.query('INSERT INTO loginuser.new_users (USERNAME,EMAIL,PASSWORD) VALUES (?,?,?)',[username,email,password],(err,result)=>{
        console.log(err);
        if(err)
        {
        res.send({err:err})
        }
        console.log(result);
            if(result.affectedRows>0)
            {
                res.send({message:'Registed sucessfully'});
            }
            else
            {
                res.send({message:'Not Resgister'});
            }
    })
})


app.post('/login',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password

    console.log(username);
    console.log(password);

    db.query('SELECT * FROM loginuser.new_users WHERE USERNAME = ? AND PASSWORD = ?',[username,password],(err,result)=>{
        
        if(err)
        {
        res.send({err:err})
        }
        console.log(result);
            if(result.length>0)
            {
                res.send({message:'logged in sucessfully'});
            }
            else
            {
                res.send({message:'inncorrect name and password'});
            }
    })

})


app.listen(3001,()=>
{
    console.log("server started");
});