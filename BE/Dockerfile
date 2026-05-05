# Stage 1
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

COPY .mvn .mvn

COPY mvnw mvnw

COPY pom.xml pom.xml

RUN chmod +x mvnw
RUN sed -i 's/\r$//' mvnw
RUN ./mvnw dependency:go-offline

COPY src src

COPY .env .env

COPY set_domain.sh /usr/local/bin/set_domain.sh

RUN chmod +x /usr/local/bin/set_domain.sh

RUN sed -i 's/\r$//' mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder app/target/BE-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]

