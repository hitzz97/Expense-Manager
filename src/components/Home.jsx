import { ArrowCircleRightOutlined } from "@mui/icons-material";
import { Box, Grid,  Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

export default function Home (props){
    
    return (
        <Box>
            <Box className="topBar">
                <Link to='/accounts' className='accLink'>
                    <Typography>Go to App</Typography>
                    <ArrowCircleRightOutlined fontSize="large" sx={{ml:1, mr:3}}/>
                </Link>
            </Box>
            <Box className="headingContainer">

                <Typography className="heading" variant="h3">
                    Manage all your Expenses
                </Typography> 
                <Typography className="heading" variant="h5">
                    at one place
                </Typography>
                
                <Box mt={5}>
                    <Typography variant="h6" sx={{mb:2, color:'lightgrey'}} className="heading" >Features</Typography>
                    <Grid container rowGap={3} justifyContent="center" columnGap={3}>
                        <Grid item xs={8} md={3}>
                            <Box className="featureBox">
                            <Typography variant="h6" className="heading">Manage Expenses</Typography>
                            <Typography variant="body1"  sx={{mt:1}}>
                            Keep track of all your expenses and get insights on your expenditure patterns and visualise 
                            your expenses with graphs and more. 
                            </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={8} md={3}>
                            <Box className="featureBox">
                            <Typography variant="h6" className="heading">Multiple Accounts</Typography>
                            <Typography variant="body1" sx={{mt:1}}>
                            Manage more than one accounts without much hastle at same place. Switch between multiple
                            accounts with just few clicks.
                            </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={8} md={3}>
                            <Box className="featureBox">
                            <Typography variant="h6" className="heading">Analytical Tools</Typography>
                            <Typography variant="body1" sx={{mt:1}}>
                            Use various available tools to fillter, sort and group your transaction into categories to 
                            gain insights and keep track of your transactions.
                            </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    {/* <Pagination sx={{'& .MuiPaginationItem-root':{color:"white"}, "& .MuiPagination-ul":{justifyContent:'center'}}} count={10} page={page} color="primary" onChange={handlePageChange} />        */}
                </Box>
            </Box>
            <Box className="howToUseContainer">
                <Typography sx={{color:'gray'}} variant="h3" fontWeight={400}>
                    How to use
                </Typography> 
                <Typography sx={{color:'gray'}} variant="h5" fontWeight={400}>
                    Tips and tricks to use the application
                </Typography>

                <Box mt={5}>
                    <Grid container rowGap={3} justifyContent="center" columnGap={3}>
                        <Grid item xs={8} md={5}>
                            <Box className="howToBlock">
                            <Typography variant="h6" >Create Account</Typography>
                            <Typography variant="body1"  sx={{mt:1}}>
                            Click on the "Go to App" button on the top right corner and you will be navigated to the accounts page
                            where you can create and delete accounts. You can create more than one accounts and manage them independently
                            </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={8} md={5}>
                            <Box className="howToBlock">
                            <Typography variant="h6" >Add Transaction</Typography>
                            <Typography variant="body1" sx={{mt:1}}>
                            Select the account you want to add transaction into from the list of accounts already created. Then Click on the "Add" 
                            button to add the transaction select amount, date, category and optional note and click on add.
                            </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={8} md={5}>
                            <Box className="howToBlock">
                            <Typography variant="h6" >Edit Transactions</Typography>
                            <Typography variant="body1" sx={{mt:1}}>
                            Select the transaction you want to edit from the list of available transactions present. Then the transaction details will drop
                            down and then you can click on the edit button to edit the details.
                            </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={8} md={5}>
                            <Box className="howToBlock">
                            <Typography variant="h6" >Sort Transactions</Typography>
                            <Typography variant="body1" sx={{mt:1}}>
                            Transactions can be sorted in assending and decending order according to date of the transaction or the transaction amount. To Sort
                            the transaction open the account on which the desired operation is to be performed and click on sort button and select the desired
                            parameter.
                            </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={8} md={5}>
                            <Box className="howToBlock">
                            <Typography variant="h6" >Group Transactions</Typography>
                            <Typography variant="body1" sx={{mt:1}}>
                            Transactions can be grouped by category, day, month and year. on grouping transaction the sum of transaction is displayed for each group rather 
                            than individual transactions. Select Group button and apply required group parameter.
                            </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={8} md={5}>
                            <Box className="howToBlock">
                            <Typography variant="h6" >Filter Transactions</Typography>
                            <Typography variant="body1" sx={{mt:1}}>
                            Transactions can be filterd based on various parameters like transaction type(credit/debit), date, amount and category.
                            To apply filters open the desired account then click on the filter button that will bring up the filter parameters available 
                            then you can select different parameters according to requirement and only transaction satisfying the criteria will be visible.
                            </Typography>
                            </Box>
                        </Grid>
                        
                    </Grid>
                    {/* <Pagination sx={{'& .MuiPaginationItem-root':{color:"white"}, "& .MuiPagination-ul":{justifyContent:'center'}}} count={10} page={page} color="primary" onChange={handlePageChange} />        */}
                </Box>

            </Box>
        </Box>
    )
}