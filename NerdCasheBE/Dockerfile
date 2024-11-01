FROM node:21-alpine

WORKDIR /app
RUN npm install nodemon
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD npm run dev