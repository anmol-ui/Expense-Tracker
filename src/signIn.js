import './App.css';
import { useState,useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import UseShowLogin from './showLogin';

function SignIn(props){
    const {showLogin,setShowLogin} = UseShowLogin();
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showSignup,setShowSignup] = useState(false);

    function handleSubmit(){
        //some work
        // setShowLogin(false);
        if(email.length>4){
            if(password.length>4){

                //Register the User into database
                if(showSignup){
                    if(username.length>0){
                        try {
                            axios.post(
                                  "http://localhost:3001/register/",
                                  { username: username , email: email, password: password }
                              )
                              .then((res) => props.status[3](res.data.id))
                              .catch((err) => {
                                  console.log(err.response);
                              });
                          } catch (err) {
                            console.log(err);
                          }
                    }
                    else{
                        alert("Please enter full name");
                    }
                }
                //Verify details and login
                else if(showLogin){
                    try {
                        axios.post(
                              "http://localhost:3001/verify/",
                              { email: email, password: password }
                          )
                          .then((res) => props.status[3](res.data.id))
                          .catch((err) => {
                              console.log(err.response);
                          });
                      } catch (err) {
                        console.log(err);
                      }
                    //   if(props.status[2]!==null && props.status[2].id===-1){
                    //     alert("Invalid Credentials!");
                    //     props.status[1](true);
                    //   }
                    //   else{
                    //     props.status[1](false);
                    //   }
                }
                else{
                    alert("System error, please try again later");
                }
            }
            else{
                alert("Password must contain minimum 5 characters");
            }
        }
        else{
            alert("Please enter a valid email address");
        }
        console.log("Login Screen status: ",showLogin);
    }
    
    return (
        <div ref={props.status[4]} className={props.status[0]?"active":"inactive"}>
            <div className='login-form'>
                <div className='form-box solid'>
                    <form>
                        <h1 className='login-text'>{showSignup?'Register':'Sign In'}</h1>
                        {showSignup ? <div><label>Name</label><input type='text' name='username' className='login-box' onChange={(e) => setUsername(e.target.value)} placeholder='Enter Full Name'></input></div>:""}
                        <label>Email</label><br></br>
                        <input type='text' name='email' className='login-box' onChange={(e) => setEmail(e.target.value)} placeholder='abc@example.com'></input><br></br>
                        <lablel>Password</lablel><br></br>
                        <input type='password' name='password' className='login-box' onChange={(e) => setPassword(e.target.value)} ></input><br></br>
                        <input type='submit' value={showSignup?"SIGN UP":"LOGIN"} className='login-btn' onClick={function (e) {e.preventDefault(); handleSubmit();}}></input>
                    </form>
                    <a style={{textDecoration:"None",marginTop:'5%',fontSize:'82%'}} href='' onClick={(e) => {e.preventDefault(); showSignup? setShowSignup(false) : setShowSignup(true);}}>{showSignup? "Already have an account? Sign In" :  "Don't have an account? Sign Up"}</a>
                </div>
            </div>
        </div>
    );
};

export default SignIn;