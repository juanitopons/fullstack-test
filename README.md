<h1 align="center">Welcome to fullstack-test application 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D10.3.0-blue.svg" />
  <img src="https://img.shields.io/badge/eslint-%3E6.0.0-blue.svg" />
  <img src="https://img.shields.io/badge/typescript-%3E3.0.0-blue.svg" />
  <img src="https://img.shields.io/badge/webpack-%3E4.0.0-blue.svg" />
  <a href="/client/documentation" target="_blank" title="Client Docs" alt="Client Docs">
    <img alt="Client Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="/server/docs" target="_blank" title="Server Docs" alt="Server Docs">
    <img alt="Server Docs" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="/wiki" target="_blank" title="Server Wiki" alt="Server Wiki">
    <img alt="Server Wiki" src="https://img.shields.io/badge/wiki-yes-brightgreen.svg" />
  </a>
  <a href="/TODO.md" target="_blank" title="TODO list" alt="TODO list">
    <img alt="TODO list" src="https://img.shields.io/badge/todo-yes-brightgreen.svg" />
  </a>
  <a href="/LICENSE.md" target="_blank" title="License MIT" alt="License MIT">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Dockerized Fullstack Test Application (client and server) scripts configured, docker compose contexts and 3 enviroments available (dev too). Webpack backend configured + Lint(s) configs + IDE config + RWD + Angular 9...etc

All default .env and .local.env files are configured for the project and pushed to git for testing purposes.

ENV defaults:
- API_URI= (/api) Server API base path
- NODE_ENV= (development) [development|stagging|production] Enviroment
- NODE_DEBUG= (9229) Node inspection debugging port
- MYSQL_USER= (admin) MYSQL database admin
- MYSQL_PASSWORD= (4dm1np4ssw0rd) MYSQL_USER password
- MYSQL_ROOT_PASSWORD= (r00tp4ssw0rd) MYSQL root user password for docker container
- MYSQL_HOSTNAME= (mysql) MYSQL docker compose service
- MYSQL_PORT= (3306) MYSQL service internal port
- MYSQL_DATABASE= (dailytrends-devel) MYSQL's DB name
- MYSQL_EXTERNAL_PORT= (3306) MYSQL Docker service published port
- ADMINER_PORT= (8080) Adminer Docker internal service exposed port
- ADMINER_EXTERNAL_PORT= (8080) Adminer Docker service published port
- SERVER_INTERNAL_PORT= (3000) Node Docker internal service exposed port
- SERVER_EXTERNAL_PORT= (3000) Node Docker service published port
- CLIENT_INTERNAL_PORT= (4200) Angular Docker internal service exposed port
- CLIENT_EXTERNAL_PORT= (4200) Angular Docker service published port
- NODE_ENV= (development) Node enviroment for Docker deployment
- NODE_LOG_LEVEL= (debug) Node logger level

### Exposed Ports / Service login

- **Front:** 4200:4200
- **Back:** 3000:3000
- **Back debug:** 9229:9229
- **DB:** 3306:3306
- **Adminer:** 8080:8080
- **Adminer login**: admin, 4dm1np4ssw0rd

Configuration can be found in docker-compose.yml root file and enviroment variables in .env root file.

### Enviroments

Available configured enviroments are: development, stagging, production.
Full development enviroment configured.
TODO: End stagging and production webpack specific configuration and performance builds.

We have different enviroments "already done" configs for our libraries and applicattion.
The enviroment mode is taken from .env NODE_ENV. Docker must be restarted once changed to take effect on the deploy mode.

On 'development' mode, changes are binded with Nodemon, Webpack and Node while editing without any kind of Docker restart also for client angular project with ng CLI dev server.

## Prerequisites

- node >=10.3.0
- eslint >6.0.0
- typescript >3.0.0
- webpack >4.0.0
- On local deployment, also: mysql5.7 with MYSQL_USER and MYSQL_PASSWORD and MYSQL_DATABASE created
- On docker deployment: [Docker](https://www.docker.com/) and docker compose 1.21.0

* All dependencies and libraries can be found in both projects package.json config file.

## Usage

> With docker (be sure that root .env file is configured properly):
Docker and Compose must be installed. You just need to 'build' the images with docker-compose:

```sh
docker-compose up --build
```

It might take some time. You also may consider that some containers are dependents in between, so first build will take a little more, also because mysql service has to run scripts for creating default data specified.

> Without docker (be sure that .local.env in each project is configured properly and you have corrrect dependencies installed and running on local machine, even mysql user and database created on system):

First we need to install dependencies in the 3 root workspaces

```sh
npm i && cd client && npm i && cd ../server && npm i
```

Now (keeping in mind that we satisfy the prerequisites on local) we can independently execute our project:

- server

```sh
NODE_ENV=development npm start
```

- client

```sh
npm start
```

## Docs

- server
Docs are available in [docs server page](/server/docs).
Docs generated with [TypeDoc](https://github.com/TypeStrong/typedoc)

- client
Docs are available in [docs client page](/client/documentation).
Docs generated with [Compodoc](https://github.com/compodoc/compodoc)
Serve client docs HTML page:

```sh
npm run doc:serve
```

## Author

👤 **Juan Pons**

* Website: http://linkedin.com/in/juanitopons/
* Github: [@juanitopons](https://github.com/juanitopons)
* LinkedIn: [@juanitopons](https://linkedin.com/in/juanitopons)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](/issues). 

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
