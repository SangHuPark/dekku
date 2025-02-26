package com.a306.dekku;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class DekkuApplication {

	public static void main(String[] args) {
		SpringApplication.run(DekkuApplication.class, args);
	}

}
