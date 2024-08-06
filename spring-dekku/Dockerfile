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