import React, {useContext} from "react"

import './Navbar.scss'
import {AuthContext} from "../../context/AuthContext";


const Navbar = () => {
  const {logout, isLogin} = useContext(AuthContext)

  return (
      <nav>
          <div className="nav-wrapper navbar blue">
              <a href="/" className="brand-logo">MERN ToDo App</a>
              {
                  isLogin
                  ?   <ul id="nav-mobile" className="right hide-on-med-and-down">
                          <li><a href="/" onClick={logout}>Log out</a></li>
                      </ul>
                  :   <ul id="nav-mobile" className="right hide-on-med-and-down">
                          <li><a href="/">Sign in</a></li>
                      </ul>
              }
          </div>
      </nav>
  )
}

export default Navbar