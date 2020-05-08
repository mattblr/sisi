FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV MONGO_USER=
ENV MONGO_PASSWORD=
ENV MONGO_DB=

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]