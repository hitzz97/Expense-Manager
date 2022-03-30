import { Box, ListItem, ListItemButton, Typography } from "@mui/material";
import "./Transactions.css"
import { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { CheckBox } from "@mui/icons-material";
const Tstyle={
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    mt:0.5,
    width:"100%",
    // borderBottom:"1px solid grey",
    // borderColor:"#fff"
}
const Transaction = (props) => {
    const [selected, setSelected] = useState(false);
    function handleClick(){
        setSelected(!selected);
        props.handleSelect(props.k);
    }
    return (
        <ListItemButton selected={selected} divider onClick={handleClick} >
            {selected && <CheckBox fontSize="small" sx={{mr:1}} /> }
            <Box sx={Tstyle} >
                <Typography  variant="subtitle2">{props.date}</Typography>
                <Box display='flex'>
                    {props.type==="credit"? <Typography variant="subtitle2">+</Typography>:
                    <Typography variant="subtitle2">-</Typography>  }
                    <Typography variant="subtitle2">{props.amt}</Typography> 
                </Box>
            </Box>
        </ListItemButton>
    )
}


export default function Transactions(props){
    const [visibleTrans, setVisibleTrans] = useState([])
    useEffect(()=>{
        console.log("running effect")
        let {credits,debits, minAmt, maxAmt,startDate,endDate} = props.filterby;
        console.log(credits,debits, minAmt, maxAmt,startDate,endDate);
        let arr=[];

        for(let k in props.transactions){
            let obj = props.transactions[k];
            let {ctime,date,amt,type,notes} = obj;
            // console.log(ctime,date,amt,type,notes)
           
            if(
                minAmt<=Number(amt) &&
                Number(amt)<=maxAmt && 
                (new Date(date))>=(new Date(startDate)) && 
                (new Date(date))<=(new Date(endDate)) &&
                ((type==='credit' && credits) || (type==='debit' && debits))
            )
                arr.push(obj)
        }
        arr.sort((a,b)=>{
            switch(props.sortby){
                case "latest":
                    return new Date(b.date) - new Date(a.date);
                case "oldest":
                    return new Date(a.date)-new Date(b.date); 
                case "highest":
                    return Number(b.amt)-Number(a.amt); 
                case "lowest": 
                    return Number(a.amt)-Number(b.amt); 
                default:
                    return new Date(a.date)-new Date(b.date); 
            }
        })
        console.log(arr);
        setVisibleTrans(arr);

    }, [props.sortby, props.filterby, props.transactions])

    
    function handleSelect(key){
        let arr =props.selectedTrans;
        console.log("find", arr.find(e => e===key))
        let x = arr.indexOf(key);
        if (x!==-1){
            arr.splice(x,1);
        }else{
            arr.push(key);
        }
        console.log(arr,x)
        props.setSelectedTrans(arr)
    }
    return (
        <Box sx={style} className="scroll">
            <Box sx={{...stick}}>
                <ListItem >
                    <Typography variant="body2">Transactions</Typography>
                </ListItem>
                <ListItem divider>
                    {/* <Typography  variant="caption">Selected</Typography> */}
                    <Box sx={{...Tstyle}}>
                        <Typography  variant="caption">Date</Typography>
                        <Typography  variant="caption">Amount</Typography>
                    </Box>  
                </ListItem>
            </Box>
            <Box className="scroll">
                {
                    visibleTrans.map((e)=>{
                        let {ctime,date,amt,type,notes} = e;
                        return (
                            <Transaction handleSelect={handleSelect} date={date} amt={amt} key={ctime} k={ctime} type={type} notes={notes} />
                        )
                    })
                }
            </Box>
        </Box>
    )
}

const style = {
    borderRadius:"8px",
    // boxShadow:"0px 2px 5px grey",
    // height:"minContent",
    overflowY:"scroll",
    p:1,
    pt:0,
}
const stick ={
    position:"sticky",
    top:'0px',
    zIndex:10,
    pt:1,
    backgroundColor:"rgb(230, 230, 230)",
}



