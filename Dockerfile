FROM node:13

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

#RUN npm run build

EXPOSE 3001
CMD [ "node", "index.js" ]
