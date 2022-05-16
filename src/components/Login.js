import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { connect } from 'react-redux';

import Alert from 'react-bootstrap/Alert'

const Login=( {authUser} )=>{

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const history = useHistory();

    const [userName, setUserName]=useState('');
    const [passWord, setPassWord]=useState('');
    const [erreur, setErreur]=useState('');

    const login=async()=>{
        if(userName === '' && passWord === ''){
            return setErreur('invalid userName or PassWord');
        }
        await fetch('http://localhost:3001/user/login',{
            method: 'POST',
            headers:{
              'content-type': 'application/json'
            },
            body:JSON.stringify({userName, passWord})
          })
        .then(res => res.json())
        .then(res=>{
                if(res.data.length){
                    authUser(userName);
                    history.push('/Company');
            } else {
                return setErreur('invalid userName or PassWord');
            }
        }
        );
    }

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' onChange={(e)=>setUserName(e.target.value)} fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' onChange={(e)=>setPassWord(e.target.value)} fullWidth required/>
                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={login}>Sign in</Button>
                { erreur !== '' ? <Alert variant="danger">
                    <Alert.Heading>Problem</Alert.Heading>
                    <p>
                        Invalid UserName Or PassWord
                    </p>
                </Alert>: ''}
            </Paper>
        </Grid>
    )
}


const mapDispatchToProps = dispatch=>{
    return{
        authUser:(userName)=>{
            dispatch({ type:'login',payload:userName})
        }
    }
}
export default connect(null, mapDispatchToProps)(Login);