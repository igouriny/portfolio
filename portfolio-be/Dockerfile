# Stage 1: Build the JAR using Gradle
FROM gradle:8.3 AS builder
WORKDIR /usr/src/app
# Copy Gradle configuration and source code
COPY build.gradle .
COPY src ./src
# Build the Spring Boot JAR
RUN gradle bootJar

# Stage 2: Create the runtime image
FROM openjdk:17
# Update package lists and install CA certificates
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates

# Set default environment variable for the port (Railway or other platforms may override this)
ENV PORT=8080
EXPOSE 8080

# Define an argument for the built JAR file location
ARG JAR_FILE=build/libs/*.jar
# Copy the built JAR from the builder stage to the runtime image
COPY --from=builder /usr/src/app/${JAR_FILE} app.jar

# Run the Spring Boot application, using the PORT environment variable for the server port
CMD ["sh", "-c", "java -jar /app.jar --server.port=${PORT}"]
