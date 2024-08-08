FROM node:18.17.0-alpine3.18 AS build

ENV PORT 3000

COPY package.json .
COPY package-lock.json .

RUN npm ci

# 소스를 작업폴더로 복사
COPY . .

# 빌드
RUN npm run build

# COPY ./public 
# COPY ./.next /app

# # Copy build output files
# COPY ./public ./public
# COPY ./.next/standalone ./
# COPY ./.next/static ./.next/static

EXPOSE $PORT

# Running the app
ENTRYPOINT [ "node", "server.js" ]