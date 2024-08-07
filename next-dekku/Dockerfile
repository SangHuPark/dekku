FROM node:20.15.1-alpine AS build

# 작업 폴더를 만들고 npm 설치
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

# 소스를 작업폴더로 복사하고 빌드
COPY . /app

RUN npm run build

# FROM nginx:alpine
# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d

# 위에서 생성한 앱의 빌드결과를 nginx의 샘플 앱이 사용하던 폴더로 이동
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]