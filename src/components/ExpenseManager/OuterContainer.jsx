import { Box,ThemeProvider } from "@mui/material";
import "./OuterContainer.css"
import Tools from "./Tools"
import Stats from "./Stats";
import Transactions from "./Transactions"
import { createTheme } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "../../Redux/Slices/accountSlice";
import Header from "./Header";
// import { useEffect, useState } from "react";

const theme=createTheme({
    
    palette:{
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#f3e5f5',
            main: '#ce93d8',
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
    },
    typography: {
        fontFamily: [
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ].join(",")
    }
})

export default function OuterContainer(props){
    
    const dispatch = useDispatch();
    const accounts = useSelector(state=>state.accounts);
    // const trans = useSelector(state=>state.trans);
    const params = useParams();
    // useEffect(()=>{
    //     console.log(params.accName);
    //     if(trans.accName===""){
    //         // console.log("if")
    //         dispatch(setTransFromAcc(accounts[params.accName]))
    //     }
    //     else if (trans.accName === params.accName);
    //     else{
    //         // console.log("else");
    //         dispatch(setAccount({accName:trans.accName, obj:trans}))
    //         dispatch(setTransFromAcc(accounts[params.accName]))
    //     }
    // },[])

    return (
        <ThemeProvider theme={theme}>
        <Box className="outerContainer">
            <Header accName={params.accName}/>
            <Stats accName={params.accName}/>
            <Tools accName={params.accName}/>
            <Transactions accName={params.accName}/>
            <Outlet/>
        </Box>
         </ThemeProvider>
    )
} 