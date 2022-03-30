import { Box,ThemeProvider } from "@mui/material";
import "./OuterContainer.css"
import Tools from "./Tools"
import Stats from "./Stats";
import Transactions from "./Transactions"
import { createTheme } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useEffect, useState } from "react";


const theme=createTheme({
    
    palette:{
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
    components:{
        MuiListItemButton:{
            styleOverrides:{
                root:{
                    //the pseudo class ":nth-child" is potentially unsafe when doing server-side rendering. Try changing it to ":nth-of-type".
                    "&:nth-child(odd)":{
                        backgroundColor:"rgb(197, 197, 197)",
                    },
                    "&.Mui-selected":{
                        color:'#757ce8',
                    }
                }
            }
        }
    }
})

export default function OuterContainer(props){
    const [iBal, setiBal] = useState(0);
    const [trans, setTrans] = useState({});
    const [filters, setFilters] = useState({
        credits:true, 
        debits:true, 
        minAmt:0, 
        maxAmt:99999999,
        startDate:'1990-03-13',
        endDate:'2050-01-13',
    });
    const [sort, setSort] = useState("latest");
    const [credit,setCredit] = useState(0);
    const [debit, setDebit] = useState(0);
    const [selectedTrans, setSelectedTrans]=useState([]);

    function addTrans(date, amt, type, notes){
        let ctime =new Date().getTime();
        let obj = {
            date:date, 
            amt:amt, 
            type:type,
            notes:notes,
            ctime:ctime
        }
        setTrans((curr)=>{
            let newObj = {...curr, [ctime]:obj};
            return newObj
        });
        if(type==='credit'){
            setiBal(Number(iBal)+Number(amt));
        }else{
            setiBal(Number(iBal)-Number(amt));
        }
    }

    function removeTrans(){
        setTrans((curr)=>{
            let allT = curr.filter((e)=>(!(selectedTrans.find(e.ctime)===undefined)));
            return allT;
        })
    }

    useEffect(()=>{
        // adjust credit, debit
        let m = new Date().getMonth();
        let c = 0,d=0;
        for (let key in trans){
            let dt = trans[key].date;
            if(new Date(dt).getMonth() === m){
                if(trans[key].type==='credit')
                    c+=Number(trans[key].amt);
                else
                    d-=Number(trans[key].amt);
            }
        }
        setCredit(c);
        setDebit(d);
    },[trans])

    return (
        <ThemeProvider theme={theme}>
        <Box className="outerContainer">
            <Stats 
            bal={iBal} setBal={setiBal} 
            credit={credit} 
            debit={debit}
            />
            <Tools 
            addTrans={addTrans} removeTrans={removeTrans}
            filters={filters} setFilters={setFilters}
            sort={sort} setSort={setSort}
            addTransaction={addTrans}
            />
            <Transactions 
            transactions={trans}
            sortby={sort}
            filterby={filters}
            selectedTrans={selectedTrans} setSelectedTrans={setSelectedTrans}
            />
        </Box>
         </ThemeProvider>
    )
} 