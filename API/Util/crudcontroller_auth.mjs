import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const loginController = model =>async(req,res)=>{
    const result = await model.findOne({
        $and: [
            { email: req.body.email },
         ]
    })
    if(!result)
    {
        return res.status(401).json("user not found");
    }
    const isMatch = await bcrypt.compare(req.body.password,result.password);
    if(isMatch===false)
    {
        return res.status(401).json({errors:[{msg:'Invalid Credentials'}]}); 
    }
    const payload = {
        user:{
            id:result._id
        }
    }
    jwt.sign(payload,'shhhhh',
    {expiresIn:360000},
    (err,token)=>{
        if(err) throw err;
        console.log(token)
        return res.json(token);
    });
}
export const SignupController = model =>async(req,res)=>{
    var email = req.body.email
    const result = await model.findOne({email})
    if(result)
    {
        return res.status(400).send("users exist");
    }
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password,salt);
        await model.create({name:req.body.name,password:hashedpassword,email:req.body.email});
        return res.status(200).send('user created')
    }
    catch(e){
        return res.status(404).json({msg:'Error'});
    }
}

export const AuthUtilController = model=>({
    loginController:loginController(model),
    SignupController:SignupController(model)
})