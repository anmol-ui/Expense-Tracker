import './App.css';
import Grid from '@mui/material/Grid';
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import SignIn from './signIn';
import UseShowLogin from './showLogin';

function App() {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [income,setIncome] = useState(null);
  const [expenses,setExpenses] = useState(null);
  const [balance,setBalance] = useState(null);
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const [transactions,setTransactions] = useState(null);
  const [delID,setDelID] = useState(null);
  const {showLogin,setShowLogin} = UseShowLogin();
  const [user_id,setUser_id] = useState(null);
  const elementRef = useRef(null);

  function addTransactions(){
    //Add transactions while initialization
    axios({
      method : "GET",
      params : {id: user_id},
      url: `http://localhost:3001/transactions`
    }).then(res=>{
      // console.log(res.data);
      //add this data to UI
      setTransactions(res.data);
    }).catch(err=>{
      console.log("got error",err);
    })
  }

  useEffect(() => {
    // Update the income,expenses and balance using Account api    
    // if(loginData!=null){
    //   setIncome(loginData.income);
    //   setExpenses(loginData.expenses);
    //   setBalance(loginData.balance);
    // }
    const lastKey = localStorage.key(localStorage.length - 1);
    if(lastKey!=null){
      const lastValue = JSON.parse(localStorage.getItem(lastKey));
      const local_id = lastValue[0];
      const local_authKey = lastValue[1]; //password
      if(document.querySelector(".active")!=null){
        console.log("quick")
        document.querySelector(".active").style.display='None';
      }
      setUser_id(local_id);
      setEmail(lastKey);
      setPassword(local_authKey);
    }
    if(user_id===-1){
      alert("Invalid credentials!");
    }
    else if(user_id!==null && user_id!==-1){
      setShowLogin(false);
      // Storing the token in localStorage
      localStorage.setItem(email,JSON.stringify([user_id,password]));
      addTransactions();
    }

    if(user_id!=null && user_id!==-1){
      axios({
        method : "GET",
        params : {id: user_id},
        url: `http://localhost:3001/account`
      }).then(res=>{
        // console.log(res.data);
        //add this data to UI
        if(user_id!==-1){
          setIncome(res.data.income);
          setExpenses(res.data.expenses);
          setBalance(res.data.balance);
          setEmail(res.data.email);
          setPassword(res.data.password);
        }
        // setTransactions(res.data);
      }).catch(err=>{
        console.log("got error",err);
      })
    }

    // addTransactions();
  },[user_id,income,expenses,balance,email]);

  let handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      axios.post(
            "http://localhost:3001/post/",
            { description: desc , amount: amount, user_id: user_id }
        )
        .then((res) => console.log("success, dictionary sent,", res))
        .catch((err) => {
            console.log(err.response);
        });
    } catch (err) {
      console.log(err);
    }
    if(user_id!==null && user_id!==-1){
      axios({
        method :"GET",
        params : {id: user_id},
        url : `http://localhost:3001/account`  
        
      }).then(res=>{
      console.log('got account data',res.data);
      }).catch(err=>{
        console.log('error got',err);
      })

      axios({
        method :"GET",
        params : {id: user_id},
        url : `http://localhost:3001/transactions`  
      }).then(res=>{
        setTransactions(res.data);
      }).catch(err=>{
        console.log('error got',err);
      })
      addTransactions();
    }
  };

  useEffect(() => {
    if (delID !== null) {
      handleButtonClick();
      try {
        axios.post(
              "http://localhost:3001/delete/",
              { id: delID, user_id: user_id}
          )
          .then((res) => console.log("success, delete ID sent,", res))
          .catch((err) => {
              console.log(err.response);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [delID]);

  const handleButtonClick = () => {
    console.log('Button ID:', delID);
    window.location.reload(true);
  };

  function handleSignOut(){
    localStorage.clear();
    window.location.reload(true);
  }

  return (
    <div className="App">
      <SignIn status={[showLogin,setShowLogin,user_id,setUser_id,elementRef]}></SignIn>
      <h1><span>Expense Tracker</span><button onClick={handleSignOut} style={{
        display:'flex',
        float:'right',
        marginTop:'0.8%',
        backgroundColor: '#f44336',
        color: '#ffffff',
        padding: '6px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }} >Sign out</button></h1>
      <div class={showLogin?"no-container":"container"}>

        <Grid container spacing={10}>

          <Grid item xs={6} style={{marginTop:'10%'}}>
            <div class="header">
            <img src="https://i.ibb.co/jfScDTC/budget.png" alt="Expense Tracker"/>
              <div class="balance-container">
                <h2>Your Balance</h2>
                <h2 id="balance" class="balance">₹{balance}</h2>
              </div>
            </div>
            <div class="inc-exp-container">
              <div>
                <h4>Income</h4>
                <p id="money-plus" class="money plus">+₹{income}</p>
              </div>
              <div>
                <h4>Expenses</h4>
                <p id="money-minus" class="money minus">-₹{expenses}</p>
              </div>
            </div>
            
          </Grid>

          <Grid item xs={6} style={{marginTop:'10%'}}>
            <h3>Add new transaction</h3>
            <form id="form" onSubmit={handleSubmit}>
              <div class="form-control">
                <label for="text">Description</label>
                <input type="text" value={desc} id="text" onChange={(e) => setDesc(e.target.value)} placeholder="Enter description..." />
              </div>
              <div class="form-control">
                <label for="amount">Amount <br/>
                  <small>(-100 = expense, 100 = income)</small>
                </label>
                <input type="number" value={amount} id="amount" onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
              </div>
              <button class="btn">Add transaction</button>
            </form>
          </Grid>

        </Grid>

      </div>
      
      <div className= {showLogin?'no-history':'history'}>
        <h3>History</h3>
        <ul id="list" class="list">
          {transactions!=null && transactions.map(function(transaction, i){
            return <li className={transaction.amount<0 ? 'minus' : 'plus'} key={transaction.id}>{transaction.text} <span>{transaction.amount}</span><button class="delete-btn" onClick={function(e)  { setDelID(transaction.id)}} ><FontAwesomeIcon icon={faTrashCan} /></button></li>;
          })}
        </ul>
      </div>

      <div class="notification-container" id="notification">
        <p>Please add a description and amount</p>
      </div>

    </div>
  );
}

export default App;
