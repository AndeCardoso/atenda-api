FROM node:18

WORKDIR /src

COPY package*.json yarn.lock ./

RUN yarn install

COPY . /src/

EXPOSE 8888

CMD ["npx", "nodemon", "src/server.ts"]