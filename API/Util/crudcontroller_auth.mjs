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
    return res.send('user found')
}
export const SignupController = model =>async(req,res)=>{
    var name = req.body.name
    const result = await model.findOne({name})
    if(result)
    {
        return res.status(401).json("users exist");
    }
    try{
        console.log(name,req.body.email,req.body.password)
        const data = await model.create({name:req.body.name,password:req.body.password,email:req.body.email});
        console.log(data)
        const payload = {
            user:{
                id:data._id
            }
        }
        console.log(payload)
        jwt.sign(payload,'shhhhh',
        {expiresIn:360000},
        (err,token)=>{
            console.log('error')
            if(err) throw err;
            console.log(token)
            res.json({token,data});
        });
    }
    catch(e){
        return res.status(404).json({msg:'Email ID Taken'});
    }
}

export const AuthUtilController = model=>({
    loginController:loginController(model),
    SignupController:SignupController(model)
})