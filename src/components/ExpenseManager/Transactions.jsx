import { Box, ListItem, ListItemButton,FormLabel, Typography, Button, TextField, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import "./Transactions.css"
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit, ExpandMore } from "@mui/icons-material";
import AddPopup from "./Popup/AddPopup";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { removeTrans } from "../../Redux/Slices/accountSlice";

const StyledLIB = styled(ListItemButton)(({ theme }) => ({
    // width: 300,
    // color: theme.palette.success.main,
      '&.Mui-selected': {
        //   transform:"scale(1.001,1.01)",
        // zIndex:,
        boxShadow: `0 1px 10px darkgrey, 0px 1px 7px grey, 0 0 5px lightgrey,0 0 10px white `,
        transition: 'box-shadow 0.5s ease-in-out',
      },
    // },
    // "&:nth-of-type(2n+1)":{
    //     backgroundColor:"rgb(197, 197, 197)",
    // },
  }));
  


const Tstyle={
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    // mt:0.5,
    width:"100%",
    // borderBottom:"1px solid grey",
    // borderColor:"#fff"
}
const Transaction = (props) => {
    const [edit,setEdit] = useState(false);
    const dispatch = useDispatch()

    function toggleEdit(){setEdit(!edit);}
    function handleDelete(){
        dispatch(removeTrans({accName:props.accName, ctime:props.ctime}))
    }
    function beautifyDate(date){
        let months = ["Jan", 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let sufix = ['th', 'st', 'nd', 'rd']
        let d = date.split('-');
        let [yr, mn, dt] = d;
        if(dt){
            return <>{Number(dt)}<sup>{(Number(dt)%10)>3?"th":sufix[Number(dt)%10]}</sup>{" "+months[Number(mn)-1]},{yr.slice(2)}</>
        }else if (mn){
            return months[Number(mn)-1]+","+yr.slice(2)
        }
        return yr
    }
    return (
        <Accordion disableGutters sx={{p:0, m:0, ...shadow}}>
        <AccordionSummary expandIcon={<ExpandMore />} sx={{px:0.9}}>
        {/* <StyledLIB selected={selected} sx={{zIndex:(props.group?2:1)}} className={props.colored?"colored":""} divider onClick={toggleSelect}> */}
            <Box sx={Tstyle} >
                <FormLabel>
                <Typography  variant="subtitle2" fontWeight={500}>{beautifyDate(props.date)}</Typography>
                </FormLabel>
                <Box display='flex'>
                    {props.type==="credit"? <Typography variant="subtitle2">+</Typography>:
                    <Typography variant="subtitle2">-</Typography>  }
                    <Typography variant="subtitle2">{props.amt}</Typography> 
                </Box>
            </Box>
        {/* </StyledLIB> */}
        </AccordionSummary>
        <AccordionDetails sx={{px:0.8}}>
        {
            (!props.group) &&
            <Box sx={Tstyle}>
                <Button size="small">
                    <Box onClick={handleDelete} color='error' display='flex' flexDirection='column' alignItems='center'>
                        <DeleteIcon color="error"/>
                        Delete
                    </Box>
                </Button> 
                <TextField size="small" sx={{border:0, textAlign:'center'}} defaultValue={(props.notes)?props.notes:"Edit to add notes"} multiline maxRows={3} disabled variant="standard" />
                <Button size="small" onClick={toggleEdit}>
                    <Box  display='flex' flexDirection='column' alignItems='center'>
                        <Edit/>
                        Edit
                    </Box>
                </Button>
                {
                edit && 
                <AddPopup 
                open={edit} 
                setOpen={setEdit} 
                edit={{amt:props.amt, notes:props.notes, type:props.type, date:props.date, ctime:props.ctime}}
                />
                }
            </Box>
        }
        {
            (props.group) && 
            <Box sx={{mx:0.3}}>
                {
                    props.objs.map((e)=>{
                        return (
                            <Transaction {...props} {...e} key={e.ctime} group={undefined}/>
                        )
                    })
                }
            </Box>
        }
        </AccordionDetails>
        </Accordion>
    )
}


export default function Transactions(props){
    const transactions = useSelector(state=>state.accounts[props.accName].trans);
    const sort = useSelector((state)=>state.insight.sort);
    const filters = useSelector((state)=>state.insight.filters);
    const group = useSelector((state)=>state.insight.group);


    const [visibleTrans, setVisibleTrans] = useState([])
    // const [selected, setSelected] = useState("");

    useEffect(()=>{
        // console.log("running effect to reOrder transactions.", transactions)
        let {credits,debits, minAmt, maxAmt,startDate,endDate} = filters;
        // console.log(credits,debits, minAmt, maxAmt,startDate,endDate);
        let arr=[];

        //filter
        for(let k in transactions){
            let obj = transactions[k];
            let {ctime,date,amt,type,notes} = obj;
            // console.log(ctime,date,amt,type,notes)
           
            if(
                minAmt<=Number(amt) &&
                Number(amt)<=maxAmt && 
                (new Date(date))>=(new Date(startDate)) && 
                (new Date(date))<=(new Date(endDate)) &&
                ((type==='credit' && credits) || (type==='debit' && debits))
            )
                arr.push(obj);
        }
        if(arr.length===0){
            setVisibleTrans(arr);
            return ;
        }
        //group
        if(group.dmy!=="none"){
            // if (!(props.sortby==='latest' || props.sortby==='oldest')){
            arr.sort((a,b)=>(new Date(b.date) - new Date(a.date)));
            // }
            let narr=[];
            // console.log(new Date().getTime())
            let grp = {
                date:arr[0].date,
                amt:Number(arr[0].amt),
                objs:[arr[0], ],
                ctime:arr[0].date,
                type:arr[0].type,
            }
            for(let i=1; i<arr.length; i++){
                let flag=false;
                switch(group.dmy){
                    case 'day':{
                        if(grp.date === arr[i].date)
                            flag=true;
                        break;
                    }
                    case 'month':{
                        if(grp.date.slice(0,7) === arr[i].date.slice(0,7))
                            flag=true;
                        break;
                    }
                    case 'year':{
                        if(grp.date.slice(0,4) === arr[i].date.slice(0,4))
                            flag=true;
                        break;
                    }
                    default:
                        break;
                }
                if(flag){
                    grp.amt += (Number(arr[i].amt)*(arr[i].type==='credit'?1:-1));
                    grp.objs.push(arr[i]);
                    if(grp.amt>0)
                        grp.type='credit';
                    else
                        grp.type='debit';
                }
                else{
                    if(group.dmy==='month')grp.date=grp.date.slice(0,7);
                    if(group.dmy==='year')grp.date= grp.date.slice(0,4);
                    narr.push({...grp, amt:Math.abs(grp.amt)})
                    // console.log(new Date().getTime())
                    grp = {
                        date:arr[i].date,
                        amt:Number(arr[i].amt),
                        objs:[arr[i], ],
                        ctime:arr[i].date,
                        type:arr[i].type,
                    }
                }
            }
            if(group.dmy==='month')grp.date=grp.date.slice(0,7);
            if(group.dmy==='year')grp.date= grp.date.slice(0,4);
            narr.push({...grp, amt:Math.abs(grp.amt)});
            // console.log("GROUPED", narr);
            arr = narr;
        }
        //sort
        arr.sort((a,b)=>{
            switch(sort){
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
        // console.log(arr);
        setVisibleTrans(arr);

    }, [sort, filters, transactions, group])

    return (
        <Box sx={{...style, mx:1}} className="scroll">
            <Box sx={{...stick}}>
                {/* <ListItem >
                    <Typography variant="body2">Transactions</Typography>
                </ListItem> */}
                <ListItem >
                    {/* <Typography  variant="caption">Selected</Typography> */}
                    <Box sx={{...Tstyle, mt:0, mb:0.5}}>
                        <Typography  variant="caption">Date</Typography>
                        <Typography  variant="caption">Amount</Typography>
                    </Box>  
                </ListItem>
            </Box>
            {/* <ClickAwayListener onClickAway={()=>setSelected("")}> */}
            <Box className="scroll shadow" >
                {
                    visibleTrans.map((e,idx)=>{
                        let {ctime,date,amt,type,notes} = e;
                        return (
                            <Transaction 
                            colored={idx%2===0}
                            // onClick={()=>handleClick(ctime)}
                            date={date} 
                            amt={amt} 
                            key={ctime} ctime={ctime} 
                            type={type} 
                            notes={notes} 
                            accName={props.accName}
                            // selected={ctime===selected}
                            // addTransaction={props.addTransaction}
                            group={e.objs!==undefined} 
                            objs={e.objs}
                            />
                        )
                    })
                }
            </Box>
            {/* </ClickAwayListener> */}

        </Box>
    )
}

const style = {
    borderRadius:"8px",
    // boxShadow:"0px 2px 5px grey",
    // height:"minContent",
    overflowY:"scroll",
    // width:"100%",
    // margin: '0 auto',
    // pt:0,
}
const stick ={
    position:"sticky",
    top:'0px',
    zIndex:10,
    // pt:0.5,
    backgroundColor:"rgb(230, 230, 230)",
}




const shadow={
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    // boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
}