import React,{ CSSProperties } from "react";
import logo from '../../tim-gouw-OwD1ON8O-O4-unsplash.jpg'
type proptypes={

}
type statetypes={

}
class ImageComponent extends React.Component<proptypes,statetypes>
{
    constructor(prop:proptypes)
    {
        super(prop)
    }
    render()
    {
        const mystyle:CSSProperties = {
            height: "913px",
            width:"1845px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative"
          }as React.CSSProperties;;
        return (
            <img src={logo} style={mystyle}/>
        )
    }
}
export default ImageComponent