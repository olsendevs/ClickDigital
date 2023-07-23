FROM node:18.15.0 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

COPY .env ./


RUN npm ci

COPY . .

RUN npm run build

FROM node:18.15.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

COPY .env ./

RUN npm ci --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/main.js" ]