package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.UserAccountCreate;
import com.app.dto.UserDetails;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.pojos.UserRole;

public interface IUserService {
	//List<User> getAllEmployees();
	User addUser(UserAccountCreate transientUser);
	
//	boolean isEmailUnique(String email);
	
	List<User> getAllUsers();
	
	UserDetails getUserInfo(UserDetails u);
	//String deleteEmpDetails(int id);
//	User fetchUserDetails(int userId);
	//Find all emps drawing salary > specific value
	//List<User> findEmpsBySalary(double minSal);
	

	User getUserDetails(int id);

	Role addRole(Role role);
	
	String linkUserRole(String email,UserRole roleName);
}
