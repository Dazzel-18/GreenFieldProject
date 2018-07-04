#  Pocket Jobs
A web application to add, list and search for
part-time jobs.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Table of Contents

1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    1. [Installation](#installation)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [File Hieghrarcy](#file-hieghrarcy)
1. [Authors](#authors)

### Prerequisites
Make sure you installed the following :

    Node ^6.11.4
    MongoDb
    React

### Installation
- Get a copy of the repo
```
$ git clone https://github.com/Sarakoki/GreenFieldProject
```
-  install all dependencies found in 'packkage.json' file
```
$ npm install
``` 
- open three terminal windows:
```
$ npm run server-dev
```
```
$ npm run react-dev
```
```
$ sudo mongod
```

### Development

#### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

## File Hieghrarcy
    GreenFieldProject
    - server
      - Models
        - jobs.js
        - users.js
      - index.js
    - database-mongo
      - index.js
    - react-client
      - dist
        - index.html
      - src
        - components
          - Home.jsx
          - JobList.jsx
          - JobPage.jsx
          - JobsForm.jsx
          - JobsForUser.jsx
          - Login
          - NavBarComponent.jsx
          - NotAuthenticatedHome.jsx
          - Profile.jsx
          - Search.jsx
          - SignUp.jsx
          - UpdateUser.jsx
          - UserInfo.jsx
          - UserJobs.jsx
          - UserProfile.jsx
        - routes
          - AppRouter.jsx
        - styles
          - base
            - _base.scss
          - styles.scss
        - index.jsx
    - package.json
    - README.md


## Authors
- [Tal Omari](https://github.com/Talomari) - Scrum master.
- [Nada Ghanem](https://github.com/nadaa) - Product Owner.
- [Raed Awwad](https://github.com/raedawwad95) - Team member.
- [Samer Salmeh](https://github.com/SamerSalmeh) - Team member.
- [Sara Koki](https://github.com/Sarakoki) - Team member.