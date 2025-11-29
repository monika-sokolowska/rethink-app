package com.example.backend;

import com.example.backend.config.EnvFileLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication()
public class BackendApplication {

	public static void main(String[] args) {
		EnvFileLoader.loadEnvFiles();
		
		SpringApplication.run(BackendApplication.class, args);
	}

}
