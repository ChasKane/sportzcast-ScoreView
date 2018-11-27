FROM node:carbon
WORKDIR /src
COPY ./src/ /src/
CMD ["node", "index.js"]
EXPOSE 1337

