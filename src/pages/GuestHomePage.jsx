import { Grid, Box, Button } from '@mui/material';
import React from "react";
import logo from "../assets/images/bb-logo.png"


const GuestHomePage = (props) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      height="80vh"
    >
      <Grid item>
        <Box 
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={2}
        >
          <img src={logo} alt="Brain Bounce logo" style={{ width: '50%', marginTop: '50%' }}/>
        </Box>
      </Grid>
      <Grid item>
        <Box>
          <Button disabled={false} variant="outlined" href={props.href}>
            <strong> LOGIN / SIGNUP </strong>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default GuestHomePage;
