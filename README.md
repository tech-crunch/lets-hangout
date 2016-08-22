[![Stories in Ready](https://badge.waffle.io/tech-crunch/lets-hangout.png?label=ready&title=Ready)](https://waffle.io/tech-crunch/lets-hangout)

[![Build Status](https://travis-ci.org/tech-crunch/lets-hangout.svg?branch=master)](https://travis-ci.org/tech-crunch/lets-hangout)

# Lets Hangout

> Get suggestions and decide what you want to do with your friends on a night-out

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Running Tests](#running-tests)
    1. [Building Application](#building-application)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Production](#production)
1. [Builds](#builds)

## Usage

#### Login View, our application is built on facebook authentication, in order to get your facebook friends whom use the same application
![Login](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/login.jpg "Login Screen")

#### To start using the application you have to create new group and connect with your friends
![Home](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/home.jpg "Home Screen")![CreateGroup](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/createGroup.jpg "Create Group Screen")![GroupsList](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/home2.jpg "Groups List Screen")

#### Through group settings you can add/remove friends to/from your group, view group members, create new night-out, and see list of night-outs
![GroupSettings](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/groupHome1.jpg "Group Settings Screen")![AddFriends](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/groupHome2.jpg "Add Friends Screen")![ShowMembers](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/groupHome3.jpg "Show Members Screen")![CreateEvent](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/groupHome4.jpg "Create Event Screen")![EventsList](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/groupHome5.jpg "Events List Screen")

#### Once you click on the dashboard for the first time, you'll be redirected to the swiping game until you choose what you'd like to do on a night-out, after that you'll be redirected to the dashboard page, which will show you your friends choices, and you can vote on the choices, and the least voted choices will be eliminated, until you reach a single choice you all agree to do on a night-out
![Swiping](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/swiping.jpg "Swiping Screen")![Dashboard1](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/dashboard1.jpg "Dashboard1 Screen")![Dashboard2](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/dashboard2.jpg "Dashboard2 Screen")![Dashboard3](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/dashboard3.jpg "Dashboard3 Screen")


## Requirements

- Node 4.x.x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Running Tests

From within the root directory:

```sh
npm test
npm run clientTest
```

### Building Application

To run the application locally, from within the client directory:

```sh
ionic serve --lab
```

To build the application for a specific platform, from within the client directory:

ios
```sh
ionic platform add ios
ionic build ios
```

android
```sh
ionic platform add android
ionic build android
```

browser
```sh
ionic platform add browser
ionic build browser
```

### Roadmap

View the project roadmap [here](https://waffle.io/tech-crunch/lets-hangout)

## Team

  - __Product Owner__: Hussam Al-Hindi
  - __Scrum Master__: Bader Khalifeh
  - __Development Team Members__: Bader Khalifeh, Hussam Al-Hindi, Farah Amawi, Sarya Al-Sayed

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Production

See our website [here](https://letsshangout.herokuapp.com/#/).

## Builds

See our latest build [here](https://travis-ci.org/tech-crunch/lets-hangout).

