FROM node:0.12-slim

MAINTAINER guilhermelucena <lucena9682@gmail.com>

RUN apt-get update && apt-get install -y xvfb chromium

ADD xvfb-chromium /usr/bin/xvfb-chromium
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/google-chrome
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/chromium-browser
RUN chmod 777 /usr/bin/google-chrome

RUN npm install -g karma-cli

ENV HOME /home/node-chat/

ADD . $HOME
WORKDIR $HOME