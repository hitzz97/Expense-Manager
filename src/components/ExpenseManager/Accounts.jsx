import {  ArrowCircleLeftOutlined, Delete} from "@mui/icons-material";
import {  Avatar, Box, Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../../Redux/Slices/accountSlice";
import "./Accounts.css"
import { deleteAccount } from "../../Redux/Slices/accountSlice";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
  });


function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width:50, height:50,
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

function AccountBlock(props){
    const [showDelete, setShowDelete] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleDelete(e){
        e.stopPropagation();
        setShowDelete(true);
    }
    return (
        <Box component={ButtonBase} className="block" onClick={()=>navigate(props.link)}>
            <Avatar {...stringAvatar(props.name)} />
            <Typography variant="subtitle1" className="accName">{props.name}</Typography>
            <Delete className="deleteAccBtn" color="error" onClick={handleDelete}/>

            <Dialog
            open={showDelete}
            TransitionComponent={Transition}
            keepMounted
            onClose={()=>setShowDelete(false)}
            aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Delete Account"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Do you want to delete {props.accName}. This action is irreversible.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={(e)=>{e.stopPropagation();setShowDelete(false)}}>Disagree</Button>
                <Button onClick={(e)=>{
                    e.stopPropagation();
                    dispatch(deleteAccount(props.name.split(" ").join("-")));
                }}>Agree</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}


export default function Accounts (props) {
    const [add, setAdd] = useState(false);
    const [newAccName, setNewAccName]=useState("")
    const dispatch = useDispatch();
    const [availableAcc, setAvailableAcc] = useState([]);
    const accounts = useSelector(state=>state.accounts);

    function toggleAdd(){
        setAdd(!add);
    }
    function nameChg(e){
        setNewAccName(e.target.value);
    }
    function addAccount(){
        if(newAccName.length === 0){
            alert("Account name can be empty");
            return;
        }
            
        let accName = newAccName.split(" ").filter(e=>e.length>=1).join("-");

        for(let i=0; i<newAccName.length; i++){
            let e = newAccName[i];
            if(!((e>='a' && e<='z') || (e>='A' && e<='Z') || (e>=0 && e<=9) || (e==" "))){
                alert("Account name can only contain letter and numbers eg: Abc1");
                return ;
            }
        }

        if(accounts[accName]){
            alert("Account with this name already exists.");
            return;
        }
        dispatch(createAccount(accName));
        reset();
    }
    function reset(){
        setNewAccName("");
        toggleAdd();
    }
    useEffect(()=>{
        let arr = []
        for(let e in accounts){
            let accName = e;
            // console.log(e);
            arr.push(
                <AccountBlock link={`/app/${accName}`}  name={accName.split('-').join(" ")} key={accName}/>
            )
        }
        setAvailableAcc(arr);
    }, [accounts])

    return (
        <Box className="accountsContainer">
            <Box className="topBar" sx={{justifyContent:"left", p:1}}>
                <Link to='/' className='accLink'>
                    <ArrowCircleLeftOutlined fontSize="large" sx={{ml:1, mr:1}}/>
                    <Typography variant="body1" >Home</Typography>
                </Link>
            </Box>
            <FormLabel sx={{alignSelf:"center", mt:5, mb:5}}>
                <Typography variant="h4" fontWeight={400}>Accounts</Typography>
            </FormLabel>
            <Grid container item className="accountBlock" xs={12} md={8}>
                <Box component={ButtonBase} className="block" onClick={toggleAdd}>
                    <Avatar><Typography variant="h3">+</Typography></Avatar>
                    <Typography variant="h6" className="accName">Add</Typography>
                </Box>
                {
                    availableAcc
                }                          
            </Grid>
            
            <Box sx={{mt:5, textAlign:"center"}}>
                <Typography variant="h6" color={'gray'}>Create and manage multiple accounts at same place</Typography>
                <Typography variant="body1" color={'gray'}>Click on the Add button to add new accounts and press the delete icon to delete them</Typography>
            </Box>

            <Dialog
            open={add}
            TransitionComponent={Transition}
            keepMounted
            onClose={toggleAdd}
            aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Create Account</DialogTitle>
                <DialogContent>
                {/* <DialogContentText id="alert-dialog-slide-description"> */}
                    <TextField sx={{mt:1}} value={newAccName} onChange={nameChg} placeholder="Enter Account Name" label="Name" />
                {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                <Button onClick={reset}>Cancel</Button>
                <Button onClick={addAccount}>Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}