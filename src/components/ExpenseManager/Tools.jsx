/* eslint-disable no-restricted-globals */
import { Add, CheckBoxOutlineBlank, GroupWork, Sort } from "@mui/icons-material";
import {  CheckBox } from "@mui/icons-material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Typography, FormLabel, Button, Input, InputLabel, Grid, FormControl, RadioGroup, FormControlLabel, Radio, ListItem, ListItemButton} from "@mui/material";
import Switch from '@mui/material/Switch';
import { useState } from "react";
import "./Tools.css" 
import Popup from "./Popup/Popup";
import AddPopup from "./Popup/AddPopup";

function SortPopup(props){
    const handleClose= ()=>{
        props.setOpenSort(false);
        setTimeout(()=>history.back(), 100);
    }
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

            <Button variant="text" color="error" fullWidth onClick={handleClose}>
                    Close
                </Button>
            </Box>
        </Popup>
    )
}

function FilterPopup(props){
    const handleClose= ()=>{
        props.setOpen(false);
        setTimeout(()=>history.back(), 100);
    }
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
                <Grid container columnGap={4} rowGap={2} mx={1} py={1}>   
                    <Grid item xs={5}>
                        <InputLabel htmlFor="minAmt"><Typography>Minimum: </Typography></InputLabel>
                        <Input 
                            type={'number'} 
                            id="minAmt"
                            value={props.filters.minAmt} 
                            onChange={(e)=>props.setFilters({minAmt:Number(e.target.value)})} 
                            // variant="standard" 
                            className="removeOutline"
                        />
                    </Grid>           
                    <Grid item xs={5}>
                        <InputLabel htmlFor="maxAmt" ><Typography>Maximum: </Typography></InputLabel>
                        <Input 
                            type={'number'} 
                            id="maxAmt"
                            value={props.filters.maxAmt} 
                            onChange={(e)=>props.setFilters({maxAmt:Number(e.target.value)})} 
                            // variant="standard" 
                            className="removeOutline"
                            />    
                    </Grid>            
                </Grid>

                <br/>
                <FormLabel >Transaction Date</FormLabel>
                <Grid container columnGap={4} rowGap={2} mx={1} py={1}>   
                    <Grid item xs={11} >
                        <InputLabel htmlFor="start" ><Typography component={'div'}>Start </Typography></InputLabel>
                        <Input 
                        fullWidth
                            id="start"
                            type={'Date'} 
                            value={props.filters.startDate} 
                            onChange={(e)=>props.setFilters({startDate:e.target.value})} 
                            // variant="standard" 
                            className="removeOutline inpdate"
                        />                
                    </Grid>           
                    <Grid item xs={11}>
                        <InputLabel htmlFor="end" ><Typography component={'div'}>End </Typography></InputLabel> 
                        <Input 
                            fullWidth
                            sx={{m:0}}
                            type={'Date'} 
                            id="end"
                            value={props.filters.endDate} 
                            onChange={(e)=>props.setFilters({endDate:e.target.value})} 
                            // variant="standard" 
                            className="removeOutline"
                            />                
                    </Grid>            
                </Grid>
            </Box>
                <Button variant="text" color="error" fullWidth onClick={handleClose}>
                    Close
                </Button>
            </Box>
        </Popup>
    )
}

function GroupPopup(props){
    // const [value, setValue] = useState(props.group);
    const handleClose= ()=>{
        props.setOpen(false);
        setTimeout(()=>history.back(), 100);
    }
    function handleDMYChange(e){
        // console.log("group set")
        props.setGroup({dmy:e});
    }
    const RadioProps=(e)=>{
        return {
            checked: props.group.dmy === e,
        }
    }

    return (
        <Popup open={props.open} show={props.setOpen}>
            <Box>
            <Box mt={1}  sx={{textAlign:"center"}}>
            <Typography  variant="body1" >GROUP BY</Typography>
            </Box>
                {/* month range, */}
            <Box p={2} pb={0.5}> 
                {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
                <ListItemButton selected={'none'===props.group.dmy} divider sx={{py:0, '&.Mui-selected':shadow}} 
                onClick={()=>handleDMYChange('none')}>
                    <Box sx={{display:'flex',justifyContent:"space-between", alignItems:"center",width:"100%"}}>
                        <Typography>None</Typography>
                        <Radio {...RadioProps('none')}/>
                    </Box>
                </ListItemButton>
                <ListItemButton selected={'day'===props.group.dmy} divider sx={{py:0, '&.Mui-selected':shadow}} onClick={()=>handleDMYChange('day')}>
                    <Box sx={{display:'flex',justifyContent:"space-between", alignItems:"center",width:"100%"}}>
                        <Typography>Day</Typography>
                        <Radio {...RadioProps('day')}/>
                    </Box>
                </ListItemButton>
                <ListItemButton selected={'month'===props.group.dmy} divider sx={{py:0, '&.Mui-selected':shadow}} onClick={()=>handleDMYChange('month')}>
                    <Box sx={{display:'flex',justifyContent:"space-between", alignItems:"center",width:"100%"}}>
                        <Typography>Month</Typography>
                        <Radio {...RadioProps('month')}/>
                    </Box>
                </ListItemButton>
                <ListItemButton selected={'year'===props.group.dmy} divider sx={{py:0, '&.Mui-selected':shadow}} onClick={()=>handleDMYChange('year')}>
                    <Box sx={{display:'flex',justifyContent:"space-between", alignItems:"center",width:"100%"}}>
                        <Typography>Year</Typography>
                        <Radio {...RadioProps('year')}/>
                    </Box>
                </ListItemButton>
            </Box>

            <Button sx={shadow} variant="text" color="error" fullWidth onClick={handleClose}>
                Close
            </Button>
            </Box>
        </Popup>
    )
}

export default function Tools(props){
    const [openSort, setOpenSort] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openGroup, setOpenGroup] = useState(false);
    // const [openSort, setOpenSort] = useState(false);
    function handleFiltersChange(change){
        let obj = {...props.filters, ...change}
        console.log(obj)
        props.setFilters(obj);
    }
    function handleGroupChange(change){
        let obj = {...props.group, ...change}
        console.log(obj)
        props.setGroup(obj);
    }
    return (
        <Box sx={contstyle} borderRadius={2}>

                {openSort && <SortPopup sort={props.sort} setSort={props.setSort} open={openSort} setOpenSort={setOpenSort} />}
                <Button className="but" onClick={()=>setOpenSort(true)}>
                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <Sort fontSize="medium"/>
                    <Typography variant="caption" sx={{mt:0.5,fontSize:"0.8em"}}>sort</Typography>
                    </Box>
                </Button>

                {openFilter && <FilterPopup open={openFilter} setOpen={setOpenFilter} filters={props.filters} setFilters={handleFiltersChange}/>}
                <Button className="but" onClick={()=>setOpenFilter(true)}>
                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <FilterAltIcon fontSize="medium"/>
                    <Typography variant="caption" sx={{mt:0.5,fontSize:"0.8em"}}>filter</Typography>
                    </Box>
                </Button>  

                {openGroup && <GroupPopup open={openGroup} setOpen={setOpenGroup} group={props.group} setGroup={handleGroupChange}/>}
                <Button className="but"  onClick={()=>setOpenGroup(true)}> 
                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <GroupWork fontSize="medium"/>
                    <Typography sx={{mt:0.5,fontSize:"0.8em"}} variant="caption">group</Typography>
                    </Box>
                </Button>
                
                {openAdd && <AddPopup open={openAdd} setOpen={setOpenAdd} addTransaction={props.addTransaction}/>}
                <Button className="but" onClick={()=>setOpenAdd(true)}>
                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <Add fontSize="medium"/>
                    <Typography variant="caption" sx={{mt:0.5,fontSize:"0.8em"}}>Add</Typography>
                    </Box>
                </Button>



        </Box>
    )
}

const contstyle={
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    mt:1,
    mb:0.5,
    // p:1,
    flexShrink:'0',
    backgroundColor:"white",
    // boxShadow:"0 2px 5px lightgrey",
    // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    // boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
} 

const shadow={
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
}