FROM node:latest
ARG CLIENT_INTERNAL_PORT
RUN mkdir -p /usr/src/fullstack-test-client
WORKDIR /usr/src/fullstack-test-client
ENV PATH /usr/src/fullstack-test-client/node_modules/.bin:$PATH
COPY . /usr/src/fullstack-test-client
RUN npm install --silent
EXPOSE $CLIENT_INTERNAL_PORT
CMD ["npm", "run", "start:docker"]
