[![Stories in Ready](https://badge.waffle.io/tech-crunch/lets-hangout.png?label=ready&title=Ready)](https://waffle.io/tech-crunch/lets-hangout)

[![Build Status](https://travis-ci.org/tech-crunch/lets-hangout.svg?branch=master)](https://travis-ci.org/tech-crunch/lets-hangout)

# Lets Hangout

> Get suggestions and decide what you want to do with your friends on a night-out

## Table of Contents

1. [Usage](#Usage)
1. [Architecture](#Architecture)
    1. [Tech-Stack](#tech-stack)
    1. [System-Architecture](#system-architecture)
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

![Home](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/screenshot1.jpg "Home Screen")

![Group](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/screenshot2.jpg "Group Screen")

![Dashboard](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/screenshot3.jpg "Dashboard Screen")

![Messaging](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/screenshot4.jpg "Messaging Screen")

## Architecture

### Tech Stack

1) Front-End
- Ionic  
- Angular
- Pubnub
- Auth0

2) Back-End
- Node/Express
- Pubnub
- MongoDB

3) Testing
- Mocha
- Chai
- Jasmine
- Karma

4) Deployment
- Heroku
- Ionic Platform

### System Architecture
![System Architecture](https://raw.githubusercontent.com/tech-crunch/lets-hangout/master/screenshots/systemArchitecture.jpg "System Architecture")

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

