# Stage 1: Build the application
FROM gradle:8.12-jdk17 AS builder
WORKDIR /usr/src/app

COPY build.gradle settings.gradle ./
COPY src ./src

# Use daemon=false for better compatibility in containers
RUN gradle bootJar --no-daemon

# Stage 2: Run the application
FROM eclipse-temurin:17.0.9-jdk
COPY --from=builder /usr/src/app/build/libs/app.jar app.jar

# Disable problematic JVM metrics collection
ENV JAVA_TOOL_OPTIONS="-Dmicrometer.metrics.export.enabled=true -Dmanagement.metrics.enable.processor=false"

CMD ["java", "-jar", "/app.jar"]
