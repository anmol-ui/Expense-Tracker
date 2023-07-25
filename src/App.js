import './App.css';
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import SignIn from './signIn';
import List from './history';
import Loader from './components/loader';
import Charts from './pages/charts';
import Settings from './pages/settings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './pages/home';
import UseShowLogin from './showLogin';
import Footer from './components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown,faCaretDown } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [income,setIncome] = useState(null);
  const [expenses,setExpenses] = useState(null);
  const [balance,setBalance] = useState(null);
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const [username,setUsername] = useState(null);
  const [transactions,setTransactions] = useState([]);
  const [user_id,setUser_id] = useState(null);
  const elementRef = useRef(null);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const [isLoading, setIsLoading] = useState(true);
  const [newUser,setNewUser] = useState(false);
  const [toggle,setToggle] = useState(false);
  const {showLogin,setShowLogin} = UseShowLogin();
  const [isOpen,setIsOpen] = useState(false);

  const services = ['Stocks','Cryptocurrency','Mutual Funds']
  const services_url = ['stocks','crypto','mfs']
  
  function addTransactions(){
    //Add transactions while initialization
    axios({
      method : "GET",
      headers:{ "Access-Control-Allow-Origin": "https://expense-tracker-backend-two.vercel.app/"},
      params : {id: user_id},
      url: `https://expense-tracker-backend-two.vercel.app/transactions`
    }).then(res=>{
      // console.log(res.data);
      //add this data to UI
      setTransactions(res.data);
    }).catch(err=>{
      console.log("got error",err);
    })
  }

  useEffect(() => {
    if(newUser){
      localStorage.clear();
      localStorage.setItem('token',user_id);
    }
    if(localStorage.getItem('token')!==null && JSON.parse(localStorage.getItem('history'))!==null){
      setTransactions(JSON.parse(localStorage.getItem('history')));
    }
    else{
      if(typeof user_id!=='undefined' && user_id!==null && user_id!==-1){
        addTransactions();
      }
    }
    if(isLoading){
      document.querySelector('body').style.backgroundColor = '#212121';
      document.querySelector('body').style.display = 'flex';
    }

    const token = localStorage.getItem('token');
    setUser_id(token);
    console.log(user_id);
    if(user_id===-1){
      alert("Invalid credentials!");
    }
    else if(user_id!==null && user_id!==-1){
      setShowLogin(false);
      console.log(showLogin);
      // Storing the token in localStorage
      localStorage.setItem('token',user_id);

      // addTransactions();

      const delay = setTimeout(() => {
        setIsLoading(false);
        document.querySelector('body').style.backgroundColor = '#e5e6ed';
        document.querySelector('body').style.display = 'block';
      }, 2000); // Adjust the duration as needed
      
      if(localStorage.getItem('token')===null || localStorage.getItem('balance')===null){
        axios({
          method : "GET",
          headers:{ "Access-Control-Allow-Origin": "https://expense-tracker-backend-two.vercel.app/"},
          params : {id: user_id},
          url: `https://expense-tracker-backend-two.vercel.app/account`
        }).then(res=>{
          //add this data to UI
          if(user_id!==-1){
            setIncome(parseFloat(String(res.data.income)).toFixed(2));
            setExpenses(parseFloat(String(res.data.expenses)).toFixed(2));
            setBalance(parseFloat(String(res.data.balance)).toFixed(2));
            setEmail(res.data.email);
            setPassword(res.data.password);
            setUsername(res.data.name);
            localStorage.setItem('username',res.data.name);
          }        
        }).catch(err=>{
          console.log("got error",err);
        })
      }
      else{
        console.log('here')
        setIncome(JSON.parse(localStorage.getItem('income')));
        setBalance(JSON.parse(localStorage.getItem('balance')));
        setExpenses(JSON.parse(localStorage.getItem('expenses')));
        setUsername(localStorage.getItem('username'));
      }
    } 
    return () => {
      clearTimeout(delay);
    };
    
  },[user_id,email]);

  // useEffect(() => {
  //   if(localStorage.getItem('token')!==null && localStorage.getItem('history')!==null){
  //     console.log("post")
  //     //send data to backend and add to database
      
  //   }
  // }, []);
  

  function handleSignOut(){
    localStorage.clear();
    window.location.reload(true);
    window.location.href = '/home';
  }
  
  function handleDropDown(){
    console.log('drop')
    if(isOpen){
      setIsOpen(false);
    }
    else{
      setIsOpen(true);
    }
  };

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home data={[username,balance,income,expenses,transactions,desc,amount,showLogin,isLoading]} func={[setBalance,setIncome,setExpenses,setDesc,setAmount]}></Home>} />
          <Route path="/home" element={<Home data={[username,balance,income,expenses,transactions,desc,amount,showLogin,isLoading]} func={[setBalance,setIncome,setExpenses,setDesc,setAmount]}></Home>} />
          <Route path="/stocks" element={<Charts></Charts>} />
          <Route path="/settings" element={<Settings></Settings>} />
        </Routes>
      <SignIn status={[showLogin,setShowLogin,user_id,setUser_id,elementRef,setNewUser]}></SignIn>
      {isLoading ? (
        <Loader></Loader> //loader set
      ) : (
      <div>
      <nav class="navbar-container">
        <div class="logo-container">
            <a href="">Expense Tracker</a>
        </div>

        <div className="bars" onClick={()=>{
          if(toggle === true){
            document.querySelector('.nav-items').style.top = '8%';
            document.querySelector('.nav-items').style.right = '-105%';
            setToggle(false);
          }
          else{
            document.querySelector('.nav-items').style.top = '54px';
            document.querySelector('.nav-items').style.right = '0';
            setToggle(true);
          }
        }}>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>

        <ul class="nav-items">
            <li class="nav-link l1"><a href="#"><Link to="/home">Home</Link></a></li>
            <li style={{width:'11%'}} id={isOpen ? "dropdown-active":"dropdown"} class="nav-link l2" onClick={handleDropDown}><a href="#"><span style={{marginRight:'7%'}}>Services</span><FontAwesomeIcon icon={faCaretDown} /> </a>
            <div className='dropdown-items'>
              {services.map((service,index)=>(
                <div className='dropdown-item' key={index}><Link onMouseOver={(e)=>{e.target.style.color = 'black'}} onMouseOut={(e)=>{e.target.style.color = 'white'}}  to={"/"+services_url[index]}>{service}</Link></div>
              ))}
              </div>
            </li>
            <li id={isOpen ? "dropdown-active":"dropdown"} class="nav-link l3"><a href="#"><Link to="/settings">Settings</Link></a></li>
            <div class="login-register">
                <a href="#" class="signout button" onClick={handleSignOut}>Sign out</a>
            </div>
        </ul>
      </nav>
      <Footer></Footer>
      </div>)}
    </div>
  );
}

export default App;
