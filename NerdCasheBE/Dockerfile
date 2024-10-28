FROM node:21-alpine

WORKDIR /app
RUN npm install nodemon
COPY package.json .
RUN npm install
COPY . .
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 4000
CMD /wait && npm run dev