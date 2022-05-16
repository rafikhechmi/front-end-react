import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { Button } from '@material-ui/core'
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Navbar( {userName, logOutUser} ) {
  const [sidebar, setSidebar] = useState(false);

  const history = useHistory();

  const showSidebar = () => setSidebar(!sidebar);

  const logout=()=>{
    logOutUser();
    history.push('/login');
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
         <div style={{ marginRight:'100px', color:'white'}}>
            UserName:{' '}{ userName }
            <Button style={{ marginLeft:'50px'}}color='primary' variant="contained" onClick={logout}>LogOut</Button>
          </div>
        </div>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
const mapStateProps = state =>{
  return{
      userName:state.auth.userName,
  }
}
const mapDispatchToProps = dispatch=>{
  return{
      logOutUser:()=>{
          dispatch({ type:'logout'})
      }
  }
}
export default connect(mapStateProps, mapDispatchToProps)(Navbar);