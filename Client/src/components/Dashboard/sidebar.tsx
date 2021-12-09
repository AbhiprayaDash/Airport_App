import { FC} from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/sidebar.css'
import { IconContext } from 'react-icons';
import '../../css/toolbar.css'
import '../../css/sidebar.css'
type PropTypes={
  SidebarData:Array<any>
}
export const SideBar:FC<PropTypes> = (props:PropTypes)=>{
  return (
    <>
      <IconContext.Provider value={{ }}>   
              <nav className={'nav-menu active'}>
                <ul className='nav-menu-items'>
                  <h2 style={{paddingLeft:'15%'}}>AirFuel</h2>
                  {props.SidebarData.map((item:any, index:any) => {
                    return (
                      <li key={index} className={item.cName}>
                        <NavLink to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </IconContext.Provider>
    </>
  );
}

export default SideBar;