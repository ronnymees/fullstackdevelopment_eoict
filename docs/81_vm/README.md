# Virtual Machine

A **Virtual Machine (VM)** is a compute resource that uses software instead of a physical computer to run programs and deploy apps. One or more virtual “guest” machines run on a physical “host” machine.  Each virtual machine runs its own operating system and functions separately from the other VMs, even when they are all running on the same host. 

**Docker** is a software platform that allows you to build, test, and deploy applications quickly. Docker packages software into standardized units called containers that have everything the software needs to run including libraries, system tools, code, and runtime. 

Each student has his/her own VM on the server. In this VM we will use Docker to deploy the website.

:::warning 🔥Warning
First make sure you are connected to the `devbit` network.

You will recieve the credentials for your VM from your teacher.
:::

Next we will be making some one-time adjustments and installations on your VM.

## Enable remote connection

To be able to connect to your VM you need to setup the connection with your GitHub ssh-key.

Open a terminal (e.g. Powerhell) and connect to your VM with username and ip address.

```bash
ssh <username>@<ip address>
```

Logging in for the first time can sometimes take a while.
*If asked if you want to continue just type `yes`.*

You will be asked for your *password*.

Now that you are connected to your VM and have a commandline enter the following commands to make remote acces possible with your SSH key from GitHub::

```bash
sudo apt update
sudo apt install ssh-import-id 
ssh-import-id-gh <GitHub-username>
```

## Install Docker

We use a script to install both docker and docker compose.

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```
:::warning 🔥Warning
Depending on how many students install docker simultaneously this can take a while.

Please limit this to **6 students at the same time**.
:::

Next we need to add the user `student` to docker.

```bash
sudo adduser student docker
exit
```

With that last `exit` command you will disconnect from your VM and get the windows commandprompt again.

You can close the terminal now.

