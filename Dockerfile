FROM node:carbon
WORKDIR /src
COPY . /src/
CMD ["node", "index.js"]
EXPOSE 1337

