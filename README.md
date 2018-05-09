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

# Lab 1

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
