import { Box, Button, TextField, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import "./Stats.css"
import { useState } from "react";

export default function Stats(props){
    const [edit, setEdit] = useState(false);
    // const inp = useRef(null);
    const handleClick = ()=>{
        setEdit(!edit);
        // setTimeout(()=>inp.current.focus(), 100);
    }
    return (
        <Box sx={style} >
            <Typography  variant="body2" sx={{color:"#212121"}}>Balance</Typography>
            <Box className="balance" mx={1} >
            {edit && <TextField 
                // ref={inp} 
                autoFocus
                variant="standard"
                type={"number"} 
                onBlur={()=>setEdit(!edit)} 
                value={props.bal} 
                onChange={(e)=>props.setBal(Number(e.target.value))} 
            />}
                {
                    !edit && <Typography sx={{px:1}} variant="h4">{props.bal}</Typography> 
                }
                <Button sx={{p:0, m:0}} onClick={handleClick}>
                    <Box display='flex' flexDirection="column" alignItems={'center'}>
                        <Edit/>
                        Edit
                    </Box>
                </Button>
            </Box>
            <div className="spacer"/>

            <Typography variant="body2" sx={{color:"#212121"}}>This month</Typography>

            {/* <Box className="balance" mx={1}>
                <Typography variant="subtitle2" >Credit</Typography>
                <Typography variant="subtitle2" >{props.credit}</Typography>
            </Box>
            <Box className="balance" mx={1} >
                <Typography variant="subtitle2">Debit</Typography>
                <Typography variant="subtitle2">{props.debit}</Typography>
            </Box> */}
            <Box sx={{display:'flex'}} className="balance">
            <Box mx={1} sx={{display:'flex', flexDirection:"column", alignItems:'center', px:2}}>
                <Typography variant="subtitle1" fontWeight={500}>{props.credit}</Typography>
                <Typography variant="subtitle1" fontWeight={500}>Credit</Typography>
            </Box>
            <Box mx={1} sx={{display:'flex', flexDirection:"column", alignItems:'center', px:2, color:"error"}}>
                <Typography variant="subtitle1" fontWeight={500}>{props.debit}</Typography>
                <Typography variant="subtitle1" fontWeight={500}>Debit</Typography>
            </Box>
            </Box>

        </Box>
    )
}
 
const style={
    borderRadius:'8px',
    boxShadow:"0px 2px 5px lightgrey",
    p:2,
    flexShrink:'0',
    backgroundColor:"white",
}