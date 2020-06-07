import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { add, parseJSON, isPast } from "date-fns";
import { useReactPWAInstall } from "react-pwa-install";
import logo from "../assets/icon-72x72.png";

const useStyles = makeStyles((theme) => ({
  "@keyframes slideUp": {
    from: { transform: "translateY(0)" },
    to: { transform: "translateY(-100px)" },
  },
  banner: {
    animation: "$slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s both",
    position: "fixed",
    bottom: "-100px",
    height: "70px",
    width: "100%",
    backgroundColor: "white",
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerContent: {
    width: "320px",
  },
}));

type Props = {
  onInstall: () => void;
  onCancel: () => void;
};

const InstallBanner: React.FC<Props> = ({ onInstall, onCancel }) => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Grid container justify="space-between" className={classes.bannerContent}>
        <Grid item xs={5}>
          <Typography variant="body2">Get the best experience!</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button color="secondary" size="small" onClick={onCancel}>
            Not now
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button color="primary" variant="contained" size="small" onClick={onInstall}>
            Install App
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const A2HS: React.FC = () => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const [bannerClicked, setBannerClicked] = useState(false);

  useEffect(() => {
    if (isInstalled()) {
      window.resizeTo(370, 640);
    }
  }, [isInstalled]);

  const recordInstallAttempt = () => {
    localStorage.setItem("installAttemptDate", JSON.stringify(new Date()));
    if (!bannerClicked) {
      setBannerClicked(true);
    }
  };

  const shouldShow = () => {
    let installAttemptDate = localStorage.getItem("installAttemptDate");
    if (!installAttemptDate) {
      return true;
    }
    return isPast(add(parseJSON(installAttemptDate), { weeks: 1 }));
  };

  const handleInstallClick = () => {
    pwaInstall({
      title: "Install Pomo Timer",
      logo,
      features: (
        <ul style={{ paddingLeft: "20px" }}>
          <li>Customizable timer settings</li>
          <li>Overall progress bar</li>
          <li>Works offline</li>
        </ul>
      ),
      description:
        "Improve your focus and efficiency with this customizable pomodoro timer. Reach the flow and be highly productive!",
    })
      .then()
      .catch()
      .finally(() => recordInstallAttempt());
  };

  return (
    <>
      {supported() && !isInstalled() && shouldShow() && (
        <InstallBanner onInstall={handleInstallClick} onCancel={recordInstallAttempt} />
      )}
    </>
  );
};

export default A2HS;
