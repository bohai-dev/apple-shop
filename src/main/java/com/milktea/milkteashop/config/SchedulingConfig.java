package com.milktea.milkteashop.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.EnableWebSocket;


@Configuration
@EnableScheduling
@ComponentScan("com.milktea.milkteashop.job")
public class SchedulingConfig {

}
