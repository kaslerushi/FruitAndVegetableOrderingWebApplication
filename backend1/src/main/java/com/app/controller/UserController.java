package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LoginResponse;
import com.app.dto.UserAccountCreate;
import com.app.dto.UserDetails;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.service.IUserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

	// dependency : service layer i/f
	@Autowired
	private IUserService userService;
	
	@GetMapping
	public ResponseEntity<?> getAllUserDetails() // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<?> addUserDetails(@RequestBody @Valid UserAccountCreate u) // de-serial (un marshalling) + apply validation rules
	{
		System.out.println(u);
		return new ResponseEntity<>(userService.addUser(u),HttpStatus.OK);
	}

	@GetMapping("/login")
	public ResponseEntity<?> userAuthenticate() // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(new LoginResponse("login successfull"),HttpStatus.OK);
	}
	
	@PostMapping("/roles")
	public ResponseEntity<?> getUserFisrtNameAndRoles(@RequestBody @Valid UserDetails u) // de-serial (un marshalling) + apply validation rules
	{
		System.out.println("user object sent by user"+u);
		return new ResponseEntity<>(userService.getUserInfo(u),HttpStatus.OK);
	}
	// add request handling method to delete emp details by emp id
	// Request URL sent by front end : http://host:port/api/employees/1234 ,
	// method=DELETE
//	@DeleteMapping("/{id}")
//	public String deleteEmpDetails(@PathVariable int id) {
//		System.out.println("in del emp dtls " + id);
//		return employeeService.deleteEmpDetails(id);
//	}

	// add req handling method to get selected emp details by id.
	// URL : http://host:port/api/employees/1234 , method=GET
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserDetails(@PathVariable int id) {
		
		return new ResponseEntity<>(userService.getUserDetails(id), HttpStatus.OK);
	}

	// add request handling method to update existing emp details (update a
	// resource) : PUT
//	@PutMapping
//	public User updateUserDetails(@RequestBody @Valid  User u) // de-serial (un marshalling)
//	{
//		return userService.addOrUpdateEmployeeDetails(e);
//	}
	//add req handling method to find all emps drawing salary > specific value
//	@GetMapping("/salary/{minSal}")
//	public ResponseEntity<?> getAllEmpsBySalary(@PathVariable double minSal)
//	{
//		System.out.println("in get all emps by sal");
//		//API of ResponseEntity
//		//public static ResponseEntity ok(T body) : sets sts code=200 , with specified body content.
//		return ResponseEntity.ok(employeeService.findEmpsBySalary(minSal));
//	}

}
