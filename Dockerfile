FROM node:latest

WORKDIR /usr/src/api

COPY . .

COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start:dev"]