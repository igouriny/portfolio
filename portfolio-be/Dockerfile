# Stage 1: Build the JAR using Gradle
FROM gradle:8.3 AS builder
WORKDIR /usr/src/app
# Copy build configuration and source code
COPY build.gradle .
COPY src ./src
# Build the Spring Boot JAR
RUN gradle bootJar

# Stage 2: Create the runtime image (Debian-based)
FROM openjdk:17-slim
# Update package lists and install CA certificates
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates

# Set default environment variable for the port
ENV PORT=8080
EXPOSE 8080

# Define an argument for the JAR file location and copy it from the builder stage
ARG JAR_FILE=build/libs/*.jar
COPY --from=builder /usr/src/app/${JAR_FILE} app.jar

# Run the Spring Boot application, picking up the PORT env variable
CMD ["sh", "-c", "java -jar /app.jar --server.port=${PORT}"]
