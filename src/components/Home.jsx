import { Add, ArrowDownward, ArrowForwardIosRounded, AttachMoney, Cancel, Delete, Done, Edit, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, ButtonBase, ButtonGroup, Card, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Fade, FormLabel, Grid, IconButton, List, ListItem, ListItemButton, Slide, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../Redux/Slices/accountSlice";
import "./Home.css"
import addAccImg from "../static/addAccount.jpeg"
import { deleteAccount } from "../Redux/Slices/accountSlice";

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
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
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
            <Avatar {...stringAvatar('Acc one')} />
            <Typography variant="subtitle1" className="accName">{props.name}</Typography>
            <Delete className="deleteAccBtn" color="error" onClick={handleDelete}/>
        </Box>
    )
}

export default function Home (props){
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
        <Box>
            <div className="styleb1"/>
            <div className="styleb2"/>
            <div className="styleb3"/>
            <div className="styleb4"/>
            <div className="styleb5"/>
            <Grid container >
                <Grid item container xs={12} md={6}>
                    <Box pt={3} px={2} display="flex" flexDirection="column" >
                    <Typography className="heading floating" variant="h2">
                        MANAGE
                    </Typography>
                    <FormLabel>
                        <Typography className="heading" variant="h6" >
                            ALL YOUR
                        </Typography>
                    </FormLabel>
                    <Typography className="heading floating" variant="h3">EXPENSES</Typography>
                    <FormLabel>
                        <Typography className="heading" variant="h6">
                            <p>AT ONE</p>
                        </Typography>
                    </FormLabel>
                    <Typography className="heading" variant="h4">PLACE</Typography>
                    </Box>
                </Grid>
                <Grid item container xs={12} md={6}>
                    <Box className="contBlock">
                        <FormLabel>
                            <Typography variant="h6">Accounts</Typography>
                        </FormLabel>
                        <Box className="extBlock">
                            <Box component={ButtonBase} className="block" onClick={toggleAdd}>
                                <Avatar><Typography variant="h3">+</Typography></Avatar>
                                <Typography variant="h6" className="accName">Add</Typography>
                            </Box>

                            {/* {
                                add &&
                                <Box className="block">
                                    <TextField placeholder="Enter account name" label="Name" value={newAccName} onChange={nameChg}/>
                                    <ButtonGroup size="small" variant="text">
                                        <Button onClick={addAccount}><Done color="success" /></Button>
                                        <Button onClick={reset}><Cancel color="error"/></Button>
                                    </ButtonGroup>
                                </Box>
                            }   */}
                            {
                                availableAcc
                            }                          
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            
            <Dialog
            open={add}
            TransitionComponent={Transition}
            keepMounted
            onClose={toggleAdd}
            aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Create Account</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <TextField sx={{mt:1}} value={newAccName} onChange={nameChg} placeholder="Enter Account Name" label="Name" />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={reset}>Disagree</Button>
                <Button onClick={addAccount}>Agree</Button>
                </DialogActions>
            </Dialog>

            <Accordion
            onChange={()=>setOpen(!open)}
            disableGutters
            elevation={0}
            square
            sx={{
                boxShadow:"0 0 10px rgba(0, 0, 0, 0.3)",   
                '&:before':{
                    display:"none",
                },
                position:"fixed",
                bottom:"0%",
                width:"100%",
                zIndex:5,
                // overflowY:"scroll"
            }}
            >
                <AccordionSummary  expandIcon={<ExpandMore />}
                sx={{
                    position:"sticky",
                    top:0,
                    backgroundColor:"white",
                    boxShadow:"0 0 5px rgba(0, 0, 0, 0.6)", 

                }}
                >
                    <Typography variant="h6" >Features</Typography>
                </AccordionSummary>
            <AccordionDetails sx={{
                // marginTop:"100%",
                height:"100vh",
                overflowY:"scroll"
            }}>
                <Card className="cards" sx={{mt:10}}>
                    <CardHeader title="Add Accounts" subheader="You can add multiple accounts"/>
                    <CardMedia
                    component='img'
                    height={194}
                    image={addAccImg}
                    alt="Add multiple accounts"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        Use the Add Account button available on the home page to add multiple accounts 
                        and manage them independently.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="cards" >
                    <CardHeader title="Group Transactions" subheader="Group transactions by date"/>
                    <CardMedia
                    component='img'
                    height={194}
                    image={addAccImg}
                    alt="Add multiple accounts"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        Click on the Group button to group transactions by day, date, month, year. This will help to 
                        visualise transactions in a more intutive way.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="cards">
                    <CardHeader title="Filter Transactions" subheader="Filter transactions using prest options"/>
                    <CardMedia
                    component='img'
                    height={194}
                    image={addAccImg}
                    alt="Add multiple accounts"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        Select filter button for the filter menu where you can set different options to filter transactions 
                        for more in depth Insight of your transaction history.
                        </Typography>
                    </CardContent>
                </Card>
            </AccordionDetails>
            </Accordion>

            {/* </Box> */}

        </Box>
    )
}