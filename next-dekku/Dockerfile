FROM node:18.17.0-alpine3.18

ENV PORT 3000

# Copy build output files
COPY ./public ./public
COPY ./.next/standalone ./
COPY ./.next/static ./.next/static

EXPOSE $PORT

# Running the app
ENTRYPOINT [ "node", "server.js" ]

# FROM node:18.17.0-alpine3.18 AS builder

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install --production

# COPY . .
# RUN npm run build

# FROM node:18.17.0-alpine3.18

# WORKDIR /app
# ENV PORT 3000

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# EXPOSE $PORT
# CMD ["npm", "run", "start"]