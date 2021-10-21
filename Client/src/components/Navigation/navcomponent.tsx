import React from 'react'
import {NavLink} from 'react-router-dom'
import {isAuthenticated} from '../Auth/authservice'
class NavigationComponent extends React.Component
{
    render()
    {
        return(
            <div>
            <nav>
                <ul>
                {isAuthenticated()===null&&
                <li>
                      <NavLink to="/login">Login</NavLink>
                </li>
                }
                {isAuthenticated()===null&&
                <li>
                    <NavLink to="/signup">SignUp</NavLink>
                </li>
                }
                <li>
                    <NavLink to="/welcome">Welcome</NavLink>
                </li>
                {isAuthenticated()===null&&
                <li>
                    <NavLink to="/logout">Log Out</NavLink>
                </li>
                }
                </ul>
            </nav>
            </div>
        
        )
    }
}
export default NavigationComponent
   