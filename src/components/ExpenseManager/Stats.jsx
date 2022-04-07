import { Box, Button, ButtonGroup, FormLabel, TextField, Typography } from "@mui/material";
import {  AccountBalanceWalletRounded, Cancel, Done, Edit } from "@mui/icons-material";
import "./Stats.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setiBal } from "../../Redux/Slices/transactionSlice";

export default function Stats(props){
    const bal = useSelector(state=>state.trans.iBal);
    const credit = useSelector(state=>state.trans.credit);
    const debit = useSelector(state=>state.trans.debit);
    const dispatch =  useDispatch()

    const [value, setValue] = useState(bal);
    const [edit, setEdit] = useState(false);
    // const inp = useRef(null);
    const handleClick = ()=>{
        setEdit(!edit);
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(setiBal(value));
        handleClick();
    }
    
    return (
        <Box sx={style} >
            <Box className='styleMe'/>
            <FormLabel>
            <Typography  variant="body2" sx={{fontWeight:500}}>Balance</Typography>
            </FormLabel>
            <form  onSubmit={handleSubmit}>
            <Box sx={{display:"flex", flexDirection:"Row"}} mx={1} >
                <AccountBalanceWalletRounded sx={{alignSelf:"center", mr:0.5, mb:0.1}}/>
                {edit && 
                <>
                    <TextField 
                        // ref={inp} 
                        sx={{p:0.6}}
                        autoFocus
                        variant="standard"
                        type={"number"} 
                        // onBlur={()=>setEdit(!edit)} 
                        defaultValue={value=='0'?"":value} 
                        onChange={(e)=>setValue(Number(e.target.value))} 
                    />
                    <ButtonGroup size="small" variant="text" sx={{p:0, m:0, boxShadow:"0 0 5px white"}}>
                        <Button type="submit" size="small" > <Done color="success"/> </Button>
                        <Button onClick={handleClick} size="small"> <Cancel color="error" /> </Button>
                    </ButtonGroup>
                </>
                }
                {
                    !edit && 
                    <>
                    <Typography sx={{alignSelf:"center"}}  variant="h4" onClick={handleClick} color="#4a148c" fontWeight={600}>{ bal}</Typography> 
                    <Box sx={{ml:2, mt:0.5,display:'flex',alignItems:"center", alignSelf:"flex-start"}} onClick={handleClick}> 
                        <Edit color="primary" fontSize="small"/>
                        <Typography variant="caption" color='primary'>EDIT</Typography>
                    </Box>
                    </>
                }
            </Box>
            </form>

            <div className="spacer"/>
                <FormLabel>

            <Typography variant="body2" sx={{fontWeight:500}}>This month</Typography>
                </FormLabel>

            <Box sx={{display:'flex'}} className="balance">
            <Box mx={1} sx={{display:'flex', flexDirection:"column", alignItems:'center', px:2}}>
                <Typography variant="h6" color="#6a1b9a" fontWeight={600}>{credit}</Typography>
                <Typography variant="body1" fontWeight={500}>Credit</Typography>
            </Box>
            <Box mx={1} sx={{display:'flex', flexDirection:"column", alignItems:'center', px:2, color:"error"}}>
                <Typography variant="h6" color="#6a1b9a" fontWeight={600}>{debit}</Typography>
                <Typography variant="body1" fontWeight={500}>Debit</Typography>
            </Box>
            </Box>

        </Box>
    )
}
 
const style={
    borderRadius:'8px',
    // boxShadow:"0px 2px 5px lightgrey",
    // boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 12px",
    // boxShadow: "rgba(149, 157, 165, 0.3) 0px 8px 24px",
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    p:2,
    position:'relative',
    // flexShrink:'0',
    backgroundColor:"white",
}