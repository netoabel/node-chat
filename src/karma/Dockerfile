FROM ubuntu:14.04

MAINTAINER guilhermelucena <lucena9682@gmail.com>

RUN apt-get update
RUN apt-get install -y \
     npm nodejs nodejs-legacy \
     firefox

RUN npm install -g npm@latest \
&& npm install -g karma-cli

ENV HOME /home/karma/
ADD . $HOME
WORKDIR $HOME

#RUN npm install

