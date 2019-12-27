FROM node:current-alpine
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install && npm run build
CMD [ "node", "index.js" ]
EXPOSE 3000