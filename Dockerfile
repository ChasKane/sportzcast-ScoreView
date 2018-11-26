FROM node:carbon
WORKDIR /src
COPY ./src/ /src/
CMD ["node", "src/index.js"]
EXPOSE 1337

