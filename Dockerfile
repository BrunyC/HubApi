FROM node:14.16-alpine

WORKDIR /app

COPY . .

EXPOSE 3100

CMD ["sh","-c","/app/.docker/command.sh"]