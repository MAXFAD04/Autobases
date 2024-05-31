FROM node:21-alpine
WORKDIR /back
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]