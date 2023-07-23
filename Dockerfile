FROM node:18.15.0 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

COPY .env ./

RUN chown node:node /usr/src/app/

RUN npm ci

COPY . .

RUN npm run build

FROM node:18.15.0

USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

COPY .env ./

RUN chown node:node /usr/src/app/

RUN npm ci --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/main.js" ]