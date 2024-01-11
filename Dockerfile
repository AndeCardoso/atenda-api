FROM node:18

WORKDIR /src

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8888

ENV NODE_ENV=development
ENV DB_USER=your_db_user
ENV DB_HOST=your_db_host
ENV DB_NAME=your_db_name
ENV DB_PASSWORD=your_db_password
ENV DB_PORT=5432

CMD yarn dev