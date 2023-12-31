# Backend with NestJS

In the root of the project you should find the file `.env.example` which must be renamed like `.env`.

## Docker Configuration

Generate images and backend containers with the following command:

```bash
$ make up
```

To restart containers:

```bash
$ make down && make prune && make up
```

## Node

<font color="orange"> The docker machine executes all the necessary commands for the project can run in a development environment</font>

```bash
$ make shell api

$ node -v
$ npm -v

# Install Node dependencies
$ npm install

# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod

# Build our application
$ npm run build

# In case you want to exit the shell you just have to type
$ exit
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Installed Libraries

[Brevo documentation](https://developers.brevo.com/reference/getting-started-1)

## Installed Libraries

```bash
$ make shell api

# Install Libraries

# https://docs.nestjs.com/
# Include following line into Dockerfile
$ npm i -g @nestjs/cli
$ nest new project-name
$ nest --version
$ nest --help

# https://github.com/MichalLytek/class-transformer-validator
# Validate params with class-validator
$ npm i class-validator class-transformer

# Install mapped-types
# https://github.com/nestjs/mapped-types
$ npm i @nestjs/mapped-types

# Install mapped-types
# https://docs.nestjs.com/techniques/configuration
$ npm i --save @nestjs/config

# Install axios
# https://docs.nestjs.com/techniques/http-module
$ npm i --save @nestjs/axios axios

# Install schema description language and data validator for JavaScript
# https://github.com/hapijs/joi
$ npm install --save joi

# Documentation
# https://docs.nestjs.com/openapi/introduction
# https://docs.nestjs.com/openapi/cli-plugin#using-the-cli-plugin
# https://github.com/nestjs/swagger
# https://swagger.io/
# https://swagger.io/specification/
$ npm install --save @nestjs/swagger

# https://typescript-eslint.io/getting-started
$ npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript

# https://github.com/prettier
# https://github.com/prettier/eslint-config-prettier
# https://github.com/prettier/eslint-plugin-prettier
$ npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

# https://nodemailer.com/about/
# https://github.com/nodemailer/nodemailer
# https://www.npmjs.com/package/@types/nodemailer
$ npm install nodemailer
$ npm install --save-dev @types/nodemailer

# https://ejs.co/#docs
# https://github.com/mde/ejs
$ npm install ejs
$ npm install --save @types/ejs

# In case you want to exit the shell you just have to type
$ exit
```

# Cross-origin resource sharing ([CORS](https://docs.nestjs.com/security/cors))

Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain. Under the hood, Nest makes use of the Express [cors](https://github.com/expressjs/cors) package. This package provides various options that you can customize based on your requirements.

## Getting started

To enable CORS, call the `enableCors()` method on the Nest application object.

```javascript
// main.ts
const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(3000);

```

The `enableCors()` method takes an optional configuration object argument. The available properties of this object are described in the official [CORS](https://github.com/expressjs/cors#configuration-options) documentation. Another way is to pass a [callback function](https://github.com/expressjs/cors#configuring-cors-asynchronously) that lets you define the configuration object asynchronously based on the request (on the fly).

Alternatively, enable CORS via the `create()` method's options object. Set the `cors` property to `true` to enable CORS with default settings. Or, pass a [CORS configuration object](https://github.com/expressjs/cors#configuration-options) or [callback function](https://github.com/expressjs/cors#configuring-cors-asynchronously) as the `cors` property value to customize its behavior.

```javascript
// main.ts
const app = await NestFactory.create(AppModule, { cors: true });
await app.listen(3000);

```

# Optional Node Configuration (Without Docker)

### <span style="color: orange"> If you want to use node without Docker into the project</span>

```bash
# Install Node dependencies
$ npm install

# Compile the nestjs_micro once
$ npm run dev

# Build our application
$ npm run build

# Start our application
$ npm run start

# In case you want to exit the shell you just have to type
$ exit
```

# CLI command reference NestJS

Creates a new (standard mode) Nest project. 

[CLI command reference](https://docs.nestjs.com/cli/usages)

```bash
# Create modules
$ nest g mo products
$ nest g mo users

# Global module
$ nest g mo database

# Create controllers
$ nest g products/controller categories --flat
$ nest g products/controller products --flat
$ nest g products/controller brands --flat
$ nest g users/controller customers --flat
$ nest g users/controller users --flat

# Create services
$ nest g s products/services categories --flat
$ nest g s products/services products --flat
$ nest g s products/services brands --flat
$ nest g s users/services customers --flat
$ nest g s users/services users --flat 

# Create custom pipes
$ nest g pipe common/parse-int-custom

# In case you want to exit the shell you just have to type
$ exit
```

## Server configuration

It must be located at the root of the project within the server and execute the following commands:

### First deploy

```bash

# Now let's serve our application.
$ cd /var/www/backend-nestjs
$ pm2 start pm2.config.json
# Optional instruction (Only with root user)
# $ pm2 start npm --name nestjs_micro --user www-dtos -- start

# Check it.
$ pm2 ls

# Addtional instructions
pm2 stop nestjs_micro
pm2 restart nestjs_micro
pm2 delete nestjs_micro

# Check if port is active
$ sudo lsof -i -P -n
$ sudo lsof -i -P -n | grep LISTEN

```

#### Create Nginx Server

List of all existing instances

```bash

# Production (nestjs.jaidenmeiden.com)
$ cd /etc/nginx/sites-available
$ sudo touch nestjs.jaidenmeiden # Copy content

$ cd /etc/nginx/sites-enabled
$ sudo ln -s /etc/nginx/sites-available/nestjs.jaidenmeiden .

$ sudo certbot --nginx -d nestjs.jaidenmeiden.com
$ sudo certbot certificates

$ sudo systemctl restart nginx
$ sudo systemctl status nginx

```

```diff
server {
    server_name nestjs.jaidenmeiden.com www.nestjs.jaidenmeiden.com;
    root /var/www/backend-nestjs/dist;
  
    if ($host = www.nestjs.jaidenmeiden.com) {
      return 301 https://nestjs.jaidenmeiden.com$request_uri;
    }
  
    location / {
      proxy_pass http://localhost:8080;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }

}
```

### Later accesses

```bash

# Enter to application
$ cd /var/www/backend-nestjs

# Now restart our application.
$ pm2 restart nestjs_micro

# Check it.
$ pm2 ls
$ pm2 logs

# Check if port is active
$ sudo lsof -i -P -n
$ sudo lsof -i -P -n | grep LISTEN

```

# Application access

[Development Application](http://localhost:8080)

[Production Application](https://nestjs.jaidenmeiden.com/)

## <font color="red"> Errors</font>

```diff
./src/pages/pages/contact-us.js
Attempted import error: '../../layouts/centered' does not contain a default export (imported as 'Centered').
```

Solved with:
Put instruction `export default Centered` into `contact-us.js` file

## Licencia

Copyright © 2023 Mr. Meiden.
