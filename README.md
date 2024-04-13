# TipTap editor enhancment task

## structure

1. project has been setup using Vue js, with Vite as project bundler, and typscript is used as primary language in the project

2. Docker setup has been provided to run this code on any machine which has docker installed, although project can be run without doccker

## how to run

### 1. Using Docker (recommended)

#### start server :

1. open project folder in terminal
2. run this cmd -> bash setup.sh,
3. visit localhost:3000
4. this script will build docker file, and start vite server for you in docker container, from where you can access the editor itself

#### stop server :

1. open project folder in terminal
2. run this cmd -> bash stop.sh,
3. this will stop vite server, and destroy docker created resources

#### clean server :

1. open project folder in terminal
2. run this cmd -> bash clean.sh,
3. this will remove docker image from system and release ocupied space, image will beregenerated by start script on start server cmd.

### 2. Using Vite cmd directly

1. open project folder in terminal
2. run this cmd -> npm run dev
3. visit localhost:5173
