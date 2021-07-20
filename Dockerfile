#Add node js image see https://hub.docker.com/r/bitnami/node/
FROM bitnami/node:latest

#Set label for API version
LABEL fr.qui-ramene-quoi.version="pre-alpha-0.0.1"

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node
ARG PORT=3000
ENV PORT $PORT

#Expose port
EXPOSE $PORT

#The latest npm, regardless of node version, for speed and fixes
RUN npm i npm@latest -g

COPY . /app

WORKDIR /app

CMD npm run dev
