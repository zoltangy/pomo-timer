import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";

import InfoLink from "./components/InfoLink";
import Settings from "./components/Settings";
import Footer from "./components/Footer";
import Counter from "./components/Counter";
import ProgressBar from "./components/ProgressBar";
import A2HS from "./components/A2HS";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  center: {
    width: "320px",
    minHeight: "100vh",
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
    <div className={classes.root}>
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
    </div>
  );
}
