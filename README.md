This project was bootstrapped with

[Create React App](https://github.com/facebookincubator/create-react-app).

After which eject was run

See license.md for license material

## Setup for UI automation:
* Install [Node](http://nodejs.org) ( Node 10.x.x and NPM v6.x.x)
* `npm run preprotractor` to install the project dependencies and install selenium & borwser specific drivers
* `npm install grunt -g` to instll grunt globally

## Run tests:
* `grunt` OR `grunt-chrome`  to Run tests using Chrome browser on stage server.
* `grunt stage` to Run tests on  Chrome and firefox browser on stage server.
* `grunt stage-chrome` to Run tests on Chrome browser on stage server.
* `grunt stage-firefox`  to Run tests on firefox browser on stage server.
* `grunt prepod-chrome`  to Run tests on Chrome browser on prepod server.
* `grunt prepod-firefox` to Run tests on firefox browser on prepod server.
* `grunt prepod` to Run tests on  Chrome and firefox browser on prepod server.



