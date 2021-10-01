FROM node:14.16-alpine

WORKDIR /app

COPY . .

RUN npm install \
    && npm install pm2 -g \
    && npm install grpc \
    && npm install @grpc/grpc-js

EXPOSE 3100

CMD ["npm", "run", "start:dev"]