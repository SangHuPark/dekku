FROM gradle:8.8.0-jdk17 AS build

WORKDIR /app

COPY build.gradle settings.gradle ./

RUN gradle dependencies --no-daemon

COPY . /app

RUN gradle clean build --no-daemon -x test

# JRE 이미지로 런타임 이미지 생성
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/build/libs/*.jar /app/dekku.jar

EXPOSE 8080
ENTRYPOINT [ "java" ]
CMD [ "-jar", "dekku.jar" ]