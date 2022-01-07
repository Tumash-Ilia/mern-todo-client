import React, { useState, useContext } from "react"
import "./AuthPage.scss"
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from "../../context/AuthContext";


const AuthPage = () => {
    //const history = useNavigate()


    const [form, setForm] = useState({
        email:'',
        password:''
    })

    const {login} = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form)
    }
    
    const registerHandler = async () => {
      try{
        await axios.post('https://todo-tumash.herokuapp.com/api/auth/registration', {...form}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

      }catch (e) {
          console.log(e)
      }
    }
    
    const loginHandler = async () => {
      try{
          await axios.post('https://todo-tumash.herokuapp.com/api/auth/login', {...form}, {
              headers: {
                  'Content-Type': 'application/json'
              }
          })
              .then(response => {
                  login(response.data.token, response.data.userId)
              })
      }catch (e) {
          console.log(e)
      }
    }

    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container">
                        <div className="auth-page">
                           <Route path="/login">
                               <h3>Sign in</h3>
                               <form className="form form-login" onSubmit={e => e.preventDefault()}>
                                   <div className="row">
                                       <div className="input-field col s12">
                                           <input
                                               type="email"
                                               name="email"
                                               className="validate"
                                               onChange={changeHandler}
                                           />
                                           <label htmlFor="email">Email</label>
                                       </div>
                                       <div className="input-field col s12">
                                           <input
                                               type="password"
                                               name="password"
                                               className="validate"
                                               onChange={changeHandler}
                                           />
                                           <label htmlFor="password">Password</label>
                                       </div>
                                   </div>
                                   <div className="row">
                                       <button
                                           className="wawes-effect wawes-light btn blue"
                                           onClick={loginHandler}
                                       >
                                           Sign in
                                       </button>
                                       <Link to="/registration" className="btn-outline btn-reg">No account yet?</Link>
                                   </div>
                               </form>
                           </Route>

                           <Route path="/registration">
                               <h3>Sign up</h3>
                               <form className="form form-login" onSubmit={e => e.preventDefault()}>
                                   <div className="row">
                                       <div className="input-field col s12">
                                           <input
                                               type="email"
                                               name="email"
                                               className="validate"
                                               onChange={changeHandler}
                                           />
                                           <label htmlFor="email">Email</label>
                                       </div>
                                       <div className="input-field col s12">
                                           <input
                                               type="password"
                                               name="password"
                                               className="validate"
                                               onChange={changeHandler}
                                           />
                                           <label htmlFor="password">Password</label>
                                       </div>
                                   </div>
                                   <div className="row">
                                       <button
                                           className="wawes-effect wawes-light btn blue"
                                           onClick={registerHandler}
                                       >
                                           Sign up
                                       </button>

                                       <Link to="/login" className="btn-reg">Already registered? Log In</Link>
                                   </div>
                               </form>
                           </Route>

                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}

export default AuthPage