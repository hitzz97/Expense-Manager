/* eslint-disable no-restricted-globals */
import { CalendarMonth, } from "@mui/icons-material";
import { Box, Typography,Button, TextField, ButtonGroup, FormLabel} from "@mui/material";
import DateAdapter  from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/lab";
import Popup from './Popup'
import { addTrans,removeTrans } from "../../../Redux/Slices/accountSlice";
import { useDispatch } from "react-redux";

export default function AddPopup(props){
    const [ttype,setTtype] = useState('credit')
    const [date,setDate] = useState(new Date())
    const [amt, setAmt] = useState("")
    const [notes, setNotes] = useState("")
    const [bcolor, setbcolor] =useState('success')
    const [ctime, setCtime] = useState(false)

    const dispatch = useDispatch();

    useEffect(()=>{
        let obj = props.edit
        console.log("Editing", obj);
        if(obj!==undefined){
            setTtype(obj.type);
            setDate(new Date(obj.date));
            setAmt(obj.amt);
            setNotes(obj.notes);
            setCtime(obj.ctime);

            if(obj.type==='credit')setbcolor("success");
            else setbcolor("warning");
            // console.log(bcolor, ttype, date, amt, notes, ctime);
        }
    },[])

    function handleTypeChange(e){
        // console.log(e.target)
        if(e.target.innerHTML === "Dr") { 
            setTtype("debit")
            setbcolor("warning")
        }
        else {
            setTtype("credit")
            setbcolor("success")
        }
    }
    function handleAdd(){
        if(amt==""||amt==0){
            alert("Please enter a valid amount!");
            return;
        }
        if(ctime)dispatch(removeTrans({ accName:props.accName, ctime }))
        dispatch(addTrans({
            accName: props.accName,
            obj: {
                date:date.toISOString().split('T')[0],
                amt:amt,
                type:ttype,
                notes:notes,
                ctime:(ctime)?ctime:new Date().getTime(),
            }
        }))
        props.setOpen(false);
        setTimeout(()=>history.back(), 100);
    }
    function handleCancle(){
        props.setOpen(false);
        setTimeout(()=>history.back(), 100);
    }
    return (
        <Popup open={props.open} show={props.setOpen}>
            <Box sx={{borderTopRightRadius:'10px',
                borderTopLeftRadius:'10px'}}>
            <Box my={2}  sx={{textAlign:"center"}}>
                <FormLabel>

            <Typography  variant="body1" fontWeight={500}>Add Transaction</Typography>
                </FormLabel>
            </Box>

            <Box px={2} mt={1} mb={3} display="flex" flexDirection="column" justifyContent="space-around" >
                <Box display="flex" flexDirection="row"  alignItems='center' justifyContent="space-between">
                    <LocalizationProvider dateAdapter={DateAdapter } >
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={(v) => {
                            // console.log(v);
                            setDate(v.$d);
                        }}
                        disableFuture={true}
                        disableCloseOnSelect={true}
                        allowSameDateSelection={true}
                        renderInput={(params) => {
                            return (
                            <Button sx={shadow} variant="outlined" size="large" {...params.inputProps}>
                                <CalendarMonth fontSize="medium"/>
                            </Button>
                            )}
                        }
                        
                    />
                    </LocalizationProvider>

                    <TextField sx={{mr:1, ml:0.5, ...shadow}} value={amt} onChange={(e)=>setAmt(e.target.value)} variant="outlined" color={bcolor} label="Amount" size="small" placeholder="Transaction Amount" type="number"/>
                    
                    <ButtonGroup variant="text" color={bcolor} size="small">
                        <Button variant={bcolor==='success'?"outlined":"text"} sx={bcolor==='success'?shadow:''}
                        size="small" color="success" onClick={handleTypeChange}
                        >
                            <Typography variant="h6" >Cr</Typography> 
                        </Button>
                        <Button variant={bcolor==='warning'?"outlined":"text"} sx={bcolor==='warning'?shadow:''}
                        size="small" color="warning" onClick={handleTypeChange} >
                            <Typography variant="h6" >Dr</Typography>
                        </Button>
                    </ButtonGroup>
                </Box>
                <Box display='flex' mt={1} mb={2}>
                    <TextField multiline maxRows={4} sx={{"flex":1}} variant="standard" label="Notes" placeholder="Additional Notes" 
                    value={notes}
                    onChange={(e)=>setNotes(e.target.value)}/>
                </Box>
            </Box>
            <ButtonGroup fullWidth variant="text" >
                <Button color="error" onClick={handleCancle}>Cancel</Button>
                <Button color="success" onClick={handleAdd}>Add</Button>
            </ButtonGroup>

            </Box>
        </Popup>
    )
}

const shadow={
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
}