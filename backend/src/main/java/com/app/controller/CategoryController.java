package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.pojos.Category;
//import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.service.ICategoryService;
import com.app.service.IUserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	private ICategoryService categoryService;
	
	@GetMapping
	public ResponseEntity<?> getAllCategories() // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
	}
//	@GetMapping
//	public ResponseEntity<?> getAllSubCategories() // de-serial (un marshalling) + apply validation rules
//	{
//		return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
//	}
//	@GetMapping
//	public ResponseEntity<?> getAllVarieties() // de-serial (un marshalling) + apply validation rules
//	{
//		return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
//	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteCategory(@PathVariable int id) // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(categoryService.deleteCategory(id),HttpStatus.OK);
		
	}
	
	@PostMapping("/add")
	public ResponseEntity<?> addCategory(@RequestBody @Valid Category c) // de-serial (un marshalling) + apply validation rules
	{
		
		return new ResponseEntity<>(categoryService.addCategory(c),HttpStatus.OK);
		
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateCategory(@RequestBody @Valid Category c) // de-serial (un marshalling) + apply validation rules
	{
		return new ResponseEntity<>(categoryService.updateCategory(c),HttpStatus.OK);
		
	}
	
}
