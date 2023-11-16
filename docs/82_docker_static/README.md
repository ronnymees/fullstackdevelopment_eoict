# Deploy a HTML,CSS & JS project

:::warning 🔥warning
Make sure you have prepared your VM before continuing here.
:::

## Prepare your project for deployment

To be able to deploy our website on the VM we need to prepare it.

:::tip 💡tip
Please check if all your URL's are relative (HTML and CSS)
:::

### Create a GitHub repository for deployment

* create a new repository on github
* create a local folder `<projectname>` with a subfolder `website`
* make a copy of your project to the folder `website`
* open the folder `<projectname>` in Visual Code and open a terminal
* make it a git repository by typing `git init`.
* add the remote GitHub repository by typing `git remote add origin git@github.com:yourusername/repositoryname.git` (the last part is your SSH link from your GitHub repository)
* make a first push 

### Create a docker-compose file

We will be deploying our website in a docker container, so the first thing we need to do is make a docker-compose file containing the information of how to deploy this project.

Create a file `docker-compose.yml` in the folder  `<projectname>` with the following content:

``` yaml
version: '3'
services:
  httpd:
    image: httpd:latest
    ports:
      - "80:80"
    volumes:
      - ./website:/usr/local/apache2/htdocs
    restart: always
```
* `version: '3'` : This instructs Docker Compose that we’re using version 3 of the tool.
* `httpd:` : The Apache HTTP Server
* `services:` : This will instruct Docker Compose that what follows will be the services to deploy.
* `restart: allways` : We instruct Docker to always retry to start this service unless it was stopped by the admin.
* `ports:` : We define both the external and internal ports to use for the database.

Now the preperation is ready and you can **push everyting the GitHub**.

## Clone and deploy your project

### Making a remote connection to your VM

We use the extension `ssh remote` in Visual Code to make a remote connection to your VM.

Start using a remote window by pressing the green button on the bottom left:
![Open a remote window](./images/remote-indicator.png)

Now select `Connect to Host` and type `student@<Ip adress of your VM>`

![Connect to host](./images/connecttohost.png)

Now select `Linux` as the platform:

![Connect to host](./images/platform.png)

### Clone your repository on your VM

Now you need to clone your docker repo, by using the https link of your GitHub repository.

```bash
git clone <https link repo>
```

### Deploy your website on your VM

The only thing left to do is deploying your website by starting the docker container.

* To start : `docker compose up -d`
* To stop : `docker compose down`
* To view logs : `docker compose ps`
* To view a list of the containers : `docker compose ls`

Now everyone connected to the `devbit` network can acces your website through it's IP adress.
