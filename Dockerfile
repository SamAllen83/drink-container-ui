FROM node:12.2.0-alpine
RUN mkdir -p /code
WORKDIR /code
ADD . /code
RUN npm install -g -s --no-progress yarn && \
    yarn install
CMD [ "yarn", "start" ]
EXPOSE 3000