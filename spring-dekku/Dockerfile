FROM ubuntu:22.04

EXPOSE 8080

RUN apt-get update && apt-get install -y openjdk-17-jdk

# 작업 디렉토리 설정
WORKDIR /spring-dekku

# 전체 소스 코드 복사
COPY ./spring-dekku /spring-dekku

# 컨테이너가 시작될 때, 실행할 명령어 설정
CMD ["./gradlew", "clean", "build"]
# CMD ["sleep", "360000"]

# FROM openjdk:17-jdk-slim as builder

# COPY gradlew .
# COPY gradle gradle
# COPY build.gradle .
# COPY settings.gradle .
# COPY src src
# RUN chmod +x ./gradlew
# RUN ./gradlew bootJar

# FROM openjdk:17-jdk-slim
# COPY --from=builder build/libs/*.jar app.jar
# EXPOSE 8080

# ARG SERVER_MODE
# RUN echo "$SERVER_MODE"
# ENV SERVER_MODE=$SERVER_MODE

# ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "/app.jar"]

# ARG JAR_FILE=build/libs/*.jar
# jar 파일 복제
# COPY ${JAR_FILE} app.jar

# 실행 명령어
# ENTRYPOINT ["java", "-jar", "app.jar"]