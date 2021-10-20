import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

class WelcomeComponent extends React.Component{
    render()
    {
        return(
            <Fragment>
            <div>
            <nav>
                <ul>
                <li>
                    <NavLink to="/airport">Airport</NavLink>
                </li>
                <li>
                    <NavLink to="/aircraft">Aircraft</NavLink>
                </li>
                </ul>
            </nav>
            </div>
            </Fragment>
        )
    }
}
export default WelcomeComponent