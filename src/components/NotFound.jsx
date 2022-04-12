import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Box, FormLabel, Typography } from "@mui/material";
import {Link} from 'react-router-dom'

export default function NotFound(props){
    return (
        <Box p={5} sx={{textAlign:"center"}}>
            <FormLabel>
                <Typography variant="h2">OOPS...</Typography>
                <br/>
                
                <Typography variant="h4">Theres Nothing Here.</Typography>
            </FormLabel>
            <Link to="/" style={{textDecoration:'none'}} >
                <Typography sx={{mt:10}} variant="h5">Lets go back Home.</Typography>
                <ArrowForwardIosRounded fontSize="large" />
            </Link>
        </Box>
    )
}