tweetimizer
==============

__tweetimizer__ is a responsive web app that helps journalists to increase the reach of their tweets by finding effective and up-to-date hashtags for their topics.
In addition, the tool shows the most influencial users of these hashtags (to get in touch or start a discussion) as well as relevant articles (to see what's already been said).

This project has been developed during the [Open Data Hack Day: Munich Edition](https://www.hackerleague.org/hackathons/open-data-hack-day-munich-edition) and runs at [tweetimizer.brgn.de](http://tweetimizer.brgn.de).

![Screenshot](https://raw.githubusercontent.com/fhinkel/TweetOptimizer/master/screenshot.png "Screenshot")

## Structure
The project consists of three main parts:
- `/python`: Flask-based server that hosts the underlying machine learning model
- `/server`: Node.js server that acts as an intermediary
- `/client`: Bootstrap-based frontend

## Installation
##### Python Dependencies
- `sudo easy_install pip`
- `sudo pip install flask`
- `sudo pip install flask-cors`
- `sudo apt-get install python-numpy python-scipy`
- save your twitter token in .config.js (use server/config.js as template)

##### Node.js Dependencies & Starting the Servers
- `npm install`
- `npm run build` (installs Bower dependencies)
- `npm run forever` or `npm run node`and `npm run python`
