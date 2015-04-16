FROM dockerfile/nodejs

MAINTAINER netoabel <abel.neto@gmail.com>

ENV HOME /home/node-chat/

WORKDIR $HOME

RUN npm install -g mocha