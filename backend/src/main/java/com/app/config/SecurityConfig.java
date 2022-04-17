package com.app.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration // to tell SC , class below will contain @Bean annotated methods --equivalent to
				// <bean id class ...../>
@EnableWebSecurity //to enable spring security support
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	//auto wire instance of custom user details service 
	@Autowired
	private UserDetailsService userDetailsService;
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// override this method to enable DAO based authentication using JPA --based upon UserDetailsService
		auth.userDetailsService(userDetailsService);//.passwordEncoder(passwordEncoder());
	}
	/* super class version
	 * protected void configure(HttpSecurity http) throws Exception {
		this.logger.debug("Using default configure(HttpSecurity). "
				+ "If subclassed this will potentially override subclass configure(HttpSecurity).");
		http.authorizeRequests((requests) -> requests.anyRequest().authenticated());
		http.formLogin();
		http.httpBasic();
	}
	 */

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//override this method , to customize , authorization rules : based upon roles.
		http.csrf().disable()
		.cors().and()
		.authorizeRequests() //authorize all requests
		.antMatchers(HttpMethod.OPTIONS,"/**").permitAll() // /home : accessible to all users
//		.antMatchers("/", "/home", "/api/**").permitAll()
		.antMatchers("/","/api/**").permitAll()
		.antMatchers("/customer/**").hasAnyRole("CUSTOMER","ADMIN")
		.antMatchers("/farmer/**").hasAnyRole("FARMER","ADMIN")
		.antMatchers("/admin/**","/upload-file").hasRole("ADMIN") 
		.anyRequest().authenticated()
		.and()
		.httpBasic(); //enables Basic Auth	
		
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
	}
	//configure password encoder bean : vendor : Bcrypt encoder
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	
	
	
//	@Bean
//    public CorsConfigurationSource corsConfigurationSource () {
//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//        corsConfiguration.setAllowedOrigins (Arrays.asList("*"));
//        corsConfiguration.setAllowedMethods(Arrays.asList("OPTIONS", "HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
//        corsConfiguration.setAllowedHeaders (Arrays.asList("*"));
//
//        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
//        corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
//        return corsConfigurationSource;
//    }

	

}
