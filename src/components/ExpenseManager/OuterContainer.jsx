import { Box,ThemeProvider } from "@mui/material";
import "./OuterContainer.css"
import Tools from "./Tools"
import Stats from "./Stats";
import Transactions from "./Transactions"
import { createTheme } from "@mui/material";
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
                    // "&:nth-of-type(2n+1)":{
                    //     backgroundColor:"rgb(197, 197, 197)",
                    // },
                    // "&.Mui-selected":{
                    //     color:'#757ce8',
                    // }
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
    const [group, setGroup] = useState({
        dmy:"none",
        label:"none",
    });
    function addTrans(date, amt, type, notes, ctime){
        if(ctime){
            console.log("removing")
            removeTrans(ctime);
        }
        ctime = ctime?ctime:new Date().getTime();
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

        let dt = obj.date;
        let tc=0, td=0, m=new Date().getMonth();
        if(obj.type==='credit')
            tc+=Number(obj.amt);
        else
            td-=Number(obj.amt);
        console.log(tc, td);
        if(new Date(dt).getMonth() === m){
            setCredit(credit+tc);
            setDebit(debit-td);
        }
        setiBal(curr=>curr+tc+td);
    }

    function removeTrans(ctime){
        let obj = trans[ctime];
        let dt = obj.date;
        let tc=0, td=0, m=new Date().getMonth();

        if(obj.type==='credit')
            tc+=Number(obj.amt);
        else
            td-=Number(obj.amt);
        if(new Date(dt).getMonth() === m){
            setCredit(credit-tc);
            setDebit(debit+td);
        }
        setiBal(curr=>curr-tc-td);
        setTrans((curr)=>{
            let allT = {...curr}
            delete(allT[ctime])
            return allT;
        })
    }

    useEffect(()=>{
        // adjust credit, debit
        console.log("recalculating cr, dr" );
        let m = new Date().getMonth();
        let c = 0,d=0,b=0;
        for (let key in trans){
            let dt = trans[key].date;
            let tc=0, td=0;
            if(trans[key].type==='credit')
                    tc+=Number(trans[key].amt);
                else
                    td-=Number(trans[key].amt);
            if(new Date(dt).getMonth() === m){
                c+=tc;
                d-=td;
            }
            b+=(tc+td);
            console.log(new Date(dt).getMonth(),m)
        }
        setCredit(c);
        setDebit(d);
        setiBal(b);
    },[])

    return (
        <ThemeProvider theme={theme}>
        <Box className="outerContainer">
            <Stats 
            bal={iBal} setBal={setiBal} 
            credit={credit} 
            debit={debit}
            />
            <Tools 
            addTrans={addTrans}
            filters={filters} setFilters={setFilters}
            sort={sort} setSort={setSort}
            addTransaction={addTrans}
            group={group} setGroup={setGroup}
            />
            <Transactions 
            transactions={trans}
            sortby={sort}
            filterby={filters}
            group={group}
            removeTrans={removeTrans}
            addTransaction={addTrans}
        />
        </Box>
         </ThemeProvider>
    )
} 