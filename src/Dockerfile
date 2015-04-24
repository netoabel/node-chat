FROM node:0.12-slim

MAINTAINER netoabel <abel.neto@gmail.com>

RUN npm install -g gulp@v3.8.11 \
&& npm install -g pm2@0.12.9 \
&& npm install -g mocha

ENV HOME /home/node-chat/

ADD . $HOME

WORKDIR $HOME

RUN npm install
 
CMD ["gulp", "up"]
