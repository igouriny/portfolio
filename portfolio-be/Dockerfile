FROM gradle:8.12-jdk17 AS builder
WORKDIR /usr/src/app
COPY src ./src
COPY build.gradle .
RUN gradle bootJar

EXPOSE 8080

FROM openjdk:17
ARG JAR_FILE=build/libs/*.jar
COPY --from=builder /usr/src/app/${JAR_FILE} app.jar
# Use CMD with shell so the $PORT environment variable (set by Railway) is substituted.
CMD ["sh", "-c", "java -jar /app.jar --server.port=${PORT:-8080}"]
