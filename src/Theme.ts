import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import cyan from "@material-ui/core/colors/cyan";

const myTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: blueGrey[900],
      paper: blueGrey[900],
    },
    primary: {
      main: cyan[200],
    },
    secondary: {
      main: "#fe4e4d",
    },
  },
  zIndex: {
    tooltip: 1000,
  },
});

export { myTheme };
