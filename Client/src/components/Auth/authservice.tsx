function isAuthenticated():Object{
    var AccessToken:string=localStorage.getItem('user')|| 'null'
    console.log(JSON.parse(AccessToken))
    return JSON.parse(AccessToken);
}
export default isAuthenticated
    