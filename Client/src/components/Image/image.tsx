import React,{ CSSProperties } from "react";
type proptypes={
    logo:any
}
type statetypes={

}
class ImageComponent extends React.Component<proptypes,statetypes>
{
    render()
    {
        const mystyle:CSSProperties = {
            height: "913px",
            width:"1845px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative"
        } as React.CSSProperties;;
        return (
            <img src={this.props.logo} style={mystyle} alt="background"/>
        )
    }
}
export default ImageComponent