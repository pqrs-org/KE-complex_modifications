FROM node:8

RUN apt-get update \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN npm install --quiet --global vue-cli

RUN mkdir /code

COPY ./init.sh /

WORKDIR /code
