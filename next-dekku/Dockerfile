# Use Node.js to build the app
FROM node:20.15.1-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json .
COPY package-lock.json .

RUN npm ci

# Copy the entire source code
COPY . .

# Build the Next.js app
RUN npm run build

# 프로덕션 스테이지
FROM nginx:1.21.4-alpine

# nginx 실행 전 default.conf 파일 수정
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 이미지에서 생성된 build 폴더를 nginx 이미지로 복사
COPY --from=build /app /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]