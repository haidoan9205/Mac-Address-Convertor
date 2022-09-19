import * as React from "react";
import { Grid, Box } from "@mui/material";
import FileInput from "./FileInput";

const Body = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
   
        <Grid item xs={12}>
          <FileInput></FileInput>
        </Grid>
       
    </Box>
  );
};

export default Body;
