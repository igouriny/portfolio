# Stage 1: Build the application
FROM gradle:8.12-jdk17 AS builder
WORKDIR /usr/src/app

COPY build.gradle settings.gradle ./
COPY src ./src

RUN gradle bootJar --no-daemon

# Stage 2: Run the application
FROM eclipse-temurin:17-jdk
COPY --from=builder /usr/src/app/build/libs/app.jar app.jar

ENV JAVA_TOOL_OPTIONS="-Dmanagement.metrics.enable.processor=false"

CMD ["java", "-jar", "/app.jar"]
