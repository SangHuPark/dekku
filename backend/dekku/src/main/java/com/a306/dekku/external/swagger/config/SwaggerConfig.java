package com.a306.dekku.external.swagger.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

import static org.springframework.security.config.Elements.JWT;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {

//        Server devServer = new Server();
//        devServer.setDescription("dev");
//        devServer.setUrl("https://k11a301.p.ssafy.io");

        Server localServer = new Server();
        localServer.setDescription("local");
        localServer.setUrl("http://localhost:8080");

        return new OpenAPI()
                .info(apiInfo())
//                .servers(List.of(devServer, localServer))
                .servers(List.of(localServer))
                .components(
                        new Components().addSecuritySchemes(
                                "Bearer",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("Bearer")
                                        .bearerFormat(JWT))
                );
    }

    private Info apiInfo() {
        return new Info()
                .title("데꾸 API")
                .description("데꾸 API 명세서입니다.")
                .version("v1");
    }

    /*@Bean
    public GroupedOpenApi memberApi() {

        return GroupedOpenApi.builder()
                .group(Member.class.getSimpleName())
                .pathsToMatch("/api/v1/auth/**", "/api/v1/members/**")
                .addOpenApiCustomizer(openApi ->
                        openApi.addSecurityItem(
                                new SecurityRequirement().addList("Bearer")
                        )
                )
                .build();

    }

    @Bean
    public GroupedOpenApi pressApi() {

        return GroupedOpenApi.builder()
                .group(Press.class.getSimpleName())
                .pathsToMatch("/api/v1/press/**")
                .addOpenApiCustomizer(openApi ->
                        openApi.addSecurityItem(
                                new SecurityRequirement().addList("Bearer")
                        )
                )
                .build();

    }

    @Bean
    public GroupedOpenApi folderApi() {

        return GroupedOpenApi.builder()
                .group(Folder.class.getSimpleName())
                .pathsToMatch("/api/v1/folders/**", "/api/v1/bookmarks/**")
                .addOpenApiCustomizer(openApi ->
                        openApi.addSecurityItem(
                                new SecurityRequirement().addList("Bearer")
                        )
                )
                .build();

    }

    @Bean
    public GroupedOpenApi articleApi() {

        return GroupedOpenApi.builder()
                .group(Article.class.getSimpleName())
                .pathsToMatch("/api/v1/articles/**")
                .addOpenApiCustomizer(openApi ->
                        openApi.addSecurityItem(
                                new SecurityRequirement().addList("Bearer")
                        )
                )
                .build();

    }

    @Bean
    public GroupedOpenApi interactionApi() {

        return GroupedOpenApi.builder()
                .group("Interaction")
                .pathsToMatch("/api/v1/likes/**", "/api/v1/hates/**", "/api/v1/reports/**", "/api/v1/histories/**", "/api/v1/search/**")
                .addOpenApiCustomizer(openApi ->
                        openApi.addSecurityItem(
                                new SecurityRequirement().addList("Bearer")
                        )
                )
                .build();

    }

    @Bean
    public GroupedOpenApi S3Api() {

        return GroupedOpenApi.builder()
                .group("S3")
                .pathsToMatch("/api/v1/s3/**")
                .build();

    }*/

}
