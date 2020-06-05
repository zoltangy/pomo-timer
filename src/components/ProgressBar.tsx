import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Slider, Tooltip, ValueLabelProps, Mark } from "@material-ui/core";
import { AppState } from "../store/AppState";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    textAlign: "right",
    paddingRight: "42px",
  },
  mark: {
    height: 4,
    width: 4,
    borderRadius: 2,
    marginLeft: -3,
    marginBottom: -4,
    marginTop: -3,
  },
  markLabel: {
    fontSize: "0.73rem",
  },
  rail: {
    backgroundColor: theme.palette.primary.main,
  },
  tooltipPlacementLeft: {
    margin: "0 14px 0 34px",
    maxWidth: "62px",
  },
}));

const ValueLabelComponent: React.FC<ValueLabelProps> = (props) => {
  const classes = useStyles();
  const { children, open, value } = props;
  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="left"
      title={value}
      arrow
      classes={{
        tooltipPlacementLeft: classes.tooltipPlacementLeft,
      }}
    >
      {children}
    </Tooltip>
  );
};

const ProgressBar: React.FC = () => {
  const classes = useStyles();
  const work = useSelector<AppState, number>((state) => state.work);
  const shortBreak = useSelector<AppState, number>((state) => state.shortBreak);
  const longBreak = useSelector<AppState, number>((state) => state.longBreak);
  const rounds = useSelector<AppState, number>((state) => state.rounds);
  const timeLeft = useSelector<AppState, number>((state) => state.timeLeft);

  const max = work * rounds + shortBreak * (rounds - 1) + longBreak;

  let marks: Mark[] = [];

  for (let i = 0; i < rounds; i++) {
    marks.push({
      value: max - i * (work + shortBreak),
      label: "work",
    });
    if (i === rounds - 1) {
      marks.push({
        value: max - (i * (work + shortBreak) + work),
        label: "long break",
      });
    } else {
      marks.push({
        value: max - (i * (work + shortBreak) + work),
        label: "short break",
      });
    }
  }

  const valueText = (value: number) => {
    return max - Math.ceil(value);
  };

  return (
    <div className={classes.wrapper}>
      <Slider
        value={timeLeft / 60}
        orientation="vertical"
        valueLabelDisplay="on"
        disabled
        aria-label="time progress"
        max={max}
        min={0}
        ValueLabelComponent={ValueLabelComponent}
        marks={marks}
        track="inverted"
        valueLabelFormat={valueText}
        classes={{
          mark: classes.mark,
          markLabel: classes.markLabel,
          rail: classes.rail,
        }}
      />
    </div>
  );
};

export { ProgressBar as default };
