package dekku.spring_dekku.global.config.web;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//	@Override
//	public void addCorsMappings(CorsRegistry registry) {
//		registry.addMapping("/api/**")
//			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//			.allowedOrigins("http://localhost:3000", "https://dekku.co.kr")
//			.allowCredentials(true);
//	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
