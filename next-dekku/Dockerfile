FROM node:20.15.1-alpine AS build

# 작업 폴더를 만들고 npm 설치
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

# 소스를 작업폴더로 복사
COPY . /app

# 빌드
RUN npm run build