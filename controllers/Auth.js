
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
const age = 1000 * 60 * 60 * 24 * 7;
/**
 * This is register function used to register a new user.
 * @param {*} req - Request body should contain username, email, password, country, phone, desc, isSeller.
 * @param {*} res - Response will be "User has been created."
 * @param {*} next - Throw error based on the user input.
 */
export const register = async (req, res, next) => {
  const {username, email, password} = req.body;
  try {
    const hash = bcrypt.hashSync(password, 5);
    const user = await prisma.user.findFirst({
      where:{
        OR:[
          {username},
          {email}
        ]
      }
    });
    if(user) return res.status(400).send("User already exists!");
    const newUser = await prisma.user.create({
      data:{
        ...req.body,
        password: hash
      }
    }); 
    // await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
/**
 * This is Login Api used to login a user. 
 * @param {*} req - Requests body should contain username and password.
 * @param {*} res - Response will be user information.
 * @param {*} next - Throw error based on the user input
 * @returns - Based on Auth error returns respectivey
 */
export const login = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where:{
        username: req.body.username
      },
      include:{
        posts:true,
        friends:true,
      }
    });
    if (!user) return res.status(400).send("User not found!");
    console.log(user.password, req.body.password);
  
    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) return res.status(400).send("Invalid credentials!");
    const token =jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: age,
    });
    res.cookie("accessToken", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
/**
 * This controller is used to logout a particular user
 * @param {*} req - So for this APi there is no particular given input 
 * @param {*} res - This will logout the user 
 */
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

export const getUser = async (req,res)=>{
  try{
    const user = await prisma.user.findFirst({
      where:{
        id: req.user.id
      }
    });
    res.status(200).send(user);
  }catch(err){
    res.status(500).send(err.message);
  }
}
