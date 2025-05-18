# Stage 1: Build the application
FROM gradle:8.12-jdk17 AS builder
WORKDIR /usr/src/app

COPY build.gradle settings.gradle ./
COPY src ./src

# Run Gradle bootJar
RUN gradle bootJar

# Stage 2: Run the application
FROM openjdk:17
COPY --from=builder /usr/src/app/build/libs/app.jar app.jar

CMD ["sh", "-c", "java -jar /app.jar --server.port=${PORT:-8080}"]

