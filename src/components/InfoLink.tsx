import React, { useState, useEffect } from "react";
import {
  IconButton,
  Link,
  Dialog,
  Typography,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 30,
  },
}));

function OfflineDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        <IconButton
          edge="start"
          aria-label="Info link offline"
          color="primary"
          size="small"
          onClick={handleOpen}
        >
          <InfoOutlinedIcon className={classes.icon} />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-label="Offline info dialog"
        aria-describedby="offline-link-description"
      >
        <DialogTitle>
          <Grid container spacing={1} justify="space-between">
            <Typography variant="h6" component="span">
              Oops!
            </Typography>
            <IconButton
              edge="end"
              aria-label="close dialog"
              color="primary"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Typography id="offline-link-description" align="justify" gutterBottom>
            Your device seems to be offline, so the information page can't be accessed at the moment, but the
            rest of the app is fully functional even when offline.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function OnlineInfo() {
  const classes = useStyles();
  return (
    <Link href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noopener">
      <IconButton edge="start" aria-label="Info link online" color="primary" size="small">
        <InfoOutlinedIcon className={classes.icon} />
      </IconButton>
    </Link>
  );
}

const InfoLink: React.FC = () => {
  const [online, setOnline] = useState<boolean>(true);

  useEffect(() => {
    function online() {
      setOnline(true);
    }
    function offline() {
      setOnline(false);
    }

    window.addEventListener("offline", offline);
    window.addEventListener("online", online);
    return function cleanup() {
      window.removeEventListener("offline", offline);
      window.removeEventListener("online", online);
    };
  }, []);

  return <>{online ? <OnlineInfo /> : <OfflineDialog />}</>;
};

export default InfoLink;
