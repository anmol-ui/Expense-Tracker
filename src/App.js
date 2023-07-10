import './App.css';
import Grid from '@mui/material/Grid';
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import SignIn from './signIn';
import UseShowLogin from './showLogin';
import TabGroup from './tabGroup';
import List from './history';
import Loader from './components/loader';

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
  const {showLogin,setShowLogin} = UseShowLogin();
  const [user_id,setUser_id] = useState(null);
  const elementRef = useRef(null);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const [transactionType,setTransactionType] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [newUser,setNewUser] = useState(false);


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
      console.log(transactions);
    }).catch(err=>{
      console.log("got error",err);
    })
  }

  useEffect(() => {
    if(newUser){
      localStorage.clear();
      localStorage.setItem('token',user_id);
    }
    if(JSON.parse(localStorage.getItem('history'))!==null){
      setTransactions(JSON.parse(localStorage.getItem('history')));
    }
    else{
      if(typeof user_id!=='undefined' && user_id!==null && user_id!==-1){
        console.log(user_id);
        addTransactions();
      }
    }
    if(isLoading){
      document.querySelector('body').style.backgroundColor = '#212121';
      document.querySelector('body').style.display = 'flex';
    }

    const token = localStorage.getItem('token');
    setUser_id(token);
    if(user_id===-1){
      alert("Invalid credentials!");
    }
    else if(user_id!==null && user_id!==-1){
      setShowLogin(false);
      // Storing the token in localStorage
      localStorage.setItem('token',user_id);

      // addTransactions();

      const delay = setTimeout(() => {
        setIsLoading(false);
        document.querySelector('body').style.backgroundColor = '#e5e6ed';
        document.querySelector('body').style.display = 'block';
      }, 2000); // Adjust the duration as needed
      
      if(localStorage.getItem('income')===null && localStorage.getItem('balance')===null && localStorage.getItem('expenses')===null){
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

  let handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {description:desc,amount:amount*transactionType};
    transactions.push(newItem);

    const i = parseFloat(String(income)).toFixed(2);
    const b = parseFloat(String(balance)).toFixed(2);
    const ex = parseFloat(String(expenses)).toFixed(2);
    const n = parseFloat(String(newItem.amount)).toFixed(2);

    localStorage.setItem('history',JSON.stringify(transactions));
    if(newItem.amount>0){
      setIncome((parseFloat(i)+parseFloat(n)).toFixed(2));
      setBalance((parseFloat(b)+parseFloat(n)).toFixed(2));

      localStorage.setItem('income',JSON.stringify((parseFloat(i)+parseFloat(n)).toFixed(2)));
      localStorage.setItem('balance',JSON.stringify((parseFloat(b)+parseFloat(n)).toFixed(2)));
      localStorage.setItem('expenses',JSON.stringify(parseFloat(ex).toFixed(2)));
    }
    else{
      setExpenses((parseFloat(ex)-parseFloat(n)).toFixed(2));
      setBalance((parseFloat(b)+parseFloat(n)).toFixed(2));

      localStorage.setItem('balance',JSON.stringify((parseFloat(b)+parseFloat(n)).toFixed(2)));
      localStorage.setItem('expenses',JSON.stringify((parseFloat(ex)-parseFloat(n)).toFixed(2)));
      localStorage.setItem('income',JSON.stringify(parseFloat(i).toFixed(2)));
    }
  };

  const handleDelete = (index) => {
    const amountToDel = transactions[index].amount;
    transactions.splice(index, 1);
    localStorage.setItem('history',JSON.stringify(transactions));

    const i = parseFloat(String(income)).toFixed(2);
    const b = parseFloat(String(balance)).toFixed(2);
    const e = parseFloat(String(expenses)).toFixed(2);
    const n = parseFloat(String(amountToDel)).toFixed(2);

    if(amountToDel>0){      
      setIncome((parseFloat(i)-parseFloat(n)).toFixed(2));
      setBalance(parseFloat(b)-parseFloat(n).toFixed(2));

      localStorage.setItem('income',(parseFloat(i)-parseFloat(n)).toFixed(2));
      localStorage.setItem('balance',(parseFloat(b)-parseFloat(n)).toFixed(2));
      localStorage.setItem('expenses',parseFloat(e).toFixed(2));
    }
    else{
      setExpenses((parseFloat(e)+parseFloat(n)).toFixed(2));
      setBalance((parseFloat(b)-parseFloat(n)).toFixed(2));

      localStorage.setItem('income',parseFloat(i).toFixed(2));
      localStorage.setItem('balance',(parseFloat(b)-parseFloat(n)).toFixed(2));
      localStorage.setItem('expenses',(parseFloat(e)+parseFloat(n)).toFixed(2));
    }    
  };

  useEffect(() => {
    if(localStorage.getItem('token')!==null && localStorage.getItem('history')!==null){
      console.log("post")
      //send data to backend and add to database
      const data = {user_id:parseInt(localStorage.getItem('token')),income:localStorage.getItem('income'),balance:localStorage.getItem('balance'),expenses:localStorage.getItem('expenses'),transactions:JSON.parse(localStorage.getItem('history'))};
      try {
          axios.post(
                "https://expense-tracker-backend-two.vercel.app/post/",
                 data
            )
            .then((res) => console.log("success, data sent,", res))
            .catch((err) => {
                console.log(err.response);
            });
        } catch (err) {
          console.log(err);
        }
    }
  }, []);
  

  function handleSignOut(){
    localStorage.removeItem('token');
    window.location.reload(true);
  }
  

  return (
    <div className="App">
      <SignIn status={[showLogin,setShowLogin,user_id,setUser_id,elementRef,setNewUser]}></SignIn>
      {isLoading ? (
        <Loader></Loader> //loader set
      ) : (
      <div>
      <h1><span>Expense Tracker</span><button className='signout' onClick={handleSignOut} style={{
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

          <Grid item xs={12} sm={6} style={{marginTop:'2%'}}>
            <h1 style={{marginBottom:"20%"}}>Welcome, {username} !</h1>
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

          <Grid item xs={12} sm={6} style={{marginTop:'3%'}}>
            <h3>Add new transaction</h3>
            <form id="form" onSubmit={handleSubmit}>
              <label>Transaction type</label>
              <TabGroup type={[transactionType,setTransactionType]}></TabGroup>
              <div class="form-control">
                <label for="text">Description</label>
                <input type="text" value={desc} id="text" onChange={(e) => setDesc(e.target.value)} placeholder="Enter description..." />
              </div>
              <div class="form-control">
                <label for="amount">Amount <br/>
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
        <ul id='list' className='list'>
          {transactions.map((transaction, index) => (
            <li className={transaction.amount<0 ? 'minus' : 'plus'} key={index}>
              <span>{transaction.description}</span>
              <span>{transaction.amount}</span>
              <button class="delete-btn" onClick={function(e)  {e.preventDefault(); handleDelete(index)}} ><FontAwesomeIcon icon={faTrashCan} /></button>
            </li>
          ))}
        </ul>

      </div>

      <div class="notification-container" id="notification">
        <p>Please add a description and amount</p>
      </div>
      </div>)}

    </div>
  );
}

export default App;
