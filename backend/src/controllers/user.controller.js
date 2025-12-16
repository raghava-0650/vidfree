import bcrypt from 'bcrypt';
import httpStatus from 'http-status';

import { User } from '../model/user.model';

const login = async(req,res)=>{
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({message: "please provide"})
    }

    try{
        const user = await User.find({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"user not found"})
        }

        if(bcrypt.compare(password, user.password)){
            let token = crypto.randomBytes(20).toStrinig("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token:token })
        } 
    }catch(e){
        return res.status(500).json({message:`something went wrong${e}`});
    }
}

const regester = async(req,res)=>{
    const { name, username, password } = req.body;

    try{
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(httpStatus.FOUND)
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name : name,
            username: username,
            password: hashedpassword
        })

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "user registered" })

    }catch(e){ 
        res.json({ message: `something went wrong ${e}` });
    }
}