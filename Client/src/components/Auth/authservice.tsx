function isAuthenticated():Object{
    var AccessToken:string=localStorage.getItem('user')|| 'null'
    return JSON.parse(AccessToken);
}
export default isAuthenticated
    