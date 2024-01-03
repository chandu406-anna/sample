const express = require("express");
const Users = require("../DB/users")

const router = express.Router();

router.post('/posting', async (req, res) => {
  try {
    const email = req.body.email;
  
    const findemail = await Users.findOne({ email: email });

    if (findemail) {
      return res.status(402).json({ message: "user already exist..." });
    }

    const newuser = {
      name: req.body.name,
      email: req.body.email,
      contactnumber: req.body.contactnumber,
      password: req.body.password,
    };

    const create = await users.create(newuser);
    return res.status(200).json({ message: "user created successfully..." });
  } 
  catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
router.get("/get",async(req,res)=>{
  try{
    const getdetails = await users.find();
    return res.status(200).json(getdetails)
  }
  catch(err){
    return res.status(500).json({mesaage:err.message})
  }
})


router.get("/get/:email",async(req,res)=>{
  try{
        const {email} = req.params;
        const getdetails = await users.findOne({email : email})
        return res.status(200).json(getdetails);
  }
  catch(err){
    return res.status(500).json({mesaage:err.message})
  }
})


router.delete("/delete/:email",async(req,res)=>{
  try{
        const {email} = req.params;
        const deletedetails = await Users.findOneAndDelete({email : email})
        return res.status(200).json({message:"user deleted successfully"});
  }
  catch(err){
    return res.status(500).json({mesaage:err.message})
  }
})

router.put("/update/:email/" , async(req,res)=>{
  try{
      const {email} = req.params;
      console.log(email)
      const findemail = await Users.findOne({ email: email });
      if (!findemail) {
        return res.status(404).json({ message: "user not found..." });
      }
      console.log("emailllkj")

      const updateUser = {
        name: req.body.name,
        // email: req.body.email,
        contactnumber: req.body.contactnumber,
        password: req.body.password,
      };

      const upUsers = await Users.findOneAndUpdate({email : email} , updateUser)
      return res.status(200).json({ message: "user updated successfully...",upUsers});

  }
  catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

module.exports = router;
