FROM node:18

WORKDIR /contracts
COPY ./contracts/package.json ./
COPY ./contracts/package-lock.json ./

RUN npm install
COPY ./contracts ./
RUN npm run build

CMD ["node", "build/src/run.js"]
