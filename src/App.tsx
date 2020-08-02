import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import Div100vh from "react-div-100vh";

import InfoLink from "./components/InfoLink";
import Settings from "./components/Settings";
import Footer from "./components/Footer";
import Counter from "./components/Counter";
import ProgressBar from "./components/ProgressBar";
import A2HS from "./components/A2HS";

const useStyles = makeStyles((theme) => ({
  center: {
    width: "320px",
    minHeight: "100%",
    position: "relative",
    paddingBottom: "80px", // footer height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
  },
  grid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <Div100vh style={{ display: "flex", justifyContent: "center", minHeight: "100rvh" }}>
      <div className={classes.center}>
        <div className={classes.content}>
          <Grid container spacing={0} justify="space-between" className={classes.grid}>
            <InfoLink />
            <Settings />
          </Grid>
          <Box display="flex">
            <Counter />
            <ProgressBar />
          </Box>
        </div>
        <Footer />
        <A2HS />
      </div>
    </Div100vh>
  );
}
