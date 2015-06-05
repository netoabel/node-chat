FROM debian:jessie

MAINTAINER guilhermelucena <lucena9682@gmail.com>

RUN apt-get update && apt-get install -y xvfb chromium

ADD xvfb-chromium /usr/bin/xvfb-chromium
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/google-chrome
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/chromium-browser
RUN chmod 777 /usr/bin/google-chrome

RUN  apt-get update
RUN  apt-get install -y \
     npm nodejs nodejs-legacy
RUN npm install -g npm@latest \
&& npm install -g karma-cli

ENV HOME /home/node-chat/

ADD . $HOME
WORKDIR $HOME