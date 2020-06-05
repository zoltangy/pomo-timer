## Pomo Timer

Customizable pomodoro timer using React, Redux and Material-UI. Tested using React testing library with Jest.

Features:

- Customizable timer settings
- Settings are preserved (using localStorage)
- Installable PWA, with custom install procedure, using my [react-pwa-install](https://github.com/zoltangy/react-pwa-install) package. Supports Chrome, Firefox mobile, iOS, Edge mobile, Samsung internet, Opera mobile. The user will only be asked to install the app after one week if they opt out.
- Keeps the screen on while the timer is in use to ensure proper functioning.
- Overall time progress bar, showing breaks and work sessions.
- Works offline, also detects when offline and will not try to serve outside links, instead notifies the user gracefully.
- When installed on desktop it resizes to a convinient gadget format.

To view the deployed version, check https://zoltangy.github.io/pomodoro-timer/
