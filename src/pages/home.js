import Grid from '@mui/material/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import UseShowLogin from '../showLogin';
import TabGroup from '../tabGroup';
import { useState,useEffect,useRef } from "react";
import Loader from '../components/loader';

function Home(props){
    const [transactionType,setTransactionType] = useState(1);

    let handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {description:props.data[5],amount:props.data[6]*transactionType};
        props.data[4].push(newItem);
    
        const i = parseFloat(String(props.data[2])).toFixed(2);
        const b = parseFloat(String(props.data[1])).toFixed(2);
        const ex = parseFloat(String(props.data[3])).toFixed(2);
        const n = parseFloat(String(newItem.amount)).toFixed(2);
    
        localStorage.setItem('history',JSON.stringify(props.data[4]));
        if(newItem.amount>0){
          props.func[1]((parseFloat(i)+parseFloat(n)).toFixed(2));
          props.func[0]((parseFloat(b)+parseFloat(n)).toFixed(2));
    
          localStorage.setItem('income',JSON.stringify((parseFloat(i)+parseFloat(n)).toFixed(2)));
          localStorage.setItem('balance',JSON.stringify((parseFloat(b)+parseFloat(n)).toFixed(2)));
          localStorage.setItem('expenses',JSON.stringify(parseFloat(ex).toFixed(2)));
        }
        else{
          props.func[2]((parseFloat(ex)-parseFloat(n)).toFixed(2));
          props.func[0]((parseFloat(b)+parseFloat(n)).toFixed(2));
    
          localStorage.setItem('balance',JSON.stringify((parseFloat(b)+parseFloat(n)).toFixed(2)));
          localStorage.setItem('expenses',JSON.stringify((parseFloat(ex)-parseFloat(n)).toFixed(2)));
          localStorage.setItem('income',JSON.stringify(parseFloat(i).toFixed(2)));
        }
        setTransactionType(1);
        props.func[4]("");
        props.func[3]("");
      };
    
      const handleDelete = async (index) => {
        const amountToDel = props.data[4][index].amount;
        props.data[4].splice(index, 1);
        localStorage.setItem('history',JSON.stringify(props.data[4]));
    
        const i = parseFloat(String(props.data[2])).toFixed(2);
        const b = parseFloat(String(props.data[1])).toFixed(2);
        const e = parseFloat(String(props.data[3])).toFixed(2);
        const n = parseFloat(String(amountToDel)).toFixed(2);
    
        if(amountToDel>0){      
          props.func[1]((parseFloat(i)-parseFloat(n)).toFixed(2));
          props.func[0](parseFloat(b)-parseFloat(n).toFixed(2));
    
          localStorage.setItem('income',(parseFloat(i)-parseFloat(n)).toFixed(2));
          localStorage.setItem('balance',(parseFloat(b)-parseFloat(n)).toFixed(2));
          localStorage.setItem('expenses',parseFloat(e).toFixed(2));
        }
        else{
          props.func[2]((parseFloat(e)+parseFloat(n)).toFixed(2));
          props.func[0]((parseFloat(b)-parseFloat(n)).toFixed(2));
    
          localStorage.setItem('income',parseFloat(i).toFixed(2));
          localStorage.setItem('balance',(parseFloat(b)-parseFloat(n)).toFixed(2));
          localStorage.setItem('expenses',(parseFloat(e)+parseFloat(n)).toFixed(2));
        }    
      };
    
    return (
        <div>
        {props.data[8] ? (
                <div></div>
                ) : (
            <div>
            <div class={props.data[7]?"no-container":"container"}>
                <Grid container spacing={10}>

                <Grid item xs={12} sm={6} style={{marginTop:'2%'}}>
                    <h1 style={{marginBottom:"13%",marginTop:'9%'}}>Welcome {props.data[0]} !</h1>
                    <div class="header">
                    <img src="https://i.ibb.co/jfScDTC/budget.png" alt="Expense Tracker"/>
                    <div class="balance-container">
                        <h2>Your Balance</h2>
                        <h2 id="balance" class="balance">₹{props.data[1]}</h2>
                    </div>
                    </div>
                    <div class="inc-exp-container">
                    <div>
                        <h4>Income</h4>
                        <p id="money-plus" class="money plus">+₹{props.data[2]}</p>
                    </div>
                    <div>
                        <h4>Expenses</h4>
                        <p id="money-minus" class="money minus">-₹{props.data[3]}</p>
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
                        <input type="text" value={props.data[5]} id="text" onChange={(e) => props.func[3](e.target.value)} placeholder="Enter description..." />
                    </div>
                    <div class="form-control">
                        <label for="amount">Amount <br/>
                        </label>
                        <input type="number" value={props.data[6]} id="amount" onChange={(e) => props.func[4](e.target.value)} placeholder="Enter amount..." />
                    </div>
                    <button class="btn">Add transaction</button>
                    </form>
                </Grid>

                </Grid>

            </div>

            <div className= {props.data[7]?'no-history':'history'}>
                <h3>History</h3>
                <ul id='list' className='list'>
                {props.data[4].map((transaction, index) => (
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

export default Home;