FROM node:latest
ARG SERVER_INTERNAL_PORT
RUN mkdir -p /usr/src/fullstack-test-server
WORKDIR /usr/src/fullstack-test-server
ENV PATH /usr/src/fullstack-test-server/node_modules/.bin:$PATH
COPY . /usr/src/fullstack-test-server
RUN npm install --silent
EXPOSE $SERVER_INTERNAL_PORT  
CMD ["npm", "start"]