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

# 프로덕션 스테이지
FROM nginx:1.21.4-alpine

# nginx 실행 전 default.conf 파일 수정
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 이미지에서 생성된 build 폴더를 nginx 이미지로 복사
COPY --from=build /app/.next /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]