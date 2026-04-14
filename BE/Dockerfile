##Pull the image from dockerhub
#FROM openjdk:17-jdk-alpine
##copy thư mục jar đã đóng gói vào thự mục jar container
#COPY target/BE-0.0.1-SNAPSHOT.jar BE-0.0.1-SNAPSHOT.jar
##comand line to run jardoc
#ENTRYPOINT ["java","-jar","/BE-0.0.1-SNAPSHOT.jar"]

## Pull the image from dockerhub
#FROM openjdk:17-jdk-alpine
#
## Copy the JAR file into the container
#COPY target/BE-0.0.1-SNAPSHOT.jar BE-0.0.1-SNAPSHOT.jar
#
## Copy the entrypoint script into the container
#COPY set_domain.sh /usr/local/bin/set_domain.sh
#
## Make the script executable
#RUN chmod +x /usr/local/bin/set_domain.sh
#
## Set the entrypoint to run the script, which will then run the Java application
#ENTRYPOINT ["/usr/local/bin/set_domain.sh", "java", "-jar", "/BE-0.0.1-SNAPSHOT.jar"]

FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

COPY .mvn .mvn

COPY mvnw mvnw

COPY pom.xml pom.xml

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

COPY src src

COPY .env .env

COPY set_domain.sh /usr/local/bin/set_domain.sh

RUN chmod +x /usr/local/bin/set_domain.sh

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder app/target/BE-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]

