import { Delete} from "@mui/icons-material";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from "@mui/material";
import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteAccount } from "../../Redux/Slices/accountSlice";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

export default function Header(props){
    const [showDelete, setShowDelete] = useState(false);
    const trans = useSelector(state=>state.accounts[props.accName])
    // useEffect(()=>console.log(trans));
    const navigate  = useNavigate()
    const dispatch = useDispatch();

    return (
        <Box p={1} mb={1} sx={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            // width:"100%",
            // backgroundColor:"#4a148c",
            boxShadow:"0 2px 10px rgba(0,0,0,0.6)"
        }}>
            <Box sx={{display:"flex"}}>
            <Link to="/" >
            <Button>
                <Typography sx={{color:"black"}} variant="body2">Home</Typography>
            </Button>
            </Link>
            <Link to="/accounts" >
            <Button>
                <Typography sx={{color:"black"}} variant="body2">Accounts</Typography>
            </Button>
            </Link>
            {/* </Box>
            
            
            <Box sx={{
                display:"flex", alignItems:"center", justifyItems:"center"
            }}> */}
            <Button>
            <Typography variant="body2" color="black">{trans.accName.split("-").join(" ")}</Typography>
            </Button>
                {/* <Button sx={{p:0,m:0}} onClick={()=>alert("Functionality yet to be added")}> */}
                {/* <Edit sx={{ml:0.5}}  variant="small" color="secondary" /> */}
                {/* </Button> */}
            </Box>

            <Button onClick={()=>setShowDelete(true)}>
                <Delete color="black" />
            </Button>

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
                <Button onClick={()=>setShowDelete(false)}>Disagree</Button>
                <Button onClick={()=>{
                    dispatch(deleteAccount(props.accName));
                    navigate("/Accounts");
                }}>Agree</Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}