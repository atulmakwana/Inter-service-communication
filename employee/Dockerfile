FROM node:alpine

WORKDIR /app/employee
COPY ./package.json ./

RUN npm install
COPY ./ ./

CMD [ "npm","start" ]