import { Add, ArrowDownward, ArrowForwardIosRounded, AttachMoney, Cancel, Delete, Done, Edit, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, ButtonBase, ButtonGroup, Card, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Fade, FormLabel, Grid, IconButton, List, ListItem, ListItemButton, Pagination, Slide, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../../Redux/Slices/accountSlice";
import "./Accounts.css"
import addAccImg from "../../static/addAccount.jpeg"
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleDelete(e){
        e.stopPropagation();
        dispatch(deleteAccount(props.name.split(" ").join("-")));
    }
    return (
        <Box component={ButtonBase} className="block" onClick={()=>navigate(props.link)}>
            <Avatar {...stringAvatar(props.name)} />
            <Typography variant="subtitle1" className="accName">{props.name}</Typography>
            <Delete className="deleteAccBtn" color="error" onClick={handleDelete}/>
        </Box>
    )
}


export default function Accounts (props) {
    const [open, setOpen] = useState(false)
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
        <Box className="contBlock">
                <FormLabel>
                    <Typography variant="h6">Accounts</Typography>
                </FormLabel>
                <Box className="extBlock">
                    <Box component={ButtonBase} className="block" onClick={toggleAdd}>
                        <Avatar><Typography variant="h3">+</Typography></Avatar>
                        <Typography variant="h6" className="accName">Add</Typography>
                    </Box>
                    {
                        availableAcc
                    }                          
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