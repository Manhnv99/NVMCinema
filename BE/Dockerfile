#Pull the image from dockerhub
FROM openjdk:17-jdk-alpine
#copy thư mục jar đã đóng gói vào thự mục jar container
COPY target/BE-0.0.1-SNAPSHOT.jar BE-0.0.1-SNAPSHOT.jar
#comand line to run jardoc
ENTRYPOINT ["java","-jar","/BE-0.0.1-SNAPSHOT.jar"]