package com.example.backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Utility class to load environment variables from .env files.
 * This class loads db.env and api.env files and sets them as system properties
 * so they can be accessed via ${VARIABLE_NAME} in application.properties.
 */
public class EnvFileLoader {
    private static final Logger logger = LoggerFactory.getLogger(EnvFileLoader.class);
    private static boolean loaded = false;

    /**
     * Loads environment variables from db.env and api.env files.
     * This should be called before Spring Boot application starts.
     */
    public static void loadEnvFiles() {
        if (loaded) {
            logger.debug("Environment files already loaded, skipping...");
            return;
        }

        try {
            // Find project root directory by looking for .env files
            // Try current directory first, then parent directory
            Path currentDir = Paths.get(System.getProperty("user.dir"));
            Path projectRoot = findProjectRoot(currentDir);
            
            if (projectRoot == null) {
                logger.warn("Could not find db.env or api.env files. Tried: {} and parent directory", currentDir);
                projectRoot = currentDir; // Fallback to current directory
            }

            // Load db.env file
            Path dbEnvPath = projectRoot.resolve("db.env");
            logger.info("Loading database environment variables from: {}", dbEnvPath);
            Dotenv dbEnv = Dotenv.configure()
                    .directory(projectRoot.toString())
                    .filename("db.env")
                    .ignoreIfMissing()
                    .load();

            // Load api.env file
            Path apiEnvPath = projectRoot.resolve("api.env");
            logger.info("Loading API environment variables from: {}", apiEnvPath);
            Dotenv apiEnv = Dotenv.configure()
                    .directory(projectRoot.toString())
                    .filename("api.env")
                    .ignoreIfMissing()
                    .load();

            // Set database variables as system properties
            // Map MYSQL_* variables to SPRING_DATASOURCE_* variables
            String mysqlDatabase = dbEnv.get("MYSQL_DATABASE", "");
            String mysqlUser = dbEnv.get("MYSQL_USER", "");
            String mysqlPassword = dbEnv.get("MYSQL_PASSWORD", "");
            
            // Validate critical database configuration
            if (mysqlDatabase.isEmpty() || mysqlUser.isEmpty() || mysqlPassword.isEmpty()) {
                logger.error("Missing critical database configuration in db.env:");
                if (mysqlDatabase.isEmpty()) logger.error("  - MYSQL_DATABASE is not set");
                if (mysqlUser.isEmpty()) logger.error("  - MYSQL_USER is not set");
                if (mysqlPassword.isEmpty()) logger.error("  - MYSQL_PASSWORD is not set");
                logger.error("Database connection will likely fail. Please check your db.env file.");
            }

            String mysqlHost = dbEnv.get("MYSQL_HOST");
            if (mysqlHost == null || mysqlHost.isEmpty()) {
                String dockerHost = System.getenv("DOCKER_HOST");
                boolean isDocker = dockerHost != null || System.getProperty("java.class.path").contains("docker");
                // Also check if SPRING_DATASOURCE_URL contains "mysql:" (Docker service name)
                String existingUrl = dbEnv.get("SPRING_DATASOURCE_URL");
                if (existingUrl != null && existingUrl.contains("mysql:")) {
                    mysqlHost = "mysql"; // Docker service name
                } else {
                    mysqlHost = "localhost"; // Local development
                }
            }
            String defaultPort = "3306";
            if ("localhost".equals(mysqlHost)) {
                defaultPort = "3307"; // Docker MySQL exposed on port 3307
            }
            String mysqlPort = dbEnv.get("MYSQL_PORT", defaultPort);

            // Construct JDBC URL if not explicitly set
            String datasourceUrl = dbEnv.get("SPRING_DATASOURCE_URL");
            if (datasourceUrl == null || datasourceUrl.isEmpty()) {
                if (mysqlDatabase.isEmpty()) {
                    logger.warn("MYSQL_DATABASE is not set in db.env. Database connection may fail.");
                }
                datasourceUrl = String.format("jdbc:mysql://%s:%s/%s?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true",
                        mysqlHost, mysqlPort, mysqlDatabase);
            }

            // Set Spring Boot datasource properties
            setSystemPropertyIfNotSet("SPRING_DATASOURCE_URL", datasourceUrl);
            setSystemPropertyIfNotSet("SPRING_DATASOURCE_USERNAME", mysqlUser);
            setSystemPropertyIfNotSet("SPRING_DATASOURCE_PASSWORD", mysqlPassword);
            setSystemPropertyIfNotSet("SPRING_DATASOURCE_DRIVER_CLASS_NAME", 
                    dbEnv.get("SPRING_DATASOURCE_DRIVER_CLASS_NAME", "com.mysql.cj.jdbc.Driver"));

            // Set API/JWT variables from api.env
            setSystemPropertyIfNotSet("JWT_SECRET", apiEnv.get("JWT_SECRET"));
            setSystemPropertyIfNotSet("JWT_EXPIRATION_MS", apiEnv.get("JWT_EXPIRATION_MS"));
            setSystemPropertyIfNotSet("SPRING_JPA_HIBERNATE_DDL_AUTO", apiEnv.get("SPRING_JPA_HIBERNATE_DDL_AUTO"));
            setSystemPropertyIfNotSet("SERVER_PORT", apiEnv.get("SERVER_PORT"));

            logger.info("Successfully loaded environment variables from db.env and api.env files");
            logger.info("Database configuration: host={}, port={}, database={}, user={}", 
                    mysqlHost, mysqlPort, mysqlDatabase, mysqlUser);
            logger.debug("JDBC URL: {}", datasourceUrl);
            loaded = true;

        } catch (Exception e) {
            logger.warn("Failed to load .env files, falling back to system environment variables: {}", e.getMessage());
            logger.debug("Stack trace:", e);
        }
    }

    /**
     * Finds the project root directory by looking for db.env or api.env files.
     * Checks current directory and parent directory.
     */
    private static Path findProjectRoot(Path startDir) {
        // Check current directory
        if (startDir.resolve("db.env").toFile().exists() || 
            startDir.resolve("api.env").toFile().exists()) {
            return startDir;
        }
        
        // Check parent directory
        Path parent = startDir.getParent();
        if (parent != null && 
            (parent.resolve("db.env").toFile().exists() || 
             parent.resolve("api.env").toFile().exists())) {
            return parent;
        }
        
        return null;
    }

    /**
     * Sets a system property only if it's not already set.
     * This allows environment variables to override .env file values.
     */
    private static void setSystemPropertyIfNotSet(String key, String value) {
        if (value != null && !value.isEmpty() && System.getProperty(key) == null) {
            System.setProperty(key, value);
            logger.debug("Set system property: {} (value hidden for security)", key);
        }
    }
}

