# TipTap editor enhancment task

## structure

1. project has been setup using Vue js, with Vite as project bundler, and typscript is used as primary language in the project

2. Docker setup has been provided to run this code on any machine which has docker installed, although project can be run without doccker

## how to run

### 1. Using Docker (recommended)

start server : run this cmd -> bash setup.sh, then visit localhost:3000 ,
this script will build docker file, and start vite server for you in docker container, from where you can access the editor itself

stop server : run this cmd -> bash stop.sh, this will stop vite server, and destroy docker created resources

### 2. Using Vite cmd directly

run this cmd -> npm run dev, it will give you a localhost address where you will be able to check the editor
