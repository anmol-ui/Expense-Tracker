import Grid from '@mui/material/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import UseShowLogin from '../showLogin';
import TabGroup from '../tabGroup';
import { useState,useEffect,useRef } from "react";
import Loader from '../components/loader';
import './home.css';
import axios from "axios";

function Home(props){
    const [transactionType,setTransactionType] = useState(1);
    const [saveButton,setSaveButton] = useState({status:false,text:"Save",class:''});
    const [popUp,setPopUp] = useState(false); 

    let handleSubmit = async (e) => {
        e.preventDefault();
        let last_id;
        if(localStorage.getItem('history')!==null){
            last_id = (JSON.parse(localStorage.getItem('history'))[JSON.parse(localStorage.getItem('history')).length-1].id);
        }
        else{
            // last_id = -1;
            if(props.data[4].length>0){
                last_id = (props.data[4][props.data[4].length-1].id);
            }
            else{
                last_id = -1;
            }
        }
        const newItem = {id:last_id+1,description:props.data[5],amount:props.data[6]*transactionType};
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
        props.func[4]("");
        props.func[3]("");

        setSaveButton({status:false,text:"Save",class:''});
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
        
        setSaveButton({status:false,text:"Save",class:''});
      };
    
    function handleSave(){
        
        setSaveButton({status:true,text:String.fromCharCode('10003'),class:'checked'});
        const data = {user_id:parseInt(localStorage.getItem('token')),income:localStorage.getItem('income'),balance:localStorage.getItem('balance'),expenses:localStorage.getItem('expenses'),transactions:JSON.parse(localStorage.getItem('history'))};
        try {
          axios.post(
                "https://expense-tracker-backend-two.vercel.app/post",
                 data
            )
            .then((res) => {console.log("success, data sent,", res)
                setPopUp(true);
                setTimeout(() => {
                    setPopUp(false);
                }, 3000);
            })
            .catch((err) => {
                console.log(err.response);
            });
        } catch (err) {
          console.log(err);
        }
    }
    
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

            <div className="row" style={{marginBottom:'3rem'}}>
                <div className="col-12 text-center" style={{display:'flex',justifyContent:'center'}}>
                    <button className="btn" style={{width:'6rem'}} onClick={handleSave}>{saveButton.text}</button>
                </div>
            </div>
            {popUp?<div className="popup">Saved Successfully</div>:null}

        </div>)}
        </div>
    );
}

export default Home;