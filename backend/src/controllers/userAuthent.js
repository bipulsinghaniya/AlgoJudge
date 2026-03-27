const redisClient = require("../config/redis");
const User =  require("../models/user")
const validate = require('../utils/validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Submission = require("../models/submission")
const sendEmail = require("../utils/sendEmail");



const register = async (req, res) => {
  try {
    const { firstName, emailId, password } = req.body;

    // 1. Validate
    if (!firstName || !emailId || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // 3. Cooldown check
    const cooldown = await redisClient.get(`otp_cooldown:${emailId}`);
    if (cooldown) {
      return res.status(400).json({
        message: "Wait 30 seconds before retry"
      });
    }

    await redisClient.set(`otp_cooldown:${emailId}`, "1", { EX: 30 });

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 6. Store in Redis
    await redisClient.set(
      `otp:${emailId}`,
      JSON.stringify({
        firstName,
        emailId,
        hashedPassword,
        otp,
      }),
      { EX: 600 }
    );

    console.log("OTP:", otp);

    // 7. Send Email
    await sendEmail({
      email: emailId,
      subject: "Verify your email",
      html: `<h2>Your OTP: ${otp}</h2>`,
    });

    res.status(200).json({
      message: "OTP sent to email"
    });

  } catch (err) {
    res.status(500).json({
      message: "Registration failed"
    });
  }
};


const verifyOTP = async (req, res) => {
  try {
    const { emailId, otp } = req.body;

    // 1. Get data from Redis
    const data = await redisClient.get(`otp:${emailId}`);
    if (!data) {
      return res.status(400).json({
        message: "OTP expired"
      });
    }
    
    const parsedData = JSON.parse(data);
    
    
    
    // 2. Check OTP
    if (parsedData.otp !== otp.toString()) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }
    

    // 3. Create user
    const user = await User.create({
      firstName: parsedData.firstName,
      emailId: parsedData.emailId,
      password: parsedData.hashedPassword,
      role: "user",
    });

    // 4. Generate JWT
    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId, role: "user" },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    // 5. Set cookie
    // res.cookie("token", token, { maxAge: 60 * 60 * 1000 });

  res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 60 * 60 * 1000,
  path: "/"
});

    // 6. Delete OTP from Redis
    await redisClient.del(`otp:${emailId}`);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        firstName: user.firstName,
        emailId: user.emailId,
        _id: user._id,
        role: user.role,
      }
    });

  } catch (err) {
    res.status(500).json({
      message: "OTP verification failed"
    });
  }
};



const login = async (req,res)=>{

    try{
        const {emailId, password} = req.body;

        if(!emailId)
            throw new Error("Invalid Credentials");
        if(!password)
            throw new Error("Invalid Credentials");

        const user = await User.findOne({emailId});

        if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

        const match = await bcrypt.compare(password,user.password);

        if(!match)
            throw new Error("Invalid Credentials");

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role:user.role,
        }

        const token =  jwt.sign({_id:user._id , emailId:emailId, role:user.role},process.env.JWT_KEY,{expiresIn: 60*60});
        // res.cookie('token',token,{maxAge: 60*60*1000});

        res.cookie("token", token, {
  httpOnly: true,
  secure: true, // render
  // secure:false,// localhost
  sameSite: "None", // render
  //  sameSite: "Lax",     // localhost
  maxAge: 60 * 60 * 1000,
  path: "/"
});
        res.status(201).json({
            user:reply,
            message:"Loggin Successfully"
        })
    }
    catch(err){
        // res.status(401).send("Error: "+err);
        res.status(401).json({
  message: "Invalid credentials"
});
    }
}


// logOut feature

// const login = async (req, res) => {
//   try {
//     const { emailId, password } = req.body;

//     if (!emailId || !password) {
//       return res.status(401).json({
//         message: "Invalid credentials"
//       });
//     }

//     const user = await User.findOne({ emailId });

//     if (!user) {
//       return res.status(401).json({
//         message: "Invalid credentials"
//       });
//     }

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(401).json({
//         message: "Invalid credentials"
//       });
//     }

//     const reply = {
//       firstName: user.firstName,
//       emailId: user.emailId,
//       _id: user._id,
//       role: user.role,
//     };

//     const token = jwt.sign(
//       { _id: user._id, emailId, role: user.role },
//       process.env.JWT_KEY,
//       { expiresIn: "1h" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,        // 🔥 change for localhost
//       sameSite: "Lax",      // 🔥 change for localhost
//       maxAge: 60 * 60 * 1000,
//       path: "/"
//     });

//     res.status(200).json({
//       user: reply,
//       message: "Login Successfully"
//     });

//   } catch (err) {
//     res.status(500).json({
//       message: "Server error"
//     });
//   }
// };




const logout = async(req,res)=>{

    try{
        const {token} = req.cookies;
        const payload = jwt.decode(token);


        await redisClient.set(`token:${token}`,'Blocked');
        await redisClient.expireAt(`token:${token}`,payload.exp);
    //    Token add kar dung Redis ke blockList
    //    Cookies ko clear kar dena.....

    // res.cookie("token",null,{expires: new Date(Date.now())});
    res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/"
});
    res.send("Logged Out Succesfully");

    }
    catch(err){
       res.status(503).send("Error: "+err);
    }
}


const adminRegister = async(req,res)=>{
    try{
        // validate the data;
    //   if(req.result.role!='admin')
    //     throw new Error("Invalid Credentials");  
      validate(req.body); 
      const {firstName, emailId, password}  = req.body;

      req.body.password = await bcrypt.hash(password, 10);
    //
    
     const user =  await User.create(req.body);
     const token =  jwt.sign({_id:user._id , emailId:emailId, role:user.role},process.env.JWT_KEY,{expiresIn: 60*60});
    //  res.cookie('token',token,{maxAge: 60*60*1000});
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 60 * 60 * 1000,
  path: "/"
});
     res.status(201).send("User Registered Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

const deleteProfile = async(req,res)=>{
  
    try{
       const userId = req.result._id;
      
    // userSchema delete
    await User.findByIdAndDelete(userId);

    // Submission se bhi delete karo...
    
    // await Submission.deleteMany({userId});
    
    res.status(200).send("Deleted Successfully");

    }
    catch(err){
      
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {register, login,logout,adminRegister,deleteProfile, verifyOTP};