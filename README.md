# CSG Docker Container Labs

The application used in this lab is a proof-of-concept application that leverages the following technologies:

## Front End

* Angular 5.2
* Angular CLI 1.7.3
* Sass (SCSS)
* Bootstrap 4
* RxjS

## Back End

* ASP.NET Core 2.1
* Entity Framework Core 2.0
* AutoMapper

## Database

* MS SQL Server Developer Edition 2017 (Linux)

## Pre-requisites

* You must have a general knowledge of Docker concepts.
* Familiarity with the Docker CLI.
* Basic understanding of building, running and deploying Angular 5+ apps.
* Basic understanding of building, running and deploying .NET Core applications.
* Familiarity with SQL Server. This example uses a Docker container running SQL Server Developer Edition for Linux.
* It is assumed that your workstation does not have Angular CLI or the .NET Core Runtime/SDK. This is done on purpose, as the entire application stack will be running in Docker containers.

### Confirm that Docker is running

Open a terminal Window. From the command line enter `docker --version`. Alternatively, you can enter `docker version` (without the `--`) to list more details. Note that the output of your installed Docker version may be different:

```bash
$ docker --version
Docker version 17.12.0-ce, build c97c6d6

```

# Lab 1: Getting Familiar with the Docker CLI

## Play with a few commands

### Show help

There are two flavors: pass in `help` or the `--help` switch.
```bash
$ docker help

Usage:	docker COMMAND

A self-sufficient runtime for containers

Options:
...
Management Commands:
...
Commands:
...
Run 'docker COMMAND --help' for more information on a command.
```

or
```bash
$ docker --help

# output same as above
```

Note the hint `docker COMMAND --help` for displaying help on additional commands. This will come in handy any time you need to check on the usage or purpose of a Docker command. Let's try it.

```bash
$ docker ps --help

Usage:	docker ps [OPTIONS]

List containers

Options:
  -a, --all             Show all containers (default shows just running)
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print containers using a Go template
  -n, --last int        Show n last created containers (includes all states) (default -1)
  -l, --latest          Show the latest created container (includes all states)
      --no-trunc        Don't truncate output
  -q, --quiet           Only display numeric IDs
  -s, --size            Display total file sizes
```

The `docker ps` along with the `docker images`, `docker build`, `docker run` commands are very common Docker commands. They become useful when determining which containers are currently running, obtaining the container hash (container ID), listing pulled container images and tags, building a Docker image, and running an existing Docker image.

### List running containers

At this point, it is assumed *no* Docker containers are running locally.
```bash
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

The output doesn't show anything valuable. Let's address that.

### Run Hello Docker Container

[A very boring example](https://docs.docker.com/get-started/#test-docker-installation) demonstrated in the Docker quickstart tutorials, the Hello World Docker container is an excellent way to test your Docker installation. At this point we haven't done that. We're going to skip that and make things more interesting.

### Run a container from its official repository

If you need to explore the official list of Docker repositories for many, many base images and services, visit none other than [https://hub.docker.com/explore/](the Official Registry). For example, the [Alpine Linux](https://hub.docker.com/_/alpine/) Docker image is a widely-used base image used by many existing Docker images and any custom Docker containers that you create.

### Run MongoDB
We're going to run a containerized version of MongoDB locally and execute commands in it. This lab won't show you how to communicate with a MongoDB instance. We simply want to illustrate that you can run containers that run standalone, such as MongoDB, and that you can interact with containers via Bash or Shell.

Execute the following command. Note that we're using a specific version of MongoDB's image. This is a good practice.

```bash
$ docker run -d --name mongo-db mongo:3.0.15

Unable to find image 'mongo:3.0.15' locally
3.0.15: Pulling from library/mongo
9e518726c72a: Pull complete 
5bec5585393f: Pull complete 
67b43c55e1d0: Pull complete 
ac73d29bb1af: Pull complete 
5f055f855756: Pull complete 
5ff164565c7e: Pull complete 
14cac0308fdb: Pull complete 
d64ca7fda324: Pull complete 
a785a68ac06d: Pull complete 
749ebc08962c: Pull complete 
6941183827c4: Pull complete 
4fe0aacd6337: Pull complete 
Digest: sha256:2eae1f99d5e49286d5e34a153c6ffaf25b038731e1cfbd786712ced672e8e575
Status: Downloaded newer image for mongo:3.0.15
62cd1c2771f7e22a5f99f27e413d89345a00d5f15514769aac4b7ecaa3ab4bec
```

The very last hash (`62cd1c2771f7e22a5f99f27e413d89345a00d5f15514769aac4b7ecaa3ab4bec`) that is shown above will be different for you. This represents the container's ID.

#### Common `docker run` Switches

* `-d`: Run in detached mode. Otherwise, the service will halt the command line and end when you hit `Ctrl + C` to end the process.
* `--name`: Assign a custom name to this container. Otherwise, Docker will randomly-generated funky names, such as `upbeat_pike` or `silly_payne`. This is *very important* as this alias serves as the "host name" of the service you intend to consume within an application. For example, a REST API service that accesses data from a SQL Server or MongoDB container will use the container alias as the server name, *not* the container's IP address or something esoteric.

#### Now list all running containers

```bash
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
62cd1c2771f7        mongo:3.0.15        "docker-entrypoint.s…"   2 minutes ago       Up 2 minutes        27017/tcp           mongo-db

```

Alas! We now have a running instance of MongoDB! Notice that the alias `mongo-db` is the container name we specified and that the hash `62cd1c2771f7` represents the first twelve digits of the container's unique ID. We can also observe that MongoDB is exposed via port 27017.

#### Iteracting with Bash/Shell within a container

It is very common practice to connect to a running container for diagnostics or other purposes. For example, you're still developing a container and want to ensure that all dependencies and code are copied correctly to the container. Here's how you do it.

```bash
$ docker exec -it mongo-db bash
root@62cd1c2771f7:/# <cursor here>
```

#### Common `docker exec` Switches and Arguments

* `-it`: Interactive mode: `i` = interactive; `t` = pseudo-TTY
* `mongo-db`: Our container alias. In this case, MongoDB.
* `bash`: The command to execute on the container. Some containers will use `sh` (located at `/bin/sh` within the container). Bash gives us the ability to simulate a terminal session.

Note the prompt "`root@62cd1c2771f7`" indicating that you're connected to the correct container.

In this example we used `bash`, but in certain containers, such as those inheriting from Alpine Linux, `sh` would be more appropriate. It is difficult to tell which command line is used by containers. For example, [Prometheus](https://hub.docker.com/r/prom/prometheus/), a popular monitoring service, uses `sh` instead of `bash`.

While still interacting with the container, type in `ls` to list the current directory's files and sub-directories.

```bash
root@62cd1c2771f7:/# ls
bin   dev			  etc	      lib    mnt   root  selinux  tmp
boot  docker-entrypoint-initdb.d  home	      lib64  opt   run	 srv	  usr
data  entrypoint.sh		  js-yaml.js  media  proc  sbin  sys	  var
root@62cd1c2771f7:/# <cursor here>
```

Now exit Bash from the container by entering `exit`:

```bash
root@62cd1c2771f7:/# exit
exit
$ <cursor here>
```

Some containers, such as Alpine Linux, will immediately exit after executing. It is possible to enable interactive mode when you run a container by forcing a shell session. For example, `docker run -it alpine:3.7 sh` will pull the Alphine Linux 3.7 image and enable interactive mode via the Shell command.

#### Examining output from container standard output

Services running in Docker will output diagnostics (logs) to standard output. Logging to standard output is of the recommendations from the [Twelve Factor App](https://12factor.net/) guidelines and it is a typical path taken when Dockerizing existing apps. Let's examine Mongo's output. Note that what you see may be different.

```bash
$ docker logs mongo-db

2018-05-08T21:17:14.377+0000 I CONTROL  [initandlisten] MongoDB starting : pid=1 port=27017 dbpath=/data/db 64-bit host=84200c4852cc
2018-05-08T21:17:14.385+0000 I CONTROL  [initandlisten] db version v3.0.15
2018-05-08T21:17:14.385+0000 I CONTROL  [initandlisten] git version: b8ff507269c382bc100fc52f75f48d54cd42ec3b
2018-05-08T21:17:14.385+0000 I CONTROL  [initandlisten] build info: Linux ip-10-166-66-3 3.2.0-4-amd64 #1 SMP Debian 3.2.46-1 x86_64 BOOST_LIB_VERSION=1_49
2018-05-08T21:17:14.385+0000 I CONTROL  [initandlisten] allocator: tcmalloc
2018-05-08T21:17:14.385+0000 I CONTROL  [initandlisten] options: {}
2018-05-08T21:17:14.401+0000 I JOURNAL  [initandlisten] journal dir=/data/db/journal
2018-05-08T21:17:14.402+0000 I JOURNAL  [initandlisten] recover : no journal files present, no recovery needed
2018-05-08T21:17:15.032+0000 I JOURNAL  [initandlisten] preallocateIsFaster=true 6.06
2018-05-08T21:17:15.770+0000 I JOURNAL  [initandlisten] preallocateIsFaster=true 9.1
2018-05-08T21:17:17.516+0000 I JOURNAL  [initandlisten] preallocateIsFaster=true 8.58
2018-05-08T21:17:17.516+0000 I JOURNAL  [initandlisten] preallocateIsFaster check took 3.114 secs
2018-05-08T21:17:17.516+0000 I JOURNAL  [initandlisten] preallocating a journal file /data/db/journal/prealloc.0
2018-05-08T21:17:18.483+0000 I JOURNAL  [initandlisten] preallocating a journal file /data/db/journal/prealloc.1
2018-05-08T21:17:19.326+0000 I JOURNAL  [initandlisten] preallocating a journal file /data/db/journal/prealloc.2
2018-05-08T21:17:20.093+0000 I JOURNAL  [durability] Durability thread started
2018-05-08T21:17:20.094+0000 I JOURNAL  [journal writer] Journal writer thread started
2018-05-08T21:17:20.127+0000 I INDEX    [initandlisten] allocating new ns file /data/db/local.ns, filling with zeroes...
2018-05-08T21:17:20.180+0000 I STORAGE  [FileAllocator] allocating new datafile /data/db/local.0, filling with zeroes...
2018-05-08T21:17:20.180+0000 I STORAGE  [FileAllocator] creating directory /data/db/_tmp
2018-05-08T21:17:20.195+0000 I STORAGE  [FileAllocator] done allocating datafile /data/db/local.0, size: 64MB,  took 0.003 secs
2018-05-08T21:17:20.215+0000 I NETWORK  [initandlisten] waiting for connections on port 27017
```

The `-t` option tells the `docker logs` command to output timestamps. We know that `mongo-db` is the name of our MongoDB container instance. To show additional options, type `docker logs --help`. Feel free to experiment with those options.

#### Stop a running container

Let's stop the MongoDB container. Again, see the importance of using a well-known alias for the running instance of a container.

```bash
$ docker stop mongo-db
mongo-db

$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

`docker stop` doesn't remove the container. It is still located on your local machine. Let's add the `-a` switch (all containers) to `docker ps` to show all local containers and combine this with the `-f` switch to filter by container name. Finally, we will then use the container ID to remove the `mongo-db` container.

```bash
$  docker ps -a -f name=mongo-db

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                     PORTS               NAMES
62cd1c2771f7        mongo:3.0.15        "docker-entrypoint.s…"   24 minutes ago      Exited (0) 6 minutes ago                       mongo-db

$ docker rm 62cd1c2771f7
62cd1c2771f7
```

Running `docker rm <container-id>` removes a Docker container from the local machine. The echoed `62cd1c2771f7` container ID confirms that Docker has successfully removed the container.


#### Removing a Docker image

Now list all images. Note that you may see more images than expected, as Docker containers will typically pull additional base images in order to function.

```bash
$ docker images

REPOSITORY                                                                TAG                 IMAGE ID            CREATED             SIZE
super-cool-app                                                            latest              886601c07459        6 days ago          109MB
<none>                                                                    <none>              8c4f48f3c37f        6 days ago          1.3GB
mongo                                                                     3.0.15              fdab8031e252        7 days ago          232MB

```

Let's now remove MongoDB's image.

```bash
$ docker rmi mongo:3.0.15

Untagged: mongo:3.0.15
Untagged: mongo@sha256:2eae1f99d5e49286d5e34a153c6ffaf25b038731e1cfbd786712ced672e8e575
Deleted: sha256:fdab8031e2525c2760129670f30737557f82fc8ea1e6410333284bdfa1dd57b0
Deleted: sha256:6fa57df9b8295f665bde10112fc6c351598e74d44b3065720c61da946d5130c9
Deleted: sha256:b3f2775ce1d1873bfd47213a1b661af1ca064168d562dd8e290cbf5356ed286a
Deleted: sha256:de116789f19da29b6ef231fe46fd834fc7587d73a891670a20e3d5e17298ee5f
Deleted: sha256:219cdb79aff512027f068a926c4d9ebd3f5f5d9782dc06c0e4fc767314272ea6
Deleted: sha256:a82a4998e5a34f4dfa71ea54fced463738575c82411bed698882dd487840b321
Deleted: sha256:67ead4cfb641080278011735e70ec59be3966174cb9bc87d3fcfc6b99a6d6bd1
Deleted: sha256:90b4f9f98da5534c7a5f93bd5bc5a0fa550963df6dde255eaeb6c7f395099c97
Deleted: sha256:b563c752d4faf3f9604138efc98b4a7739f95904ea5b757471d5e3a1b836239f
Deleted: sha256:304a6525e723f9497206e9701a39024190ee8c3fe29051df3d34505b0ef8ff49
Deleted: sha256:9de9645094fc6d80651fd4c4030bb4e2fa0208ef9275a6dce93b7a61d890c087
Deleted: sha256:ff00d1c192a08697a1d0898c29182f2b97291f51daf50dcda83af06db87454d8
Deleted: sha256:fa9dd9b7df41027d87adad6a84abbd0990378ce3b393b3a68011dd63b2a57027
```

If you have difficulty removing a Docker image, you can rerun the `docker rmi` command by passing in the `--force` option.

This concludes the first part of the lab. We will now get started with Dockerizing an existing three-tier application (client, web and DB).

# Lab 2: Dockerize an existing application

In this lab we're going to "Dockerize" an existing Angular 5 client, an ASP.NET Core project, and connect them all with an existing SQL Server Docker image/container.

This lab assumes that you do not have the Angular CLI and .NET Core CLI installed. Do not install them. You won't need them at least locally. It is also assumed you have a Docker Cloud account. If you do not have one, **stop now** and [sign up for a free account](https://cloud.docker.com/) before proceeding.

From the terminal, navigate to the project root of this repository and open it in Visual Studio Code. For example, in the demo below, the repository is located under the `~/repos` directory

```bash
$ cd ~/repos/csg-docker-lab

$ pwd
/home/your-user-name/repos/csg-docker-lab

$ code .
```

Note the "." following the `code` command. This will open Visual Studio Code. Note that I didn't have to do this, as I composed this document using Visual Studio Code, so I'm skipping this step. :-)

## Important Docker Commands

In this lab you will be running several important Docker commands.

### `docker login`

Log in to Docker Cloud or to a private registry. This command exposes additional options for passing in a user name and password combination, and a private registry server name from the command line.

### `docker build -t <docker-image-name> .`

Build current directory's Dockerfile (implied by the "`.`") using target name `<docker-image-name>`.

### `docker run -d -p <host-port>:<container-port> --name <container-name> <docker-image-name>`

You've already encountered this command. The newest option is the `-p` (port) option, where we *expose* a port from the container to the host. The syntax `host:container` is called "mapping". It is widely used within Docker for mounting host directories, ports, etc. to the container.

### `docker tag <docker-image-name> <docker-cloud-user-name>/<repository-name>:<version-or-tag>`

Add a tag (label) to a local Docker image and associate it with the supplied remote repository at `<docker-cloud-user-name>/<repository-name>`

### `docker push <docker-cloud-user-name>/<repository-name>:<version-or-tag>`

Publish (push) the tagged Docker image to the specified remote `<repository-name>` using `<docker-cloud-user-name>` account.

By default, Docker assumes you're publishing to Docker Cloud. If publishing to a private repository, such as [Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/) or even [Artifactory](https://jfrog.com/artifactory/), you would prefix the destination with the registry's base] URL. For example, to publish a SQL Server Linux 2017-CU4 image to ACR, assuming the registry name is called `csgdockertraining` on a repository called `lab1`, you would type:

```bash
$ docker login --username YOUR_ACR_USER --password YOUR_ACR_PASSWORD csgdockertraining.azurecr.io

$ docker push csgdockertraining.azurecr.io/lab1/mssql-server-linux:2017-CU4

```

### `docker network create <network-name>`

Create a network for Docker container communication.

## Create `csglab` Network

Let's first create a network for our stack.

```bash
$ docker network create -d bridge \
   --opt "com.docker.network.bridge.host_binding_ipv4"="0.0.0.0" \
   --opt "com.docker.network.bridge.enable_ip_masquerade"="true" \
   csglab

46894baa67db8e8524934d28a047527ee02cea4c49e7fc510cd9664f5a9a62cf
```

The hash that is returned is the ID of the network within Docker.

## Run SQL Server for Linux

We will use the official [SQL Server for Linux](https://hub.docker.com/r/microsoft/mssql-server-linux/s) Developer Edition 2017-CU6 Docker image for this demo.

Replace the `yourStrongPassword` placeholder with a custom password. Please jot down the password you decide to use, as you will need it in later steps.

**Important**: When creating a SQL Server password, do not use "`!`" or "`$`", as these have special meaning in Linux.

The back slash "`\`" can be ignored or typed in, as this tells Bash that the command continues on the next line when you hit the Enter/Return key.

Also important to note is the `--name` we're supplying and the fact we're associating this instance with the `csglab` network. This will become crucial when writing the database connection to be used by the ASP.NET Core application later. We're using `csglab-mssql` to represent MS SQL's container name in this lab.

```bash
$ docker run \
   -e 'ACCEPT_EULA=Y' \
   -e 'SA_PASSWORD=yourStrongPassword' \
   --network csglab \
   -p 1433:1433 -d \
   --name csglab-mssql \
   microsoft/mssql-server-linux:2017-CU6

Unable to find image 'microsoft/mssql-server-linux:2017-CU6' locally
2017-CU6: Pulling from microsoft/mssql-server-linux
f6fa9a861b90: Already exists 
da7318603015: Already exists 
6a8bd10c9278: Already exists 
d5a40291440f: Already exists 
bbdd8a83c0f1: Already exists 
3a52205d40a6: Already exists 
6192691706e8: Already exists 
1a658a9035fb: Already exists 
d057e89d8e94: Pull complete 
1ed0a0d4098f: Pull complete 
Digest: sha256:30ff80f9765b3c813af6b4ed71355dd4abb8afc966226fc80c12a8ff1b2c4ef8
Status: Downloaded newer image for microsoft/mssql-server-linux:2017-CU6
2bca7ee4391b9f7e7e19893d5404376b3e65422e5542bf1ede171586fcc12c29
```

Let's try connecting to SQL Server now.

```bash
$ docker exec -it csglab-mssql /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P yourStrongPassword

1> <cursor-here>
```

Now let's type in a simple SQL Command:

```sqlcmd
1> SELECT Name FROM sys.Databases
2> GO
Name
--------------------
master
tempdb
model
msdb

(4 rows affected)
1>
```

Press `Ctrl + C` or enter `exit` to exit the SQLCMD interface.

Congratulations! You now have an instance of SQL Server running in a Docker container!

For additional details on the MS SQL Server for Linux image, [visit the official repository](https://hub.docker.com/r/microsoft/mssql-server-linux/).

## Dockerize the `Cardinal.DockerLabs.Web` ASP.NET Core application

If you haven't examined the source code for the sample ASP.NET Core app, do so now if you'd like.

Open the application's source code in Visual Studio Code.

```bash
$ cd ~/repos/csg-docker-lab/
$
$ code .
```

Examine the `Startup.cs` file under the `src/web/Cardinal.DockerLabs.Web` directory.

### `ConfigureServices()` method

Notice that the connection string is being read from an environment variable named `CSG_DOCKER_LAB_CONN_STRING`. The result of this variable is fed into the configuration for the Entity Framework Core `DbContext` named `SmartHomeDbContext`.

Remember that this environment variable will be read from *within* the Docker container we will create later, not from the host machine.

### `Configure()` method

The last statement in this method seeds the database with initial custom data. This means that Entity Framework Core will automatically generate a new table within the SQL Server container we ran earlier.

## `launchSettings.json` file

Open the `launchSettings.json` file under the `csg-docker-lab/src/web/Cardinal.DockerLabs.Web/Properties` directory.

Examine the custom launch profile for running this application within Docker. Observe that the this web application is exposed on host http://0.0.0.0:8000/. The IP "0.0.0.0" is used internally within the Docker container. The application is exposed on port 8000 *within the container*.

Note that this is one way to run a .NET Core application within Docker. For example, the ASP.NET Core Visual Studio Template for Docker uses a much more complex Dockerfile configured to run in "stages". You will see an example of this when we configure the Dockerfile for the Angular client application.

### Your first Dockerfile: ASP.NET Core App

While still in Visual Studio Code, add a new file named `Dockerfile` to the directory root of the ASP.NET Core project (`csg-docker-lab/src/web`).

We will use the official [microsoft/aspnetcore-build](https://hub.docker.com/r/microsoft/aspnetcore-build/) base image and use the tag (version) `2.0.8-2.1.200`, which means it supports versions 2.0.8 through 2.1.200 of .NET Core.

In the Dockerfile shown below, the `-p` option used in the command `mkdir` indicates it should suppress errors if the directory `/app` already exists.

Finally, after copying the source code over to the container, the standard set of operations for running a .NET Core application seem more familiar.

Add the following set of Docker commands to the `Dockerfile`.

```Dockerfile
FROM microsoft/aspnetcore-build:2.0.8-2.1.200

RUN mkdir -p /app
WORKDIR /app

COPY . .

WORKDIR ./Cardinal.DockerLabs.Web
RUN dotnet restore

# TODO: Pass configuration via command-line argument
RUN dotnet build -c Debug

EXPOSE 8000

CMD ["dotnet", "run", "--launch-profile", "Docker"]
```

Save the Dockerfile and return to the Terminal window. We assume the project root is located under the `~/repos/csg-docker-lab` directory.

### Build the ASP.NET Core image

Ensure you're in the `web` directory of the source code.
```bash
$ cd ~/repos/csg-docker-lab/src/web
```

Let's now build the image. Assign the name `csglab-web`. Again, please note the "`.`" at the very end of the command!

``` bash
$ docker build -t csglab-web .

Sending build context to Docker daemon  1.561MB
Step 1/11 : FROM microsoft/aspnetcore-build:2.0.8-2.1.200
2.0.8-2.1.200: Pulling from microsoft/aspnetcore-build
cc1a78bfd46b: Pull complete 
... 8 more pulls later ...
3f469dd64863: Pull complete 
Digest: sha256:7a3afd1d1582622a848a9ba9e8ac02d3223b53fb3e8e2f093319e19a22a6396a

... Holy cow! A lot more stuff happened! ...

Build succeeded.
    0 Warning(s)
    0 Error(s)

Time Elapsed 00:00:07.99
Removing intermediate container 4300586f2fd0
 ---> 67b7c482e667
Step 10/11 : EXPOSE 8080
 ---> Running in a8b73d02ebb3
Removing intermediate container a8b73d02ebb3
 ---> 1501c87092a1
Step 11/11 : CMD ["dotnet", "run", "--launch-profile", "Docker"]
 ---> Running in 80bb738b50b9
Removing intermediate container 80bb738b50b9
 ---> 8111f3a92791
Successfully built 8111f3a92791
Successfully tagged csg-lab-web:latest
```

You should see no errors. None at all! It should just work!

**Halt**: Note the very last above (`Successfully tagged csg-lab-web:latest`). Because we didn't assign a custom tag to this image, Docker assumes the "latest" tag is to be used. Let's confirm that.

```bash
$ docker images csglab-web

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
csglab-web         latest              8111f3a92791        8 minutes ago       2.06GB
```

### Run `csg-lab-web` Docker image

Let's now run the ASP.NET Core application to make sure everything is working from within the Docker container. But first we need to build the connection string.

For the sake of simplicity, we're going to store the connection string in a local environment variable. Please note that we're only trying to shorten the length of the `docker run` command. Replace the `yourSQLPassword` placeholder with the MS SQL Server password you set up earlier. The `server` property in the connection string is pointing to `locahost`, which is the host machine running Docker. In situations where Docker containers are connected via a network or deployed via an orchestrator, such as Kubernetes, the container name would be used instead. This is very important, as it is a common mistake for Kubernetes and Docker newcomers.

```bash
$ CONN_STRING="Server=csglab-mssql,1433;Database=CsgLabSmartHome;User=sa;Password=yourSQLPassword"

$ echo $CONN_STRING
Server=csglab-mssql,1433;Database=CsgLabSmartHome;User=sa;Password=yourSQLPassword
```

We are now ready to run the ASP.NET Core App as a Docker container. Assign the name `csglab-web` to it.

Observe how we're injecting the connection string into the container instance via the custom `CSG_DOCKER_LAB_CONN_STRING` argument we declared in the Dockerfile. In fact, you already used a similar syntax when you ran the MS SQL Server image earlier.

```bash
$ docker run -d -p 8000:8000 --network csglab --name csglab-web -e "CSG_DOCKER_LAB_CONN_STRING=$CONN_STRING" csglab-web

627550b7848162c0b63bc26f603697bf075ca2e09795fad7ae3aee3472ec071f
```

Notice the container ID returned by Docker after executing `docker run`. Copy the ID that you see in your Terminal session and use it below. The container name `csglab-web` won't work if the container exited prematurely due to any runtime errors.

Confirm that ASP.NET started successfully by examining the logs.

```bash
$ docker logs <container-id-returned-by-docker>

Using launch settings from /app/Cardinal.DockerLabs.Web/Properties/launchSettings.json...
warn: Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager[35]
      No XML encryptor configured. Key {04c08954-cb6b-4d17-bfc7-15e7fbaf70dd} may be persisted to storage in unencrypted form.
Hosting environment: Production
Content root path: /app/Cardinal.DockerLabs.Web
Now listening on: http://0.0.0.0:8000
Application started. Press Ctrl+C to shut down.
```

If you see any unusual errors, such as a Stack Trace, confirm that the `docker run` command was correctly supplied and that the container was added to the `csglab` network. The most likely cause is that the connection string may be missing from the container. You can ignore the "XML encryptor" warning shown above and in your container's logs.

In the example above, we can see that ASP.NET is running on port 8000 on host "0.0.0.0".

Now verify the container is running.

```bash
$ docker ps

CONTAINER ID        IMAGE                                   COMMAND                  CREATED             STATUS              PORTS                              NAMES
627550b78481        csglab-web                              "dotnet run --launch…"   46 seconds ago      Up 45 seconds       0.0.0.0:8000->8000/tcp, 8080/tcp   csglab-web
2bca7ee4391b        microsoft/mssql-server-linux:2017-CU6   "/opt/mssql/bin/sqls…"   9 minutes ago       Up 9 minutes        0.0.0.0:1433->1433/tcp             csglab-mssql
```

Finally, make your first request to confirm ASP.NET can communicate with SQL Server. If you saw the same log output as shown above, then seeding the SQL Server database was successful.

```bash
$ curl http://localhost:8000/api/manufacturers

[{"id":1,"name":"Microsoft"},{"id":2,"name":"Apple"}]
```

Congratulations! ASP.NET Core is now communicating with SQL Server in Docker!

## Dockerize Client Application

Our final step is to build and deploy our Angular client application within Docker. This will be performed in Stages as follows:

* **Stage 1:** Build and compile Angular application
* **Stage 2:** Serve the application via Nginx

In the final stage, we will end up with a very small Docker image that only contains the distributable, minimized version of our Angular app.

[Nginx](https://www.nginx.com/) is a popular platform that offers load balancing solutions, ingress controllers, and of course, web server capabilities.

### Environment files

The Angular CLI allows us to target either a `development` or `prod` (Production) environment. We can create configurations for our application by modifying the `environment.ts` and `environment.prod.ts` files. The base API path has already been configured for you. Notice that they all point to http://localhost:8000/api, which is the same host and port we used for Dockerizing the ASP.NET Core application.

You can find these two files under the `csg-docker-lab/src/client/src/environments` directory.

### Create Dockerfile for Client Application

In Visual Studio Code, create a new file called `Dockerfile` under the `csg-docker-lab/src/client` directory.

Add the following contents to that Dockerfile. Note that in the second stage, the `nginx-custom.conf` configuration file is copied over to the Docker container. That file is located at the root of the `client` directory and it was created for your convenience.

Observe also that we have the ability to pass in a custom `ARG` (argument) named `TARGET_ENV`. This gives us the ability to build different versions of this Dockerfile for different environments, such as Dev or Prod. You can accomplish that by using the `--build-arg TARGET_ENV=prod` or `--build-arg TARGET_ENV=development` along with the `docker build` command. We won't be doing that in this exercise.

```Dockerfile
# Stage 1: Build and compile Angular application
FROM node:10.0.0 as node

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG TARGET_ENV=prod

RUN npm run build -- --prod --environment $TARGET_ENV

# Stage 2: Serve app via Nginx
FROM nginx:1.13

COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
```

Save the Dockerfile.

### Build the client application's Dockerfile

This process is very similar as before, so the syntax should be very familiar. We'll use `csglab-client` as our image name.

```bash
$ cd ~/repos/csg-docker-lab/src/client

$ docker build -t csglab-client .
```

### Run the client application's Docker image

If you inspected the `nginx-custom.conf`, you will find that Nginx exposes port 80. This is the port we'll expose from our container and the host. If port 80 happens to be used by something else on your machine, change the host port to a different number, such as 5000. Remember the mapping syntax `host:container`.

```bash
$ docker run -d -p 80:80 --network csglab --name csglab-client csglab-client
```

Open the URL [http://localhost:80/](http://localhost:80/) in a Web browser. You should see the sample app is now pulling data from the ASP.NET Core application and subsequently from SQL Server.

If you run `docker ps`, you should now see three containers running.

```bash
$ docker ps

CONTAINER ID        IMAGE                                   COMMAND                  CREATED             STATUS              PORTS                              NAMES
c004aaa68331        csglab-client                           "nginx -g 'daemon of…"   4 minutes ago       Up 4 minutes        0.0.0.0:80->80/tcp                 csglab-client
627550b78481        csglab-web                              "dotnet run --launch…"   About an hour ago   Up 4 seconds        0.0.0.0:8000->8000/tcp, 8080/tcp   csglab-web
2bca7ee4391b        microsoft/mssql-server-linux:2017-CU6   "/opt/mssql/bin/sqls…"   About an hour ago   Up 14 seconds       0.0.0.0:1433->1433/tcp             csglab-mssql
```

This concludes the lab. Congratulations!
