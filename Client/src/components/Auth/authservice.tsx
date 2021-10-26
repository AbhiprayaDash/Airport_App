import axios from "axios";
export function isAuthenticated():Object{
    var AccessToken:string=localStorage.getItem('user')|| 'null'
    return JSON.parse(AccessToken);
}
export async function postlogindata(reqbody:Object):Promise<any>{
    console.log('post')
    console.log(reqbody)
    const response = await axios.post('http://localhost:9000/user/signin',reqbody)
    console.log('user loggged in');
    const Accesstoken = response.data
    if(Accesstoken)
    {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
}
    