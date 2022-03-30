import { Add, CheckBoxOutlineBlank, Remove, Sort } from "@mui/icons-material";
import { CalendarMonth, CheckBox } from "@mui/icons-material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Typography, FormLabel, SwipeableDrawer,Button, TextField, Chip, Input, IconButton, ButtonGroup} from "@mui/material";
import Switch from '@mui/material/Switch';
import DateAdapter  from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useState } from "react";

import "./Tools.css"
import { DatePicker } from "@mui/lab";

function Popup(props) {
    // function handelClick(){
    //     setTimeout(()=>props.show(false),10);
    // }
    const toggleDrawer = (open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
        props.show(open);
       
      };
    return (

        <SwipeableDrawer
        anchor={'bottom'}
        open={props.open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        >
        {props.children}

        </SwipeableDrawer>
    )
}

function SortPopup(props){
    return (
        <Popup open={props.open} show={props.setOpenSort}>
            <Box>
            <Box my={1} sx={{textAlign:"center"}}>
            <Typography  variant="body1" >Sort by</Typography>
            </Box>
            <Box px={3} pb={2}>
                <FormLabel id="demo-error-radios">Date</FormLabel>
                <Box my={1} sx={{display:"flex",flexDirection:"column"}}>
                    <Button variant="text" onClick={()=>props.setSort("latest")}>
                        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center",width:"100%"}}>
                            <Typography variant="subtitle2">Latest first</Typography>
                            {props.sort==="latest"?<CheckBox/>:<CheckBoxOutlineBlank/>}
                        </Box>
                    </Button>   
                    <Button variant="text" onClick={()=>props.setSort("oldest")}>
                        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center",width:"100%"}}>
                        <Typography variant="subtitle2">Oldest first</Typography>
                        {props.sort==="oldest"?<CheckBox/>:<CheckBoxOutlineBlank/>}
                        </Box>
                    </Button>   
                </Box>
                <FormLabel id="demo-error-radios">Amount</FormLabel>
                <Box my={1} sx={{display:"flex",flexDirection:"column"}}   >
                    <Button variant="text" onClick={()=>props.setSort("highest")}>
                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center",width:"100%"}}>
                        <Typography variant="subtitle2">Highest first</Typography>
                        {props.sort==="highest"?<CheckBox/>:<CheckBoxOutlineBlank/>}
                        </Box>
                    </Button>   
                    <Button variant="text" onClick={()=>props.setSort("lowest")}>
                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center",width:"100%"}}>

                        <Typography variant="subtitle2">Lowest first</Typography>
                        {props.sort==="lowest"?<CheckBox/>:<CheckBoxOutlineBlank/>}
                        </Box>
                    </Button>   
                </Box>
            </Box>
            </Box>
        </Popup>
    )
}

function FilterPopup(props){

    return (
        <Popup open={props.open} show={props.setOpen}>
            <Box>
            <Box my={1}  sx={{textAlign:"center"}}>
            <Typography  variant="body1" >FILTER BY</Typography>
            </Box>
                {/* month range, */}
            <Box p={2}> 
                <FormLabel>Transaction Type</FormLabel>
                <Box mx={1} >
                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:'center'}}>
                        <label htmlFor="credits" ><Typography component={'div'}>Credits</Typography></label>
                        <Switch id="credits"  checked={props.filters.credits} onChange={()=>props.setFilters({credits:!props.filters.credits})} />
                    </Box>
                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:'center'}}>
                        <label htmlFor="debits"><Typography component={'div'}>Debits</Typography></label>
                        <Switch id="debits" checked={props.filters.debits} onChange={()=>props.setFilters({debits:!props.filters.debits})} />
                    </Box>
                </Box>
                
                <br/>
                <FormLabel >Transaction Range</FormLabel>
                <Box display={'flex'} justifyContent={'space-between'} mx={1} py={1}>
                    <Box>
                        <label htmlFor="minAmt"><Typography component={'div'}>Minimum: </Typography></label>
                        <input 
                            type={'number'} 
                            id="minAmt"
                            value={props.filters.minAmt} 
                            onChange={(e)=>props.setFilters({minAmt:Number(e.target.value)})} 
                            // variant="standard" 
                            className="removeOutline"
                        />                
                    </Box>
                    <Box>
                        <label htmlFor="maxAmt" ><Typography component={'div'}>Maximum: </Typography></label>
                        <input 
                            type={'number'} 
                            id="maxAmt"
                            value={props.filters.maxAmt} 
                            onChange={(e)=>props.setFilters({maxAmt:Number(e.target.value)})} 
                            // variant="standard" 
                            className="removeOutline"
                            />                
                    </Box>
                </Box>

                <br/>
                <FormLabel >Transaction Date</FormLabel>
                <Box display={'flex'} justifyContent={'space-between'} mx={1} py={1}>
                    <Box>
                        <label htmlFor="start" ><Typography component={'div'}>Start </Typography></label>
                        <input 
                            id="start"
                            type={'Date'} 
                            value={props.filters.startDate} 
                            onChange={(e)=>props.setFilters({startDate:e.target.value})} 
                            // variant="standard" 
                            className="removeOutline"
                        />                
                    </Box>
                    <Box>
                        <label htmlFor="end" ><Typography component={'div'}>End </Typography></label>                        <input 
                            type={'Date'} 
                            id="end"
                            value={props.filters.endDate} 
                            onChange={(e)=>props.setFilters({endDate:e.target.value})} 
                            // variant="standard" 
                            className="removeOutline"
                            />                
                    </Box>
                </Box>
            </Box>
            
            </Box>
        </Popup>
    )
}

function AddPopup(props){
    const [ttype,setTtype] = useState('credit')
    const [date,setDate] = useState(new Date())
    const [amt, setAmt] = useState("")
    const [notes, setNotes] = useState("")

    const [bcolor, setbcolor] =useState('success')
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
        props.addTransaction(date.toISOString().split('T')[0], amt, ttype, notes);
        props.setOpen(false);
    }
    function handleCancle(){
        props.setOpen(false);
    }
    return (
        <Popup open={props.open} show={props.setOpen}>
            <Box>
            <Box my={2}  sx={{textAlign:"center"}}>
            <Typography  variant="body1" >Add Transaction</Typography>
            </Box>

            <Box px={2} mt={1} mb={3} display="flex" flexDirection="column" justifyContent="space-around" >
                <Box display="flex" flexDirection="row"  alignItems='center' justifyContent="space-between">
                    <LocalizationProvider dateAdapter={DateAdapter }>
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
                            <Button variant="outlined" size="large" {...params.inputProps}>
                                <CalendarMonth fontSize="medium"/>
                            </Button>
                            )}
                        }
                    />
                    </LocalizationProvider>

                    <TextField sx={{mr:1, ml:0.5}} value={amt} onChange={(e)=>setAmt(e.target.value)} variant="outlined" color={bcolor} label="Amount" size="small" placeholder="Transaction Amount" type="number"/>
                    
                    <ButtonGroup variant="text" color={bcolor} size="small">
                        <Button variant={bcolor==='success'?"outlined":"text"} size="small" color="success" onClick={handleTypeChange}
                        >
                            <Typography variant="h6" >Cr</Typography> 
                        </Button>
                        <Button variant={bcolor==='warning'?"outlined":"text"} size="small" color="warning" onClick={handleTypeChange} >
                            <Typography variant="h6" >Dr</Typography>
                        </Button>
                    </ButtonGroup>
                </Box>
                <Box display='flex' my={2}>
                    <TextField multiline maxRows={4} sx={{"flex":1}} variant="standard" label="Notes" placeholder="Additional Notes" 
                    value={notes}
                    onChange={(e)=>setNotes(e.target.value)}/>
                </Box>
            </Box>
            <ButtonGroup fullWidth variant="text">
                <Button color="success" onClick={handleAdd}>Add</Button>
                <Button color="error" onClick={handleCancle}>Cancel</Button>
            </ButtonGroup>

            </Box>
        </Popup>
    )
}


export default function Tools(props){
    const [openSort, setOpenSort] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    // const [openSort, setOpenSort] = useState(false);
    function handleFiltersChange(change){
        let obj = {...props.filters, ...change}
        console.log(obj)
        props.setFilters(obj);
    }
    return (
        <Box sx={contstyle} borderRadius={5}>

                {openSort && <SortPopup sort={props.sort} setSort={props.setSort} open={openSort} setOpenSort={setOpenSort} />}
                <Button className="but" onClick={()=>setOpenSort(true)}>
                    <Sort fontSize="medium"/>
                </Button>

                {openFilter && <FilterPopup open={openFilter} setOpen={setOpenFilter} filters={props.filters} setFilters={handleFiltersChange}/>}
                <Button className="but">
                    <FilterAltIcon fontSize="medium" onClick={()=>setOpenFilter(true)}/>
                </Button>  

                {openAdd && <AddPopup open={openAdd} setOpen={setOpenAdd} addTransaction={props.addTransaction}/>}
                <Button className="but">
                    <Add fontSize="medium" onClick={()=>setOpenAdd(true)}/>
                </Button>

                <Button className="but"> 
                    <Remove fontSize="medium"/>
                </Button>
        </Box>
    )
}

const contstyle={
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    my:1,
    // p:1,
    flexShrink:'0',
    backgroundColor:"white",
    boxShadow:"0 2px 5px lightgrey",
} 
