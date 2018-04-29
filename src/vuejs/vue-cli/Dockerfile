FROM node:8

RUN apt-get update \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g @vue/cli \
  && npm install -g opencollective

RUN mkdir /code

COPY ./init.sh /

WORKDIR /code
