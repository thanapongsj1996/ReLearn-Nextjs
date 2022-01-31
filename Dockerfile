FROM node:16.13.1 as build

WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY . /app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
