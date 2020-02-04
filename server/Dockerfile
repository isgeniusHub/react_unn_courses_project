FROM node:12.13.1

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY public ./public
COPY src ./src

EXPOSE 7000
CMD ["node","--experimental-modules","./src/server.js"]