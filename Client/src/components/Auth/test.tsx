import React,{Fragment} from 'react'
class Test extends React.Component{
    testfunc(){
        return "logged my function"
    }
    render(){
        
        console.log(this.testfunc())
        return(
            <Fragment>
            <h1>Welcome</h1>
            <h2>{this.testfunc()}</h2>
            </Fragment>
        )
    }
}
export default Test