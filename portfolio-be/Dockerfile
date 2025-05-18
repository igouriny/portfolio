# Stage 1: Build the application
FROM gradle:8.12-jdk17 AS builder
WORKDIR /usr/src/app

# Copy build scripts and source code
COPY build.gradle ./
COPY settings.gradle ./
COPY src ./src

# Build the JAR file
RUN gradle bootJar

# Stage 2: Run the application
FROM openjdk:17

# Copy the JAR file from the builder stage
COPY --from=builder /usr/src/app/build/libs/app.jar app.jar

# Use Railway's PORT environment variable, default to 8080
CMD ["sh", "-c", "java -jar /app.jar --server.port=${PORT:-8080}"]
