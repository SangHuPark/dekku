package dekku.spring_dekku.global.config.swagger;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openApi() {

        Server localServer = new Server();
        localServer.setDescription("local");
        localServer.setUrl("http://localhost");


        return new OpenAPI()
                .info(getInfo())
                .servers(Arrays.asList(localServer));

    }

    private Info getInfo() {
        return new Info()
                .title("SSAFY TRIP API")
                .description("SSAFY TRIP DOCS");
    }

    // @Bean
    // public GroupedOpenApi securityGroup() {
    // 	return GroupedOpenApi
    // 		.builder()
    // 		.group("토큰 필요")
    // 		.pathsToExclude()
    // 		.addOpenApiCustomizer(buildSecurityOpenApi())
    // 		.build();
    // }
    //
    // @Bean
    // public GroupedOpenApi nonSecurityGroup() {
    // 	return GroupedOpenApi
    // 		.builder()
    // 		.group("토큰 불필요")
    // 		.pathsToMatch()
    // 		.build();
    // }
    //
    // private OpenApiCustomizer buildSecurityOpenApi() {
    // 	SecurityScheme securityScheme = new SecurityScheme()
    // 		.name(TOKEN_HEADER_NAME)
    // 		.type(SecurityScheme.Type.HTTP)
    // 		.in(SecurityScheme.In.HEADER)
    // 		.bearerFormat("JWT")
    // 		.scheme("Bearer");
    //
    // 	return openApi -> openApi
    // 		.addSecurityItem(
    // 			new SecurityRequirement()
    // 				.addList(TOKEN_HEADER_NAME)
    // 		)
    // 		.getComponents()
    // 		.addSecuritySchemes(TOKEN_HEADER_NAME, securityScheme);
    // }
}
