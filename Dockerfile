FROM node:carbon
WORKDIR /src
COPY ./src/ /src/
CMD ["node", "app.js"]
EXPOSE 1337

