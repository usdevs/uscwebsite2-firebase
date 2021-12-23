# uscwebsite2-firebase

## Setup Guide

### Prerequisites

- [Nodejs](https://nodejs.org/en/)

### Steps

1. Install [Firebase CLI Tools](https://firebase.google.com/docs/cli)
2. Request access to firebase project
3. Create a new directory and authenticate with google through `firebase login`. Account must be the same as the one granted access to the firebase project
4. Clone the repo to the directory
5. Run `firebase emulators:start --export-on-exit --import ./emulator` to start the local emulator