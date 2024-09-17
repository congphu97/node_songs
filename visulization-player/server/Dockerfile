FROM node

ARG DEFAULT_PORT=3000

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT=${DEFAULT_PORT}

EXPOSE $PORT

# CMD ["node", "index.js"]
CMD ["npm", "start"]
