import React from "react";
import LoginFormComponent from "../Auth/loginform";
import SignUpFormComponent from "../Auth/signupform";
type proptypes={
    logo:any
    history:any,
    register:Boolean,
    signin:Boolean
}
class ImageComponent extends React.Component<proptypes>
{
    constructor(props:proptypes)
    {
        super(props)
        console.log(this.props)
    }
    render()
    {   
        return (
            <body style={{ backgroundImage: `url(${this.props.logo})`,backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",height:'990px' }}>
                {this.props.signin===true&&<LoginFormComponent history={this.props.history}/>}
                {this.props.signin===false&&<SignUpFormComponent history={this.props.history}/>}
                </body>
        )
    }
}
export default ImageComponent