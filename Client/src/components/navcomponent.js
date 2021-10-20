import React from 'react'
import {NavLink} from 'react-router-dom'
class NavigationComponent extends React.Component
{
    render()
    {
        return(
            <div>
            <nav>
                <ul>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">SignUp</NavLink>
                </li>
                </ul>
            </nav>
            </div>
        )
    }
}
export default NavigationComponent
   