# Deploy a MySQL, Express & Vue project

:::warning 🔥warning
Make sure you have prepared your VM before continuing here.
:::

## Prepare your project for deployment

To be able to deploy our web application on the VM we need to prepare it.

### Create a GitHub repository for deployment

* create a new repository on github
* create a local folder `<projectname>` with the subfolders `backend-api` and `frontend-vue`.
* make a copy of your **express** project to the folder `backend-api`.
* make a copy of your **vue** project to the folder `frontend-vue`.
* open the folder `<projectname>` in Visual Code and open a terminal
* make it a git repository by typing `git init`.
* add the remote GitHub repository by typing `git remote add origin git@github.com:yourusername/repositoryname.git` (the last part is your SSH link from your GitHub repository)
* make a first push 

### Preparing the necessary files for docker

#### Docker compose file

First we will be creating the docker compose file that will contain the necessary services that need to be deployed on docker ( MySQL, PHPmyAdmin, Backend-API and Frontend-Vue).

Create a file `docker-compose.yml` in the folder  `<projectname>` with the following content:

``` yaml
version: '3'
services:
  db:
    image: mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQLDB_ROOT_PASSWORD}
      - MYSQL_DATABASE=${MYSQLDB_DATABASE}
    volumes:
      - db:/var/lib/mysql
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    restart: always
    ports:
      - "8080:80"
    environment:
      - PMA_ARBITRARY=1
      - PMA_HOST=db
      - PMA_USER=root
      - PMA_PASSWORD=${MYSQLDB_ROOT_PASSWORD}
  api:
    depends_on:
      - db
    build:
      context: ./backend-api
      dockerfile: Dockerfile
    restart: always
    ports:
      - 3000:3000
    environment:
      - DB_HOST=db
      - DB_USER=${MYSQLDB_USER}
      - DB_PASS=${MYSQLDB_USER_PASS}
      - DB_NAME=${MYSQLDB_DATABASE}
      - DB_PORT=3306
  ui:
    depends_on: 
       - api
    build:
      context: ./frontend-vue
      dockerfile: Dockerfile
    restart: always
    ports:
      - 80:80
    environment:
      - VUE_APP_API_HOST=<your server ip-adress>:3000
volumes:
  db:
``` 

Notice that the MySQL server port 3306 is not exposed, so our database is not accessable outside docker.

#### Docker file for the backend API

Create a file `Dockerfile` in the folder `backend-api` with the following content:

``` yaml
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

#### Docker file for the frontend Vue

Create a file `Dockerfile` in the folder `frontend-vue` with the following content:

``` yaml
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
COPY vue-env-replace.sh /docker-entrypoint.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Hosting configuration

We are using `nginx` to host our frontend, therefore we need to configure it by adding a `nginx.conf` file in the `frontend-vue` folder with the following content:

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

### Push to your GitHub repository

Now your project is ready for deployment, you can push it to GitHub.

## Clone and deploy your project

Now we will be using our GitHub repository for deployment on Docker.

### Clone your repository on docker

Make a remote connection to your VM using Visual Studio Code.

Open a terminal and clone your repository:

```bash
git clone <https link repo>
```

### Environment variables

Open your projectfolder in remote connection of Visual Studio Code.

#### Create the environment variables file

Next we need to create a ´.env´ file in the folder  `<projectname>` with the following content:

```env
# mySQL database
MYSQLDB_ROOT_PASSWORD=<your root password>
MYSQLDB_DATABASE=vives
MYSQLDB_USER=<a_user_for_your_database>
MYSQLDB_USER_PASS=<a_password_for_this_user>
```

#### Solve a problem for the frontend

For the Vue frontend we will have a problem that environment variables are injected into the application during the build stage. The resulting static files thus contain the respective values of those variables as hardcoded strings. To solve this we will use a script `vue-env-replace.sh` to replace all environment variables with there correct values.

You can please the `vue-env-replace.sh` in your `frontend-vue` folder with the following content:

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

Once you created this file, you will need to run the command `chmod +x vue-env-replace.sh` to make the script executable.
The script will be executed by Docker because we have put it in the entrypoint. 

#### Change static URL to environment variable

In your Vue frontend you need to change all `localhost:3000` to `${VUE_APP_API_HOST}`.

Example:
```js
axios.get('http://${VUE_APP_API_HOST}/images')
```

### Deploy on docker

Once we have done that, we are ready to build and run our service.

* use `docker-compose up -d` to deploy your container, now you get your bash prompt returned.
* use `docker-compose up -d --build` to deploy your container and rebuild them after adjustments have been made.
* use `docker-compose ps` to see the name of the containers and status.
* use `docker-compose down` to stop and remove the docker containers.
* use `docker-compose down -v` to stop and remove the docker containers and volumes.

![containers](./images/containers.png)exit

Should you want to open a terminal in one of the containers running on docker, you can do this by using this command:
```bash
docker exec -it <the name of the container> sh
```
To exit just type `exit`.

### Prepare the database

#### Create a user for the application

In your browser open PHPmyAdmin by surfing to `<ip-adres-of-your-vm>:8080` and run the following sql-statement:

```sql
USE vives;
CREATE USER '<a_user_for_your_database>'@'%' IDENTIFIED WITH mysql_native_password BY "<a_password_for_this_user>";
GRANT ALL PRIVILEGES ON vives.* TO '<a_user_for_your_database>'@'%';
```

:::tip 💡tip
The user and password must be the same as you entered in your `.env` file.
:::


#### Create the necessary tables

Run the SQL-statement script you made to restore your database tables.

Congratulations your project should be up and running now.








