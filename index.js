const express = require("express");
const mongoose = require("mongoose");


const app = express();
const port = 4444;


app.use(express.json())

mongoose.connect("mongodb+srv://chanduchinna6155:Chandu3@cluster0.0rr27kc.mongodb.net/nodeclass?retryWrites=true&w=majority")
.then((req,res) =>
    console.log("db connected...")
)
.catch((err)=>
   console.log(err.message)
   )



app.use(require("./Router/Users"));

app.listen(port,()=>{
    console.log(`server running at ${port}`)
})
