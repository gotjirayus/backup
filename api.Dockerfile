FROM node:12-slim AS builder
WORKDIR /opt/app
COPY package.json .
RUN yarn global add pm2 && yarn

FROM builder AS release
COPY . .
RUN mv .env.prod .env && mv process.prod.yml process.yml
EXPOSE 8000
CMD ["pm2-docker", "start", "process.yml"]
