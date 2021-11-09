export default function check(req,res,next){
    for (const property in req.body) {
        if(req.body[property]==="")
        {
            return res.status(400).send('Input Required');
        }
    }
    next();
}