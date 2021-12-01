export const checkFunc = (state:any) =>{
    if(state.number===0)
        return false;
    if(state.airline==="")
        return false;
    return true;
}