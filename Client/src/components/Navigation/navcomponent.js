import React from 'react'
import {NavLink} from 'react-router-dom'
import isAuthenticated from '../Auth/authservice'
class NavigationComponent extends React.Component
{
    render()
    {
        return(
            <div>
            <nav>
                <ul>
                {!isAuthenticated()&&
                <li>
                      <NavLink to="/login">Login</NavLink>
                </li>
                }
                {!isAuthenticated()&&
                <li>
                    <NavLink to="/signup">SignUp</NavLink>
                </li>
                }
                <li>
                    <NavLink to="/welcome">Welcome</NavLink>
                </li>
                </ul>
            </nav>
            </div>
        
        )
    }
}
export default NavigationComponent
   