## Readme ##

### Run this application ###

#### Preconditions ####
- Windows / Linux
- Java 8 above
- MySQL 5.6 above
- Tomcat/Jetty


#### Development ####
This application need be run in Servlet container, which supports Servlet 2.5 above.

##### Jetty Maven plugin #####
Jetty Maven plugin has been integrated in this application. You can simply execute Maven goal `mvn jetty:run` to run the application.  For more information, refer to [Configuring the Jetty Maven Plugin](http://www.eclipse.org/jetty/documentation/current/jetty-maven-plugin.html).

##### Apache Tomcat #####

Apache Tomcat is also can be used during development, the configuration depends on your environment.

#### Production ####

##### Apache Tomcat #####

Apache Tomcat is recommended for production.