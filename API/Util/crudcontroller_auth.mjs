import jwt from 'jsonwebtoken'
export const loginController = model =>async(req,res)=>{
    const result = await model.findOne({
        $and: [
            { email: req.body.email },
            { password:req.body.password}
         ]
    })
    if(!result)
    {
        return res.status(401).json("user not found");
    }
    const payload = {
        user:{
            id:result._id
        }
    }
    console.log(payload)
    jwt.sign(payload,'shhhhh',
    {expiresIn:360000},
    (err,token)=>{
        console.log('error')
        if(err) throw err;
        console.log(token)
        return res.json(token);
    });
}
export const SignupController = model =>async(req,res)=>{
    var email = req.body.email
    console.log(email)
    const result = await model.findOne({email})
    if(result)
    {
        return res.status(401).json("users exist");
    }
    try{
        const data = await model.create({name:req.body.name,password:req.body.password,email:req.body.email});
        res.send('user created')
    }
    catch(e){
        return res.status(404).json({msg:'Email ID Taken'});
    }
}

export const AuthUtilController = model=>({
    loginController:loginController(model),
    SignupController:SignupController(model)
})