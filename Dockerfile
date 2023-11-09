FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm install

COPY .env.example .env

EXPOSE 3000

CMD ["npm","run","dev"]