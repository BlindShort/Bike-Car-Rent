require("dotenv").config();
const express = require("express")

const bodyparser = require("body-parser");
// const dk = require("./db")
const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

app.get("/car",(req,res)=>{
    res.render("car")
})

app.get("/bike",(req,res)=>{
    res.render("bike")
})



app.get("/home",(req,res)=>{
    res.render("home")
})

app.get("/",(req,res)=>{
    res.render("nav")
})

app.get("/About",(req,res)=>{
    res.render("About")
})

app.get("/contect",(req,res)=>{
    res.render("contec")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

const mongoose= require("mongoose");
const { name } = require("ejs");

const db=mongoose.connect(process.env.MONGODB_URL);

const trySchema = mongoose.Schema({
email:"String",
password:"String"
})
const item =mongoose.model("item",trySchema);

app.post("/signup",(req,res)=>{

    const newuser = item({
        email:req.body.email,
        password:req.body.password
    }) 
   newuser.save()
   .then(()=>{
    res.render("home");
   })
   .catch(()=>{
    console.log("Plz enter Correct detials")
   })
})

app.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    item.findOne({email:email})
    .then((founduser)=>{
        if(founduser){
            if(founduser.password === password){
                res.render("home")
            }
            
        }
        
    })
    .catch((error)=>{
        console.log(error);
    })
});

// boooking Selection
app.get("/booking",(req,res)=>{
    res.render("booking")
})
    const  bookingSchema = new mongoose.Schema({
    name:"string",
    email:"string",
    phone:"string",
    bookingdate:"string",
    bookingtime:"string" 
})
        const booking =mongoose.model("booking",bookingSchema);
    
        app.post("/booking",(req,res)=>{
            const newbooking = booking({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                bookingdate:req.body.bookingdate,
                bookingtime:req.body.bookingtime
            })
            newbooking.save()
            .then(()=>{
                res.render("login")
            })
            .catch(()=>{
                console.log("having a errer")
            });
        });
        app.get("/admin",(req,res)=>{
        console.log( booking.find());
        })
       console.log(booking.find());
   
//server section
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`${port} Server Start`);
    
})


