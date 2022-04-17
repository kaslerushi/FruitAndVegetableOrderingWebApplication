package com.app.dto;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
//
//import com.app.pojos.Role;
import com.app.pojos.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserAccountCreate {
	@NotBlank(message = "First Name is required")
	private String fname;
	
	@NotBlank(message = "Last Name is required")
	private String lname;
	
//	@Column(length = 10,unique = true)
//	@Length(min=10,max=13)
//	@Pattern(regexp="^\\\\d{10}$",message="wrong number")
//	@NotBlank(message="cannnot be empty")
//	private String mobno;
	
	@Pattern(regexp="^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$",message = "wrong email")
	private String email;
	
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,18}$", message = "wrong password")
	private String password;
	
	private String role;
	
}
