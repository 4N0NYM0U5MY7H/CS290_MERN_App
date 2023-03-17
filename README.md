<picture>
  <source
    srcset=".github/osu-ecampus-dark.png"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset=".github/osu-ecampus-light.png"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img src=".github/osu-ecampus-light.png" alt="Oregon State University Ecampus Logo." />
</picture>

# CS290: Assignment 9 — Full Stack Mern App

## Table of Contents
- [Assignment 9 — Full Stack Mern App](#assignment-9--full-stack-mern-app)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
      - [References](#references)
  - [Build and run the project](#build-and-run-the-project)
    - [Build the REST API back-end web service](#build-the-rest-api-back-end-web-service)
    - [Build the React front-end UI](#build-the-react-front-end-ui)
  - [Built With](#built-with)
  - [License](#license)

## About
This Single Page Application (SPA) uses the MERN stack (`MongoDB`, `Express`, `React`, `Node`) to track exercises completed by the user. The front-end UI is created using React.  The REST API back-end web service is created using Node.js and Express. Data persistence is provided using MongoDB.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for demonstration purposes.

### Prerequisites
You need to have a machine with [Node.js version 18.x](https://nodejs.org/en/download/) installed.
```bash
$ node --version
v18.13.0
```
This project requires a MongoDB database. This can be installed on your local machine or alternaively set up using a hosting service such as MongoDB Atlas.

#### References
* Install MongoDB on your local machine
  * MongoDB 5 Community Edition
    * [Install on Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition)
    * [Install on Mac](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)
    * [Install on Linux](https://www.mongodb.com/docs/manual/administration/install-on-linux/)
* Use a hosting service (recommended)
  * MongoDB Atlas
    * Go to [Register](https://account.mongodb.com/account/register)
    * Create a Project
    * Build a Database
      * Choose free option
      * Create a database user
      * Add an IP Address to the IP Access List
    * Go to Connect
      * Choose connect your application
      * Copy the connection string
  * Open the `.env` file in the `exercises/exercises-rest` dicretory
    * `MONGODB_CONNECT_STRING` = paste your connection string

## Build and run the project
All installation is handled using `npm`. The following steps will install the project dependencies. This project also includes `.env` files with demo `PORT` variables.

### Build the REST API back-end web service
```sh
# Terminal 1
$ cd exercises/exercises-rest
$ npm install
$ npm run
```

### Build the React front-end UI
```sh
# Terminal 2
$ cd exercises/exercises-ui
$ npm install
$ npm run
```

## Built With
REST API back-end web service
* [![Node.js v18.13](https://img.shields.io/badge/v18.13-339933?label=Node.js&labelColor=141414&logo=nodedotjs&style=flat-square)](https://nodejs.org/en/download/) — Open-source, cross-platform JavaScript runtime environment.
* [![Nodemon v2.0.21](https://img.shields.io/badge/v2.0.21-76D04B?label=Nodemon&labelColor=141414&logo=nodemon&style=flat-square)](https://www.npmjs.com/package/nodemon) — Automatically restart node applications on file changes.
* [![Express v4.18.2](https://img.shields.io/badge/v4.18.2-000?label=Express&labelColor=141414&logo=express&style=flat-square)](https://www.npmjs.com/package/express) — Fast, unopinionated, minimalist web framework for Node.js.
* [![Express Validator v6.15](https://img.shields.io/badge/v6.15-CB3837?label=Express%20Validator&labelColor=141414&logo=npm&style=flat-square)](https://www.npmjs.com/package/express-validator) — An express.js middleware for validator.
* [![Mongoose v7.0.1](https://img.shields.io/badge/v7.0.1-CB3837?label=Mongoose&labelColor=141414&logo=npm&style=flat-square)](https://www.npmjs.com/package/mongoose) — MongoDB object modeling tool designed to work in an asynchronous environment.
* [![MongoDB Atlas](https://img.shields.io/badge/Atlas-47A248?label=MongoDB&labelColor=141414&logo=mongodb&style=flat-square)](https://www.mongodb.com/atlas) — An integrated suite of cloud database and data services.

React front-end UI
* [![Node.js v18.13](https://img.shields.io/badge/v18.13-339933?label=Node.js&labelColor=141414&logo=nodedotjs&style=flat-square)](https://nodejs.org/en/download/) — Open-source, cross-platform JavaScript runtime environment.
* [![React v18.2](https://img.shields.io/badge/v18.2-61DAFB?label=React&labelColor=141414&logo=react&style=flat-square)](https://www.npmjs.com/package/react) — JavaScript library for creating user interfaces.
* [![React Form Input Validation v2.1](https://img.shields.io/badge/v2.1-CB3837?label=React%20Form%20Input%20Validation&labelColor=141414&logo=npm&style=flat-square)](https://www.npmjs.com/package/react-form-input-validation) — A customized `validatorjs` library to validate the React forms.
* [![React Icons v4.8](https://img.shields.io/badge/v4.8-CB3837?label=React%20Icons&labelColor=141414&logo=npm&style=flat-square)](https://www.npmjs.com/package/react-icons) — Easily include popular icons in your React projects.
* [![React Router Dom badge.](https://img.shields.io/badge/v6.8.2-CA4245?label=React%20Router%20Dom&labelColor=141414&logo=reactRouter&style=flat-square)](https://www.npmjs.com/package/react-router-dom/v/6.8.2) — Contains bindings for using `React Router` in web applications.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
