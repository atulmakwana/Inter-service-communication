FROM node:alpine

WORKDIR /app/company
COPY ./package.json ./

RUN npm install
COPY ./ ./

CMD [ "npm","start" ]