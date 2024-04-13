# FROM ubuntu:22.04
FROM node:20.11.1


RUN mkdir /app


RUN apt update -y && \
    apt install -y curl wget git && \
    npm install -g http-server && \
    npm install -g @vue/cli && \
    npm update -g @vue/cli


COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 5173


CMD [ "npm" , "run" , "server" ]
