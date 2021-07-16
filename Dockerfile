FROM node:13-alpine
ENV NODE_ENV=production

WORKDIR /app

# Install app dependencies
COPY ["package.json", "package-lock.json","yarn.lock", "./"]
COPY ["tsconfig.json","ormconfig.json", "./"]

RUN npm i

COPY . .
EXPOSE 3333

CMD ["npm","start","dev","typeorn"]