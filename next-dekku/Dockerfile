FROM node:18.17.0-alpine3.18

ENV PORT 3000

# Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

WORKDIR /app

# Copy build output files
COPY ./public ./public
COPY ./.next/standalone ./
COPY ./.next/static ./.next/static

EXPOSE $PORT

# Running the app
ENTRYPOINT [ "node", "server.js" ]