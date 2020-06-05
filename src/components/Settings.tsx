import React, { useState, forwardRef, useEffect, useCallback } from "react";
import { Slide, Dialog, IconButton, Typography, Box, Slider, Button, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector, useDispatch } from "react-redux";
import { saveSettings, resetDefaults } from "../store/Actions";
import { AppState } from "../store/AppState";
import { TransitionProps } from "@material-ui/core/transitions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 30,
  },
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Settings: React.FC = () => {
  const classes = useStyles();
  const workProp = useSelector<AppState, number>((state) => state.work);
  const shortBreakProp = useSelector<AppState, number>((state) => state.shortBreak);
  const longBreakProp = useSelector<AppState, number>((state) => state.longBreak);
  const roundsProp = useSelector<AppState, number>((state) => state.rounds);
  const dispatch = useDispatch();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [work, setWork] = useState<number>(workProp);
  const [shortBreak, setShortBreak] = useState<number>(shortBreakProp);
  const [longBreak, setlongBreak] = useState<number>(longBreakProp);
  const [rounds, setRounds] = useState<number>(roundsProp);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const setSlidersToState = useCallback(() => {
    setWork(workProp);
    setShortBreak(shortBreakProp);
    setlongBreak(longBreakProp);
    setRounds(roundsProp);
  }, [workProp, shortBreakProp, longBreakProp, roundsProp]);

  useEffect(() => {
    setSlidersToState();
  }, [setSlidersToState]);

  const handleSliders = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    const target = event.target as HTMLSpanElement;
    switch (target.parentElement!.id) {
      case "workSlider":
        setWork(newValue as number);
        break;
      case "shortBreakSlider":
        setShortBreak(newValue as number);
        break;
      case "longBreakSlider":
        setlongBreak(newValue as number);
        break;
      case "roundsSlider":
        setRounds(newValue as number);
        break;
    }
  };

  const resetOnEnter = () => {
    setSlidersToState();
  };

  const saveNewValues = () => {
    dispatch(saveSettings({ work, shortBreak, longBreak, rounds }));
    handleSettingsClose();
  };

  const resetToDefaultValues = () => {
    dispatch(resetDefaults());
  };

  return (
    <>
      <IconButton
        edge="start"
        aria-label="settings"
        color="primary"
        size="small"
        onClick={handleSettingsOpen}
      >
        <SettingsIcon className={classes.icon} />
      </IconButton>

      <Dialog
        fullScreen
        open={settingsOpen}
        onClose={handleSettingsClose}
        TransitionComponent={Transition}
        onEntering={resetOnEnter}
      >
        <Grid container justify="center">
          <Box width={320} minHeight="100vh" display="flex" flexDirection="column" justifyContent="center">
            <Box alignSelf="flex-end" m={1} mb={3}>
              <IconButton
                edge="start"
                aria-label="close settings"
                color="primary"
                size="small"
                onClick={handleSettingsClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            </Box>

            <Box mx="auto">
              <Typography id="work">Work: {work}:00</Typography>
            </Box>
            <Box mx={2} mb={5}>
              <Slider
                id="workSlider"
                value={work}
                onChange={handleSliders}
                aria-label="work"
                max={60}
                min={1}
              />
            </Box>
            <Box mx="auto">
              <Typography id="shortbreak">Short break: {shortBreak}:00</Typography>
            </Box>
            <Box mx={2} mb={5}>
              <Slider
                id="shortBreakSlider"
                value={shortBreak}
                onChange={handleSliders}
                aria-label="short break"
                max={30}
                min={1}
              />
            </Box>
            <Box mx="auto">
              <Typography id="longbreak">Long break: {longBreak}:00</Typography>
            </Box>
            <Box mx={2} mb={5}>
              <Slider
                id="longBreakSlider"
                value={longBreak}
                onChange={handleSliders}
                aria-label="long break"
                max={60}
                min={1}
              />
            </Box>
            <Box mx="auto">
              <Typography id="rounds">Rounds: {rounds}</Typography>
            </Box>
            <Box mx={2} mb={3}>
              <Slider
                id="roundsSlider"
                value={rounds}
                onChange={handleSliders}
                aria-label="rounds"
                max={8}
                min={1}
              />
            </Box>
            <Box mx="auto" mb={3}>
              <Button variant="contained" color="primary" onClick={saveNewValues}>
                Save
              </Button>
            </Box>
            <Box mx="auto" mb={3}>
              <Button color="secondary" onClick={resetToDefaultValues}>
                Reset Defaults
              </Button>
            </Box>
          </Box>
        </Grid>
      </Dialog>
    </>
  );
};

export default Settings;
