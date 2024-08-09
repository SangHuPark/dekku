FROM node:18.17.0-alpine3.18

ENV PORT 3000

# Copy build output files
COPY ./public ./public
COPY ./.next/standalone ./
COPY ./.next/static ./.next/static

EXPOSE $PORT

# Running the app
ENTRYPOINT [ "node", "server.js" ]