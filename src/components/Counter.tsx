import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, IconButton, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import PauseCircleOutlineOutlinedIcon from "@material-ui/icons/PauseCircleOutlineOutlined";
import { AppState, createAppState } from "../store/AppState";
import NoSleep from "nosleep.js";
import { reset, timeDecrease } from "../store/Actions";
import audioSrc from "../assets/sound.mp3";

type Activity = "WORK" | "BREAK" | "LONG BREAK";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    width: "200px",
  },
  circProgress1: {
    color: (prop: { activity: Activity }) =>
      prop.activity === "WORK" ? theme.palette.secondary.main : "#43a047",
  },
  circProgress2: {
    position: "absolute",
    left: "0px",
    top: "0px",
    color: "#e0e0e0",
  },
  timeText: {
    position: "absolute",
    left: "0px",
    top: "60px",
    width: "200px",
    textAlign: "center",
  },
  buttonsGrid: {
    "& > *": {
      marginTop: theme.spacing(3),
    },
  },
  icon: {
    fontSize: 60,
  },
}));

const getActivity = (
  work: number,
  shortBreak: number,
  longBreak: number,
  rounds: number,
  timeLeft: number
): { name: Activity; remaining: number; duration: number } => {
  if (timeLeft < longBreak * 60) {
    return { name: "LONG BREAK", remaining: timeLeft, duration: longBreak * 60 };
  }

  let rem = (timeLeft - longBreak * 60) % (work * 60 + shortBreak * 60);

  if (rem < work * 60 || timeLeft === createAppState({ work, shortBreak, longBreak, rounds }).timeLeft) {
    return { name: "WORK", remaining: rem, duration: work * 60 };
  }

  return { name: "BREAK", remaining: rem - work * 60, duration: shortBreak * 60 };
};

const printTime = (timeNum: number): string => {
  let min = Math.floor(timeNum / 60)
    .toString()
    .padStart(2, "0");
  let sec = (timeNum % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
};

const playSound = () => {
  (document.getElementById("sound") as HTMLAudioElement).play();
};

const Counter: React.FC = () => {
  const [active, setActive] = useState(false);
  const work = useSelector<AppState, number>((state) => state.work);
  const shortBreak = useSelector<AppState, number>((state) => state.shortBreak);
  const longBreak = useSelector<AppState, number>((state) => state.longBreak);
  const rounds = useSelector<AppState, number>((state) => state.rounds);
  const timeLeft = useSelector<AppState, number>((state) => state.timeLeft);
  const dispatch = useDispatch();
  const activity = getActivity(work, shortBreak, longBreak, rounds, timeLeft);

  const classes = useStyles({ activity: activity.name });

  const noSleep = useRef(new NoSleep());

  useEffect(() => {
    startPause(false);
  }, [work, shortBreak, longBreak, rounds]);

  useEffect(() => {
    let myTimer: NodeJS.Timeout;

    function count() {
      if (activity.remaining === 0) {
        playSound();
        if (timeLeft === 0) {
          startPause(false);
        } else {
          dispatch(timeDecrease());
        }
      } else {
        dispatch(timeDecrease());
      }
    }

    if (active) {
      myTimer = setInterval(count, 1000);
    }
    return function cleanup() {
      clearInterval(myTimer);
    };
  });

  const startPause = (start?: boolean) => {
    setActive((prevActive) => {
      if (start || (start === undefined && prevActive === false)) {
        noSleep.current.enable();
        return true;
      } else {
        noSleep.current.disable();
        return false;
      }
    });
  };

  const handleReset = () => {
    setActive(false);
    dispatch(reset());
  };

  return (
    <div className={classes.wrapper}>
      <CircularProgress
        variant="static"
        value={100}
        size="200px"
        thickness={3}
        className={classes.circProgress1}
      />
      <CircularProgress
        variant="static"
        value={100 - (activity.remaining / activity.duration) * 100}
        size="200px"
        thickness={3}
        className={classes.circProgress2}
      />
      <div className={classes.timeText}>
        <Typography variant="h4" component="h1" gutterBottom>
          {printTime(activity.remaining)}
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom>
          {activity.name}
        </Typography>
      </div>
      <Grid container direction="column" alignContent="center" className={classes.buttonsGrid}>
        <IconButton
          size="small"
          color="inherit"
          aria-label={active ? "pause" : "start"}
          onClick={() => startPause()}
        >
          {active ? (
            <PauseCircleOutlineOutlinedIcon color="primary" className={classes.icon} />
          ) : (
            <PlayCircleOutlineOutlinedIcon color="primary" className={classes.icon} />
          )}
        </IconButton>
        <Button color="secondary" onClick={handleReset}>
          Reset
        </Button>
        <audio id="sound" src={audioSrc} />
      </Grid>
    </div>
  );
};

export { Counter as default, getActivity, playSound };
