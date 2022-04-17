package com.app.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.DuplicateException;
import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.RoleRepository;
import com.app.dao.UserRepository;
import com.app.dto.UserAccountCreate;
import com.app.dto.UserDetails;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.pojos.UserRole;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	
	// dependency : dao layer i/f
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User addUser(UserAccountCreate u) {
		User user=new User(u.getFname(),u.getLname(),u.getEmail(),u.getPassword());
		
		System.out.println("save user " + user);
		user.setPassword(encoder.encode(user.getPassword()));
//		user.setRole(UserRole.valueOf(u.getRole()));
		if(userRepo.existsByEmail(u.getEmail()))
		{
			throw new DuplicateException("duplicate email");
		}
		
		User persistentUser=userRepo.save(user);
		System.out.println(persistentUser);
//		Role role=new Role();
//		for(String r:u.getRoles())
//		{
//			Role role=new Role(UserRole.valueOf(u.getRole()));
//			System.out.println(UserRole.valueOf(u.getRole()));
//			System.out.println(role);
//			Role persistentRole=addRole(role);
			
//			System.out.println(persistentRole);
		if(!roleRepo.existsByRole(UserRole.valueOf(u.getRole())))
		{
			Role role=new Role(UserRole.valueOf(u.getRole()));
			roleRepo.save(role);
		}
			System.out.println(linkUserRole(u.getEmail(), UserRole.valueOf(u.getRole()))); 
			
//		}
		return persistentUser;
		
		// CrudRepository Methd : save(T entity)
		// Checks if id == null => transient entity , will fire insert upon commit
		// if id != null => detached entity , will fire update upon commit
	}// what will method ret ? DETACHED emp ---> to the controller

	@Override
	public List<User> getAllUsers()
	{
		return userRepo.findAll();
	}
	
	@Override
	public User getUserDetails(int id)
	{
		User u=userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("user not found with this mail id"));
		return u;
	}
	
//	@Override
//	public String deleteEmpDetails(int id) {
//		// service layer invokes dao's method
//		employeeRepo.deleteById(id);
//		return "Emp Details with ID " + id + " deleted successfuly... ";
//	
	@Override
	public Role addRole(Role role) {
		// TODO Auto-generated method stub
		return roleRepo.save(role);
	}

	@Override
	public String linkUserRole(String email,UserRole role) {
		// get user from user name
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found!!!!"));
		 //get role from role name
		Role userRole=roleRepo.findByRole(role).orElseThrow(() -> new RuntimeException("Role not found!!!!"));
		//user n role : found
		 //add role to user
		user.getRoles().add(userRole);
		return "Linked role to User....";
	}

	@Override
	public UserDetails getUserInfo(UserDetails u) {
		
			User persistentUser=userRepo.findByEmail(u.getEmail()).orElseThrow(()->new ResourceNotFoundException("user not found with this mail id"));
			u.setFname(persistentUser.getFname());
			System.out.println(u.getFname());
			System.out.println(persistentUser.getRoles());
			for(Role role:persistentUser.getRoles())
			{
				if(role.getRole()==UserRole.ROLE_ADMIN)
				{
					u.setRole("ROLE_ADMIN");
				}
				else
				{
					if(role.getRole()==UserRole.ROLE_CUSTOMER)
					{
						u.setRole("ROLE_CUSTOMER");
					}
					else if(role.getRole()==UserRole.ROLE_FARMER)
					{
						u.setRole("ROLE_FARMER");
					}
				}
			}
			
//			if(persistentUser.getRoles().contains(UserRole.ROLE_ADMIN))
//			{
//				u.setRole("ROLE_ADMIN");
//			}
//			else
//			{
//				if(persistentUser.getRoles().contains(UserRole.ROLE_CUSTOMER))
//				{
//					u.setRole("ROLE_CUSTOMER");
//				}
//				else
//				{
//					u.setRole("ROLE_FARMER");
//				}
//			}
			System.out.println(u.getRole());
		return u;
	}

//	//	employeeRepo.findById(empId);
////		employeeRepo.findById(empId);
////		Employee e= employeeRepo.getById(empId);
////		e.getLastName();
////		return e;
//		return employeeRepo.findById(empId).orElseThrow(() -> new ResourceNotFoundException("Emp by ID " + empId + " not found!!!!"));
//	}

	

//	@Override
//	public List<User> findEmpsBySalary(double minSal) {
//		// TODO Auto-generated method stub
//		// throw dummy exception to test global exc handler
//		boolean flag=true;
//		if (flag)
//			throw new RuntimeException("Some dummy exception!!!!!!");
//		return employeeRepo.findBySalaryGreaterThan(minSal);
//	}

}
