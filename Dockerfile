FROM node:20-alpine
WORKDIR /usr/src/app
COPY node_modules node_modules
COPY .next .next
COPY .env .
COPY package.json .
EXPOSE 6971
CMD [ "npm","start" ]