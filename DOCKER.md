# Intervention Engine Docker Setup Instructions

This document outlines how to set up intervention engine's backend and frontend with docker on OSX. It is recommended that you install *boot2docker* via homebrew:

    $ brew install boot2docker

First, initalize the docker VM using boot2docker:

    $ boot2docker init
    $ boot2docker up

Use *docker version* to make sure the docker VM is up and running:

    $ docker version
    Client version: 1.5.0
    Client API version: 1.17
    Go version (client): go1.4.1
    Git commit (client): a8a31ef
    OS/Arch (client): darwin/amd64
    Server version: 1.5.0
    Server API version: 1.17
    Go version (server): go1.4.1
    Git commit (server): a8a31ef

Add and run the mongodb docker image from dockerhub:

    $ docker pull dockerfile/mongodb
    $ docker run -d --name mongodb dockerfile/mongodb

Next, build and run (with link to the mongo container) the docker container for Intervention Engine's back end:

    $ cd $GOPATH/src/github.com/intervention-engine/ie
    $ docker build -t ie .
    $ docker run -d -P --name ie --link mongodb:mongo ie

Then, build and run (with link to the backend) the docker container for the front end:

    $ cd $GOPATH/src/github.com/intervention-engine/frontend
    $ docker build -t ember .
    $ docker run -d -P --name frontend --link ie:ie ember

You can use *docker ps* to view your running containers:

    $ docker ps
    CONTAINER ID        IMAGE                       COMMAND                CREATED             STATUS              PORTS                     NAMES
    8b8da9176482        ember:latest                "/node/ember-on-fhir   31 minutes ago      Up 31 minutes       0.0.0.0:49162->4200/tcp   frontend
    aa112744ea97        ie:latest                   "/bin/sh -c /go/src/   28 hours ago        Up 3 hours          0.0.0.0:49153->3001/tcp   ie
    3e839b54f1f4        dockerfile/mongodb:latest   "mongod"               28 hours ago        Up 3 hours          28017/tcp, 27017/tcp      mongodb

Since you are using boot2docker, the docker containers expose ports on the boot2docker VM, NOT on your own localhost. To access the containers in a browser, replace the 0.0.0.0 under PORTS with the IP found in the $DOCKER_HOST environment variable:

    $ echo $DOCKER_HOST
    tcp://192.168.59.103:2376

So to access the frontend, enter http://192.168.59.103:49162 in your browswer. You can also set up port forwarding on your machine to allow access via localhost.
