import './settings.css';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Settings() {

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [url,setUrl] = useState("");
    const [street,setStreet] = useState("");
    const [city,setCity] = useState("");
    const [state,setState] = useState("");
    const [code,setCode] = useState("");
    const [phone,setPhone] = useState("");

    useEffect(() => {
        axios({
            method : "GET",
            headers:{ "Access-Control-Allow-Origin": "http://localhost:4000/"},
            params : {id: localStorage.getItem('token')},
            url: `http://localhost:4000/user_info`
        }).then(res=>{
            // console.log(res.data);
            //add this data to UI
            setUsername(res.data[0].username);
            setEmail(res.data[0].email);
            setPassword(res.data[0].password);
            setUrl(res.data[0].url);

            setStreet(res.data[0].street);
            setCity(res.data[0].city);
            setState(res.data[0].state);
            setCode(res.data[0].code);
            setPhone(res.data[0].phone);
        }).catch(err=>{
            console.log("got error",err);
        })
    },[]);

    function handleChange(e){
        const type = (e.target.id);
        if(type === "fullName"){
            setUsername(e.target.value);
        }
        else if(type === "eMail"){
            setEmail(e.target.value);
        }
        else if(type === "phone"){
            setPhone(e.target.value);
        }
        else if(type === "website"){
            setUrl(e.target.value);
        }
        else if(type === "Street"){
            setStreet(e.target.value);
        }
        else if(type === "ciTy"){
            setCity(e.target.value);
        }
        else if(type === "sTate"){
            setState(e.target.value);
        }
        else if(type === "zIp"){
            setCode(e.target.value);
        }
    }

    return(
        <div className='settings'>
        <div class="container">
        <Grid container spacing={4} style={{}}>
            <Grid item xs={12} md={12} lg={3}>
            <Paper elevation={5}>
                <div class="card h-100" style={{height:'35rem',padding:'17px 6%'}}>
                    <div class="card-body">
                        <div class="account-settings">
                            <div class="user-profile">
                                <div class="user-avatar">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Maxwell Admin"></img>
                                </div>
                                <h5 class="user-name" style={{fontSize:'1.2rem'}}>{username}</h5>
                                <h6 class="user-email">{email}</h6>
                            </div>
                            <div class="sabout">
                                <h5 class="mb-2 text-primary" style={{margin:'2px',fontSize:'1.2rem'}}>About</h5>
                                <div className='user-info'>
                                    <h5><i class="fa-solid fa-phone"></i>Phone</h5>
                                    <p>{phone}</p>
                                    <h5><i class="fa-solid fa-hashtag"></i>Social</h5>
                                    <p>{url}</p>
                                    <h5><i class="fa-solid fa-road"></i>Street</h5>
                                    <p>{street}</p>
                                    <h5><i class="fa-solid fa-city"></i>City</h5>
                                    <p>{city}</p>
                                    <h5><i class="fa-solid fa-location-arrow"></i>State</h5>
                                    <p>{state}</p>
                                    <h5><i class="fa-solid fa-location-dot"></i>Pincode</h5>
                                    <p>{code}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
            </Grid>
            <Grid item lg={9} md={12} xs={12} style={{paddingTop:'56px'}}>
            <Paper elevation={5}>
                <div class="card h-100" style={{height:'35rem'}}>
                    <div class="card-body" style={{padding:'0 3%'}}>
                        <Grid container spacing={3} style={{textAlign:'left',marginBottom:'25px'}}>
                            <Grid item lg={12} md={12} xs={12}>
                                <h6 class="mb-3 text-primary" style={{marginTop:'0',fontSize:'1.1rem'}}>Personal Details</h6>
                            </Grid>
                            <Grid style={{paddingTop:'0'}} item lg={6} md={6} sm={6} xs={12}>
                                <div class="form-group">
                                    <label for="fullName">Full Name</label><br></br>
                                    <input type="text" class="form-control" id="fullName" placeholder="Enter full name" required onChange={(e)=>handleChange(e)}></input>
                                </div>
                            </Grid>
                            <Grid style={{paddingTop:'0'}} item lg={6} md={6} sm={6} xs={12}>
                                <div class="form-group">
                                    <label for="eMail">Email</label><br></br>
                                    <input type="email" class="form-control" id="eMail" placeholder="Enter email ID" required onChange={(e)=>handleChange(e)}></input>
                                </div>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                <div class="form-group">
                                    <label for="phone">Phone</label><br></br>
                                    <input type="text" class="form-control" id="phone" placeholder="Enter phone number" onChange={(e)=>handleChange(e)}></input>
                                </div>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                <div class="form-group">
                                    <label for="website">Website URL</label><br></br>
                                    <input type="url" class="form-control" id="website" placeholder="Website url" onChange={(e)=>handleChange(e)}></input>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid spacing={3} container style={{textAlign:'left'}}>
                            <Grid item lg={12} md={12} sm={12} style={{paddingTop:'0'}}>
                                <h6 class="mb-3 text-primary" style={{fontSize:'1.1rem'}}>Address</h6>
                            </Grid>
                            <Grid style={{paddingTop:'0'}} item lg={6} md={6} sm={6}>
                                <div class="form-group">
                                    <label for="Street">Street</label>
                                    <input type="name" class="form-control" id="Street" placeholder="Enter Street" onChange={(e)=>handleChange(e)}></input>
                                </div>
                            </Grid>
                            <Grid style={{paddingTop:'0'}} item lg={6} md={6} sm={6}>
                                <div class="form-group">
                                    <label for="ciTy">City</label>
                                    <input type="name" class="form-control" id="ciTy" placeholder="Enter City" onChange={(e)=>handleChange(e)}></input>
                                </div>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} >
                                <div class="form-group">
                                    <label for="sTate">State</label>
                                    <input type="text" class="form-control" id="sTate" placeholder="Enter State" onChange={(e)=>handleChange(e)}></input>
                                </div>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6}>
                                <div class="form-group">
                                    <label for="zIp">Zip Code</label>
                                    <input type="text" class="form-control" id="zIp" placeholder="Zip Code"></input>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} style={{textAlign:'right',marginTop:'-9px'}}>
                            <Grid item lg={12} md={12} xs={12}>
                                <div class="text-right">
                                    <Button type="button" id="submit" name="submit" variant='contained' style={{color:'white',backgroundColor:'grey',marginRight:'4px'}}>Cancel</Button>
                                    <Button type="button" id="submit" name="submit" variant='contained'>Update</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Paper>
            </Grid>
        </Grid>
        </div>
        </div>
    );
}

export default Settings;