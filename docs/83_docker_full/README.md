# Deploy your project on a Docker container

First you need to have a server or virtual machine to work on. In our case we then have setup a VPN tunnel to that server and use the extension `ssh remote` to connect to the server through Visual Code.

## Installation of Docker and Docker-compose

For the installation of docker I will be refering to the install procedure "[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)"

## Making the directory structure in docker

1. Add `docker` folder to `/opt/`

```bash
cd /opt
sudo mkdir docker

```

2. Make the docker-group the owner

```bash
sudo chown root:docker docker
```

3. Change rights to write

```bash
sudo chmod g+w docker
```

4. Change rights to make sure that new folder enherite the same rights

```bash
sudo chmod g+s docker
```

5. Add `compose`, `data` and `apps` folder 

```bash
cd docker
sudo mkdir compose
sudo mkdir data
sudo mkdir apps
```

We will be using the folder `compose` to run Docker Containers from third party images like mySQL.
The folder `apps` will be used to run Docker Containers from a complete GitHub repository.
And the `data` folder will contain the data from our running containers. That makes it easier to manage Backup systems.

6. Add user `<user>` to the docker-group

```bash
sudo adduser <user> docker
```

7. Changer rights to write for the new folders

```bash
cd ..
sudo chmod -R g+w docker
```

## Deploying a static website on Docker

For this we need to create a GitHub repo that contains the project folder of our website.

![IMAGE](./images/image1.png)

Next we need to create a `docker-compose.yml` file.

```yml
version: '3'
services:
  website:
    build:
      context: ./website
      dockerfile: Dockerfile
    restart: unless-stopped
    ports:
      - 80:80
    container_name: frontend-ui
```

* `version: '3'` :  This instructs Docker Compose that we’re using version 3 of the tool.
* `services:` : This will instruct Docker Compose that what follows will be the services to deploy. 
* `restart: unless-stopped` : We instruct Docker to always retry to start this service unless it was stopped by the admin.
* `ports:` : We define both the external and internal ports to use for the database. 
* `container_name: ` : If you want your container to have a specific name you can define it like this.

In your project folder you now need to add a Docker file `Dockerfile`:

```docker
FROM nginx:1.25.1-alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

We will be using NGINX for our web server on port 80 which is the default port.

To deploy start the docker container we use the command `docker-compose up -d`, and to stop it again we can use `docker-compose down`.

## Deploying a mySQL server on Docker

Because we are only building a mySQL server container that is stand-alone we will be building our project in the folder `compose`.

### Docker-compose file

In a newly created folder for our project we need to start building a `docker-compose.yml` file.

```bash
cd compose
sudo mkdir mysql-server
nano docker-compose.yml
```

::: tip 💡 Tip
You can also open the `/opt/docker/` folder in Visual Code and then use that UI for adding/editing folders and files.
:::

```yml
version: '3'
services:
  db:
    image: mysql
    restart: unless-stopped
    ports:
      - 3306:3306
    env_file: ./.env
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQLDB_ROOT_PASSWORD}
      - MYSQL_DATABASE=${MYSQLDB_DATABASE}
    volumes:
      - /opt/docker/data/mysql-server:
      /var/lib/mysql
    container_name: mysql-server
```

* `db:` : This is the db service that will be defined.
* `image: mysql` : We instruct Docker Compose to use the mysql image for the database.
* `env_file: ./.env` : To be able to use those Environmental variables we need to define in which file they are defined.
* `environment:` : We configure the database environment. The environment will be the configuration options for the database (passwords, users, database name).
* `volumes:` : This is optional, but in our case we want the data to be writen in our data folder we made. Therefore we define both the internal and external path.

### Environmental variables

Once our Docker-compose file is ready, we need to make our file with the Environmental variables named `.env`.

```env
# mySQL database
MYSQLDB_ROOT_PASSWORD=<your root password>
MYSQLDB_DATABASE=vives
```

### Deploy on docker

Once we have done that, we are ready to build and run our service.

* use `docker-compose up` to deploy your container in attached mode, so you won't get your bash prompt returned.
* use `docker-compose up -d` to deploy your container, now you get your bash prompt returned.
* use `docker-compose up --force-recreate --build -d` to deploy your container and rebuild them after adjustments have been made.
* use `docker-compose ps` to see the name of the containers and status.
* use `docker-compose down` to stop and remove the docker containers.
* use `docker-compose down -v` to stop and remove the docker containers and volumes.

Once our service is running we can connect to it with WorkBench and create our webuser like we did [before](../45_create_db_user).

:::tip 💡 Tip
Now you will need to change the 'webuser'@'localhost' to 'webuser'@'%'.
:::

## Deploying a Express.js Backend-API on Docker

Now let's dockerize a backend API made in Express.js that provides the CRUD actions to a database.

In stead of creating a new project folder in `compose` we will be editing our project repository (if you want you can make a new 'docker' branch for this).

### Docker-compose file

Again in the root folder of the project we create a `docker-compose.yml` file starting form our previous one:

```yml
version: '3'
services:
  db:
    image: mysql
    restart: unless-stopped
    ports:
      - 3306:3306
    env_file: ./.env
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQLDB_ROOT_PASSWORD}
      - MYSQL_DATABASE=${MYSQLDB_DATABASE}
    volumes:
      - /opt/docker/data/mysql-server:/var/lib/mysql
    container_name: mysql-server
  api:
    depends_on:
      - db
    build:
      context: ./<backend directory>
      dockerfile: Dockerfile
    restart: unless-stopped
    env_file: ./.env
    ports:
      - 3000:3000
    environment:
      - DB_HOST=db
      - DB_USER=${MYSQLDB_USER}
      - DB_USER_PASSWORD=${MYSQLDB_USER_PASSWORD}
      - DB_NAME=${MYSQLDB_DATABASE}
      - DB_PORT=3306
    container_name: backend-api
```

* `depends_on:` : Dependency order, db is started before api.
* `build:` : Configuration options that are applied at build time that we will define in the Dockerfile with relative path

### Environmental variables

Now we need to complete our `.env` file as follows:

```env
# mySQL database
MYSQLDB_ROOT_PASSWORD=<your root password>
MYSQLDB_DATABASE=vives

# API
MYSQLDB_USER=webuser
MYSQLDB_USER_PASS=secretpassword
```

### Docker file for the backend API

Next, in the folder of your backend API you need to create a Docker file that has a development and a build stage.

```docker
# Development stage
FROM node:18.16-alpine3.17 as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build stage
FROM develop-stage as build-stage
EXPOSE 3000
CMD ["npm", "run", "start"]
```

* `FROM` : start the image from node.js version 18.
* `WORKDIR` : setup a working directory
* `COPY` : copy all files to the image
* `RUN` : install all dependencies
* `EXPOSE` : expose the backend api on port 3000
* `CMD` : start the backend.

### Change hostname in your backend

Next we need to change the localhost to the Environmental variable `DB_HOST` that has the name of the mySQL service, and this in all our file's where we make a database connection.

```js
const DB_HOST = process.env.DB_HOST;
```

### Deploy on docker

Now you need to clone your docker repo, by using the https link in `code`, in your `apps` folder.

```bash
cd apps
git clone <https link repo>
```

then go to your project and deploy it like we did with the mySQL server.

Once your project is deployed on Docker you will again need to add our webuser and run the `restore.sql` script from the project to create the necessary tables.

## Deploying a full project with Vue Ui, Express Api and mySQL database on docker

Now let's add a Vue frontend to the project.

### Docker-compose file

We add a new service `ui` to our `docker-compose.yml` file:

```yml
version: '3'
services:
  db:
    ...
  api:
    ...
  ui:
    depends_on: 
       - api
    build:
      context: ./<frontend directory>
      dockerfile: Dockerfile
    restart: unless-stopped
    ports:
      - 80:80
    environment:
      - VUE_APP_API_HOST=<your server ip-adress>:3000
    container_name: frontend-ui    
```

### Docker file for the frontend UI

In the folder of your frontend UI you need to create a Docker file. This time it exists of a development, a build and a production stage.

**Frontend-UI**
```dockerfile
# Development Stage
FROM node:18.16-alpine3.17 as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build Stage
FROM develop-stage as build-stage
RUN npm run build

# Production Stage
FROM nginx:1.25.1-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY 30-vue-env-replace.sh /docker-entrypoint.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Let's take a closer look at this development stage. 

We are using nginx as a webserver to host our website. In our Vue project folder we need a `nginx.conf` file, with the following content:

```conf
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
  worker_connections  1024;
}
http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
  access_log  /var/log/nginx/access.log  main;
  sendfile        on;
  keepalive_timeout  65;
  server {
    listen       80;
    server_name  localhost;
    location / {
      root /usr/share/nginx/html;
      index  index.html;
      try_files $uri $uri/ /index.html;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   /usr/share/nginx/html;
    }
  }
}
```

An other problem that we will have is that environment variables are injected into the application during the build stage. The resulting static files thus contain the respective values of those variables as hardcoded strings. To solve this we will use a script `30-vue-env-replace.sh` to replace all environment variables with there correct values.

```bash
#!/bin/sh
echo "Replacing ENV vars before starting nginx"
for file in /usr/share/nginx/html/assets/*.js;
do
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi
  envsubst '$VUE_APP_API_HOST' < $file.tmpl.js > $file
done

exit 0
```

Once you created this file, you will need to run the command `chmod +x 30-vue-env-replace.sh` to make the script executable.
The script will be executed by Docker because we have put it in the entrypoint. 

### Change hostname and port in your frontend

In your frontend you need to change the `localhost` to the Evironmental variable.

```js
const url = `http://${VUE_APP_API_HOST}/weerinfo`;            
```

### Deploy on docker

For the deployment the same steps must be taken as previous with the backend.

