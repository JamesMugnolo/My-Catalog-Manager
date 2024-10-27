FROM node:20.9.0

WORKDIR /app
RUN npm i @craco/craco
COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]