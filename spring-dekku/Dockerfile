FROM openjdk:17-jdk-slim as builder

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

ARG JAR_FILE=build/libs/*.jar
# jar 파일 복제
COPY ${JAR_FILE} app.jar

# 실행 명령어
ENTRYPOINT ["java", "-jar", "app.jar"]