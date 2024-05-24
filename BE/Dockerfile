##Pull the image from dockerhub
#FROM openjdk:17-jdk-alpine
##copy thư mục jar đã đóng gói vào thự mục jar container
#COPY target/BE-0.0.1-SNAPSHOT.jar BE-0.0.1-SNAPSHOT.jar
##comand line to run jardoc
#ENTRYPOINT ["java","-jar","/BE-0.0.1-SNAPSHOT.jar"]

# Pull the image from dockerhub
FROM openjdk:17-jdk-alpine

# Copy the JAR file into the container
COPY target/BE-0.0.1-SNAPSHOT.jar BE-0.0.1-SNAPSHOT.jar

# Copy the entrypoint script into the container
COPY set_domain.sh /usr/local/bin/set_domain.sh

# Make the script executable
RUN chmod +x /usr/local/bin/set_domain.sh

# Set the entrypoint to run the script, which will then run the Java application
ENTRYPOINT ["/usr/local/bin/set_domain.sh", "java", "-jar", "/BE-0.0.1-SNAPSHOT.jar"]

