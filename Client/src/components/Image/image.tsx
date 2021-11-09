import React from "react";
import LoginFormComponent from "../Auth/loginform";
import NavigationComponent from "../Navigation/navcomponent";
type proptypes={
    logo:any
    history:any
}
class ImageComponent extends React.Component<proptypes>
{
    render()
    {
        return (
            <body style={{ backgroundImage: `url(${this.props.logo})`,backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",height:'990px' }}>
                <NavigationComponent/>
                <div style={{paddingTop:'50px'}}>
                    <LoginFormComponent history={this.props.history}/>
                </div>
                </body>
        )
    }
}
export default ImageComponent