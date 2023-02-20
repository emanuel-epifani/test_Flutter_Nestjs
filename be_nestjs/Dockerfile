# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# copy package.json, package-lock.json and prod.env(with environment variables) into image
COPY package*.json prod.env ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
#CMD [ "node", "dist/main.js" ]
CMD [ "npm", "run", "start:prod" ]