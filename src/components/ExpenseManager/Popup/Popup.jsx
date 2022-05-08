/* eslint-disable no-restricted-globals */
import { Box, Grid, SwipeableDrawer } from "@mui/material";
import { useEffect } from "react";



export default function Popup(props) {
    useEffect(()=>{
        history.pushState({}, '', "#popup");
        window.onhashchange = ()=>{
            console.log("Poop up useEffect running")
            props.show(false);
            // history.forward();
        }
        return ()=>{
            window.onhashchange = "";
        }
    }, [])

    const toggleDrawer = (open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
        props.show(open);
        setTimeout(()=>history.back(), 100);
      };
    return (
        <SwipeableDrawer
        anchor={'bottom'}
        open={props.open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
            '&.MuiDrawer-modal':{
                backdropFilter:"blur(2px)",
            },
            
        }}
        PaperProps={{
            sx:{
                borderTopRightRadius:'20px',
                borderTopLeftRadius:'20px',
            }
        }}
        >
            {/* <Grid item xs={12} md={8}> */}
            {props.children}
            {/* </Grid> */}

        </SwipeableDrawer>
    )
}